const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECTION SUCCESS ${conn.connection.name}`.bgGreen);
  } catch (error) {
    console.log(`DB CONNECTION FAILED ${error.message}`.bgRed);
  }
};

module.exports = connectDB;
