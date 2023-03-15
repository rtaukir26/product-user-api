const express = require("express");
app = express();
app.use(express.json());
const errorMiddleWare = require("./middleware/error");

const ProductRouter = require("./routes/productRouter");
const UserRouter = require("./routes/userRouter");

app.use("/api/v1", ProductRouter);
app.use("/api/v1", UserRouter);

//middleware, errorHandler
app.use(errorMiddleWare);

module.exports = app; //exports to server.js
