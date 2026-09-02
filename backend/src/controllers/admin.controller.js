const itemsModel = require("../models/items.model");
const userModel = require("../models/user.model");
const orderModel = require("../models/orders.model");
const { uploadImage, client } = require("../services/imagekit");

const totalProducts = async (req, res) => {
  if(req.user.isBanned){
    return res.status(401).json({
      message:"User is Banned"
    })
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
    const { name, category, stock, description, price } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required!",
      });
    }
    const image = req.file.buffer;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Only JPG, PNG and WEBP images are allowed.",
      });
    }
    const result = await uploadImage(image.toString("base64"));
    const item = await itemsModel.create({
      name,
      price,
      image: {
        url: result.url,
        fileId: result.fileId,
      },
      stock,
      description,
      category,
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
  try {
    const { id } = req.params;
    const toBeDeletedItem = await itemsModel.findById(id);
    if (!toBeDeletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    const fileId = toBeDeletedItem.image.fileId;
    await client.files.delete(fileId);
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
    const { name, description, price, category, stock } = req.body;
    if (name !== undefined) product.name = name;

    if (description !== undefined) product.description = description;

    if (price !== undefined) product.price = price;

    if (category !== undefined) product.category = category;

    if (stock !== undefined) product.stock = stock;
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Only JPG, PNG and WEBP images are allowed.",
        });
      }
      const image = req.file.buffer;
      const result = await uploadImage(image.toString("base64"));
      await client.files.delete(product.image.fileId);
      product.image.url = result.url;
      product.image.fileId = result.fileId;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product,
    });
  } catch (error) {
    console.error(error);

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
    const orders = await orderModel.find({ user: { $eq: id } });
    if (orders.length === 0) {
      return res.status(204).json({
        message: "No orders to fetch!",
      });
    }
    return res.status(200).json({
      user,
      orders,
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
      isBanned: user.isBanned
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
