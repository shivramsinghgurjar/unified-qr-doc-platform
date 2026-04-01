const express = require("express");
const {
  createDocument,
  getDocuments,
} = require("../controllers/documentController");

const router = express.Router();

// ✅ CREATE DOCUMENT
router.post("/", createDocument);

// ✅ GET DOCUMENTS
router.get("/", getDocuments);

module.exports = router; 