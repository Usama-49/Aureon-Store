const express = require("express");
const itemsModel = require("./models/items.model");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const adminRouter = require("./routes/admin.route");
const orderRouter = require("./routes/order.route");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin",adminRouter);
app.use("/api/order",orderRouter);


module.exports = app;
