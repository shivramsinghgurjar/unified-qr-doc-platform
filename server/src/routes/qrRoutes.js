const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQR,
  updateQRImage,
  getUserQRs,
  deleteQR,
  scanQR,
  getQRAnalytics
} = require("../controllers/qrController");


// Create QR
router.post("/", authMiddleware, createQR);


// Update QR image (customized QR)
router.put("/:id/image", authMiddleware, updateQRImage);


// Get all user QRs
router.get("/", authMiddleware, getUserQRs);


// Analytics route
router.get("/analytics", authMiddleware, getQRAnalytics);


// Delete QR
router.delete("/:id", authMiddleware, deleteQR);


// Scan tracking route
router.get("/scan/:id", scanQR);


module.exports = router;