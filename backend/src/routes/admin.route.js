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

// Apply middleware to ALL admin routes below
adminRouter.use(verifyToken, requireVerified);

adminRouter.get("/totalProducts", totalProducts);
adminRouter.get("/totalUsers", totalUsers);
adminRouter.post("/addItem", upload.single("image"), itemValidator, addItem);
adminRouter.delete("/items/:id", delItem);
adminRouter.patch("/items/:id", upload.single("image"), itemValidator, patchItem);
adminRouter.get("/orders", getOrders);
adminRouter.get("/orders/:id", getOrder);
adminRouter.patch("/orders/:id", updateOrder);
adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUserDetails);
adminRouter.patch("/users/:id", patchUserDetails);

module.exports = adminRouter;
