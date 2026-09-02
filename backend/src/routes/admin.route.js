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
  patchUserDetails
} = require("../controllers/admin.controller");
const itemValidator = require("../middlewares/item.validation");
const multer = require("multer");
const verifyToken = require("../middlewares/verifyToken");

const upload = multer({
  storage: multer.memoryStorage(),
});
const adminRouter = express.Router();
adminRouter.get("/totalProducts", verifyToken, totalProducts);
adminRouter.get("/totalUsers", verifyToken, totalUsers);
adminRouter.post("/addItem", verifyToken, upload.single("image"), itemValidator, addItem);
adminRouter.delete("/items/:id", delItem);
adminRouter.patch("/items/:id", verifyToken, upload.single("image"), itemValidator, patchItem);
adminRouter.get("/orders", verifyToken, getOrders);
adminRouter.get("/orders/:id", verifyToken, getOrder);
adminRouter.patch("/orders/:id", verifyToken, updateOrder);
adminRouter.get("/users", verifyToken, getUsers);
adminRouter.get("/users/:id", verifyToken, getUserDetails);
adminRouter.patch("/users/:id", verifyToken, patchUserDetails);



module.exports = adminRouter;
