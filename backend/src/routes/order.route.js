const express = require("express");
const {
  addOrder,
  getOrderStats,
  getOrderSummary,
  getOrderDetails,
  cancelOrder,
} = require("../controllers/order.controller");
const { verifyToken, requireVerified } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, requireVerified, getOrderSummary);
router.post("/add", verifyToken, requireVerified, addOrder);
router.get("/stats", verifyToken, requireVerified, getOrderStats);
router.get("/:id", verifyToken, requireVerified, getOrderDetails);
router.patch("/:id/cancel", verifyToken, requireVerified, cancelOrder);

module.exports = router;
