//ErrorHandler for Id incorrect, id length less/long

const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => { //exports to app.js file
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  // Wrong MongoDB ID eroor, id length less or long
  if(err.name==="CastError")
  {
    let message=`Resource not found. Invalid: ${err.path}`
    err=new ErrorHandler(message,400)
  }
   


  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error: err,
  });
};

