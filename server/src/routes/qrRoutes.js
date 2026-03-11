const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQR,
  updateQRImage,
  getUserQRs,
  deleteQR,
  scanQR,
} = require("../controllers/qrController");

router.post("/", authMiddleware, createQR);

router.put("/:id/image", authMiddleware, updateQRImage);

router.get("/", authMiddleware, getUserQRs);

router.delete("/:id", authMiddleware, deleteQR);

router.get("/scan/:id", scanQR);

module.exports = router;