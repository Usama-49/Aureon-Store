const mongoose = require("mongoose");

const formatCategory = (val) => {
  if (!val || typeof val !== "string") return "Uncategorized";
  return val
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const itemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0.01, "Price must be greater than 0"],
    },
    oldPrice: {
      type: Number,
      default: null,
      validate: {
        validator: function (val) {
          return val === null || val > 0;
        },
        message: "Old price must be greater than 0",
      },
    },
    discountPercentage: {
      type: Number,
      default: null,
      min: [1, "Discount percentage must be at least 1%"],
      max: [99, "Discount percentage cannot exceed 99%"],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
      trim: true,
      set: formatCategory,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  { timestamps: true },
);

itemsSchema.index({ category: 1 });
itemsSchema.index({ name: "text", description: "text" });

const itemsModel = mongoose.model("Item", itemsSchema);

module.exports = itemsModel;
