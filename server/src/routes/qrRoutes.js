const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQR,
  createDocumentQR,
  updateQRImage,
  getUserQRs,
  deleteQR,
  scanQR,
  scanDocumentQR,
  getQRAnalytics
} = require("../controllers/qrController");

// Existing
router.post("/", authMiddleware, createQR);
router.put("/:id/image", authMiddleware, updateQRImage);
router.get("/", authMiddleware, getUserQRs);
router.get("/analytics", authMiddleware, getQRAnalytics);
router.delete("/:id", authMiddleware, deleteQR);
router.get("/scan/:id", scanQR);

// 🚀 NEW DOCUMENT QR ROUTES
router.post("/document", authMiddleware, createDocumentQR);
router.get("/scan/document/:id", scanDocumentQR);

module.exports = router;