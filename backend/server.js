const express = require("express");
const dotenv = require("dotenv").config(); // Important to include .config() here
const colors = require("colors");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Create an express app
const app = express();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
