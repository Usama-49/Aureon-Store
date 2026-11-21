const itemsModel = require("../models/items.model");
const userModel = require("../models/user.model");
const orderModel = require("../models/orders.model");
const {
  validateAndUploadSingleImage,
  processGalleryUploads,
  GALLERY_FIELD_NAMES,
  ALLOWED_IMAGE_TYPES,
} = require("../utils/galleryUpload");
const { uploadImage, client } = require("../services/imagekit");

const totalProducts = async (req, res) => {
  if (req.user.isBanned) {
    return res.status(401).json({
      message: "User is Banned",
    });
  }
  const total = await itemsModel.countDocuments();
  return res.status(200).json({
    total,
  });
};
const totalUsers = async (req, res) => {
  const users = await userModel.countDocuments({ role: "user" });
  return res.status(200).json({
    users,
  });
};
const addItem = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { name, stock, description, price } = req.body;

    //* Validate required text/number parameters
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Product name is required!" });
    }
    if (price === undefined || price === null || price === "" || Number(price) <= 0) {
      return res.status(400).json({ message: "Valid product price is required!" });
    }
    if (stock === undefined || stock === null || stock === "" || Number(stock) < 0) {
      return res.status(400).json({ message: "Valid stock quantity is required!" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Product description is required!" });
    }

    const rawCategory = req.body.category?.trim() || "Uncategorized";
    const formattedCategory = rawCategory
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const mainImageFile = req.files?.image?.[0];

    //* Validate image upload
    if (!mainImageFile) {
      return res.status(400).json({
        message: "Image file is required!",
      });
    }

    // Validate and upload main image via shared service helper
    const mainUpload = await validateAndUploadSingleImage(mainImageFile);
    if (mainUpload.error) {
      return res.status(400).json({
        message: mainUpload.error,
      });
    }

    const galleryResult = await processGalleryUploads(req.files, []);
    if (galleryResult.error) {
      return res.status(400).json({ message: galleryResult.error });
    }

    const item = await itemsModel.create({
      name: name.trim(),
      price: Number(price),
      image: mainUpload.image,
      gallery: galleryResult.gallery,
      stock: Number(stock),
      description: description.trim(),
      category: formattedCategory || "Uncategorized",
    });

    res.status(201).json({
      message: "Created Successfully ✅",
      item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const delItem = async (req, res) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const { id } = req.params;
    const toBeDeletedItem = await itemsModel.findById(id);
    if (!toBeDeletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    // Collect main image fileId and any existing gallery fileIds (0 to 4 items)
    const fileIdsToDelete = [
      toBeDeletedItem.image?.fileId,
      ...(Array.isArray(toBeDeletedItem.gallery)
        ? toBeDeletedItem.gallery.map((entry) => entry?.fileId)
        : []),
    ].filter(Boolean);

    // Delete all main and gallery image files from ImageKit in parallel
    await Promise.all(fileIdsToDelete.map((idToDelete) => client.files.delete(idToDelete)));

    await itemsModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deletion Successful ✅",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const patchItem = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id } = req.params;
    const product = await itemsModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const { name, description, price, oldPrice, category, stock } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    if (price !== undefined) {
      const currentPrice = Number(price);
      product.price = currentPrice;

      const hasOldPrice =
        oldPrice !== undefined && oldPrice !== "" && oldPrice !== "null" && oldPrice !== null;

      if (hasOldPrice && Number(oldPrice) > currentPrice) {
        const parsedOldPrice = Number(oldPrice);
        product.oldPrice = parsedOldPrice;
        product.discountPercentage = Math.round(
          ((parsedOldPrice - currentPrice) / parsedOldPrice) * 100,
        );
      } else {
        product.oldPrice = null;
        product.discountPercentage = null;
      }
    }

    // Read optional replacement main image from upload.fields output
    const mainImageFile = req.files?.image?.[0];

    // Validate, upload, and swap main image only when a new file is sent
    if (mainImageFile) {
      const mainUpload = await validateAndUploadSingleImage(mainImageFile);
      if (mainUpload.error) {
        return res.status(400).json({
          success: false,
          message: mainUpload.error,
        });
      }
      await client.files.delete(product.image.fileId);
      product.image.url = mainUpload.image.url;
      product.image.fileId = mainUpload.image.fileId;
    }

    // Validate and merge optional gallery files with existing product.gallery
    const galleryResult = await processGalleryUploads(req.files, product.gallery);
    // Return 400 if any gallery image has an invalid format
    if (galleryResult.error) {
      return res.status(400).json({
        success: false,
        message: galleryResult.error,
      });
    }

    // Persist updated gallery array on product
    product.gallery = galleryResult.gallery;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getOrders = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const orders = await orderModel.find().populate("user", "email");
    if (!orders) {
      return res.status(404).json({
        message: "Error fetching orders",
      });
    }
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getOrder = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id } = req.params;
    const order = await orderModel.findById(id).populate("user", "email");
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unauthorized",
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { status } = req.body;
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;
    await order.save();
    return res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getUsers = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const users = await userModel.find({ role: { $ne: "admin" } }).select("email");
    if (!users) {
      return res.status(404).json({
        message: "Error fetching users",
      });
    }
    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
const getUserDetails = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await orderModel.find({ user: id });

    // If no orders exist, simply return an empty array [].
    return res.status(200).json({
      user,
      orders: orders || [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
const patchUserDetails = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.isBanned = !user.isBanned;
    await user.save();
    return res.status(200).json({
      message: "User Status Updated Successfully",
      isBanned: user.isBanned,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

module.exports = {
  totalProducts,
  totalUsers,
  addItem,
  delItem,
  patchItem,
  getOrders,
  getOrder,
  updateOrder,
  getUsers,
  getUserDetails,
  patchUserDetails,
};
