const express = require("express");
const {addOrder, getOrderStats,getOrderSummary, getOrderDetails,cancelOrder} = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/",verifyToken,getOrderSummary);
router.post("/add",verifyToken,addOrder);
router.get("/stats",verifyToken,getOrderStats);
router.get("/:id",verifyToken, getOrderDetails);
router.patch("/:id/cancel",verifyToken,cancelOrder);


module.exports = router;