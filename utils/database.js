require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.databaseUrl);
    console.log("success");
  } catch (error) {
    console.log("failed");
    throw new Error();
  }
};

module.exports = connectDB;
