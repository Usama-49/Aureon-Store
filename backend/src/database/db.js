const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      family:4
    });
    console.log("Connected to DataBase ✅");
};
const disconnectDB = async ()=>{
  await mongoose.disconnect();
  console.log("Disconnected from Database ...")
}
module.exports = {connectDB,disconnectDB};
