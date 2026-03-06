const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQR,
  getUserQRs,
  deleteQR,
  scanQR,
} = require("../controllers/qrController");

// Create QR
router.post("/", authMiddleware, createQR);

// Get User QRs
router.get("/", authMiddleware, getUserQRs);

// Delete QR
router.delete("/:id", authMiddleware, deleteQR);

router.get("/scan/:id", scanQR);

module.exports = router;