const express = require("express");
const { getItems, getItemById } = require("../controllers/items.controller");
const { optionalVerifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", optionalVerifyToken, getItems);
router.get("/:id", optionalVerifyToken, getItemById);

module.exports = router;
