const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const documentRoutes = require("./src/routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;