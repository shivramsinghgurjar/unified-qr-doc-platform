const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const qrRoutes = require("./src/routes/qrRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/qr", qrRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;