const app = require("./src/app");
const { disconnectDB, connectDB } = require("./src/database/db");

const serverStart = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server Running at Port ${PORT} ✅`);
    });

    //! Graceful Shutdown handling

    let shuttingDown = false;
    const shutdown = async () => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log("Shutting down...");
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Oops Error Occurred ❌", err);
    process.exit(1);
  }
};

serverStart();
