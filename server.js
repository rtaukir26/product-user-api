const app = require("./app");
const connectDb = require("./config/dataBase");
require("./routes/productRouter");
require("./routes/userRouter");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

//Handling Uncaught exception error, like some variable not defined
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//connecting to Db
connectDb();
const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on", process.env.PORT);
});

//Unhandled Promise Rejection (mongodb url wrong), we need to crash the server
process.on("unhandledRejection", (err) => {
  //No need to use catch function in dataBase.js file
  console.log(`Unhandled Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
