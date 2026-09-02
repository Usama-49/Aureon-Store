const itemsModel = require("../models/items.model");
const orderModel = require("../models/orders.model");
const mongoose = require("mongoose");

const addOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress } = req.body;
    //* Items Validation ...
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }
    //* Shipping Adress Validation ...
    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.zipCode
    ) {
      return res.status(400).json({
        message: "You didn't enter a shipping adress.",
      });
    }
    //* Item validation 1 by 1 etc
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity.",
        });
      }

      if (!item.product) {
        return res.status(400).json({
          message: "Product ID is required.",
        });
      }

      const product = await itemsModel.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock.`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      totalPrice += product.price * item.quantity;
    }
    //* Create order on DB
    const order = await orderModel.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalPrice,
    });
    //* Reduce quantity in Stock
    for (const item of items) {
      const product = await itemsModel.findById(item.product);

      product.stock -= item.quantity;

      await product.save();
    }
    //* Return ...
    return res.status(201).json({
      message: "Order placed successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOrderStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const totalOrders = await orderModel.countDocuments({ user: userId });
    const pending = await orderModel.countDocuments({
      user: userId,
      orderStatus: "Pending",
    });
    const delivered = await orderModel.countDocuments({
      user: userId,
      orderStatus: "Delivered",
    });
    const cancelled = await orderModel.countDocuments({
      user: userId,
      orderStatus: "Cancelled",
    });
    const spentResult = await orderModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    const totalSpent = spentResult.length > 0 ? spentResult[0].totalSpent : 0;

    return res.status(200).json({
      message: "Success",
      totalOrders,
      pending,
      cancelled,
      delivered,
      totalSpent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel
      .find({ user: userId })
      .select("_id items totalPrice orderStatus createdAt")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    for (const item of order.items) {
      const product = await itemsModel.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    order.orderStatus = "Cancelled";
    await order.save();
    return res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = { addOrder, getOrderStats, getOrderSummary, getOrderDetails, cancelOrder };
