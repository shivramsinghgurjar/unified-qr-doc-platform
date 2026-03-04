const express = require("express");
const router = express.Router();

const {
  createDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDocument);
router.get("/", authMiddleware, getDocuments);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;