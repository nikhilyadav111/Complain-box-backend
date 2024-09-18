const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token from Header//
      token = req.headers.authorization.split(" ")[1];

      //Verify Token//

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from Token//

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Unauthorized Access");
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(400);
      throw new Error("Unauthorized acccess");
    }
  } else {
    res.status(400);
    throw new Error("Unauthorized acccess");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = protect;
