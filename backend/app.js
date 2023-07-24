const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
const authRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
