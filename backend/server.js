const express = require("express");
const dotenv = require("dotenv").config(); // Important to include .config() here
const colors = require("colors");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Create an express app
const app = express();

// Add middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Add routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/imagelink", require("./routes/imageLinkRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
