const express = require("express");
const {
  totalProducts,
  totalUsers,
  addItem,
  delItem,
  patchItem,
  updateOrder,
  getOrders,
  getOrder,
  getUsers,
  getUserDetails,
  patchUserDetails,
} = require("../controllers/admin.controller");
const itemValidator = require("../middlewares/item.validation");
const multer = require("multer");
const { verifyToken, requireVerified } = require("../middlewares/verifyToken");

const upload = multer({
  storage: multer.memoryStorage(),
});
const adminRouter = express.Router();

const productUploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "galleryImage1", maxCount: 1 },
  { name: "galleryImage2", maxCount: 1 },
  { name: "galleryImage3", maxCount: 1 },
  { name: "galleryImage4", maxCount: 1 },
]);

// Apply middleware to ALL admin routes below
adminRouter.use(verifyToken, requireVerified);

adminRouter.get("/totalProducts", totalProducts);
adminRouter.get("/totalUsers", totalUsers);
adminRouter.post("/addItem", productUploadFields, itemValidator, addItem);
adminRouter.patch("/items/:id", productUploadFields, itemValidator, patchItem);
adminRouter.delete("/items/:id", delItem);
adminRouter.get("/orders", getOrders);
adminRouter.get("/orders/:id", getOrder);
adminRouter.patch("/orders/:id", updateOrder);
adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUserDetails);
adminRouter.patch("/users/:id", patchUserDetails);

module.exports = adminRouter;
