const express = require("express");
app = express();
app.use(express.json());
const cors = require("cors");
const bodyParser = require("body-parser");

const errorMiddleWare = require("./middleware/error");

//Routes import
const ProductRouter = require("./routes/productRouter");
const UserRouter = require("./routes/userRouter");
const AddToCartRouter = require("./routes/addToCartRoute");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use("/api/v1", ProductRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", AddToCartRouter);

//middleware, errorHandler
app.use(errorMiddleWare);

module.exports = app; //exports to server.js
