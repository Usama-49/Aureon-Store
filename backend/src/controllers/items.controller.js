const { default: mongoose } = require("mongoose");
const itemsModel = require("../models/items.model");

const getItems = async (req, res) => {
  try {
    if (req.user?.isBanned) {
      return res.status(401).json({
        message: "User Is banned!",
      });
    }

    const page = Number(req.query.page) || 1;
    const PAGE_SIZE = Number(req.query.limit) || 12;
    const { search, category } = req.query;
    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    //* case-insensitive regex search on product name
    if (search && search.trim() !== "") {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    const items = await itemsModel
      .find(filter)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const totalProducts = await itemsModel.countDocuments(filter);

    res.status(200).json({
      message: "Fetch Successful ✅",
      items,
      totalProducts,
    });
  } catch (error) {
    console.error("Fetch Items Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getItemById = async (req, res) => {
  try {
    if (req.user?.isBanned) {
      return res.status(401).json({
        message: "User Is banned!",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const item = await itemsModel.findById(id);

    if (!item) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Fetch Successful ✅",
      item,
    });
  } catch (error) {
    console.error("Fetch Single Item Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getItems, getItemById };
