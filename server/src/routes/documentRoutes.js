const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createDocument,
  getDocuments,
  deleteDocument
} = require("../controllers/documentController");


router.post("/", authMiddleware, createDocument);

router.get("/", authMiddleware, getDocuments);

// Only ADMIN can delete document
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteDocument
);

module.exports = router;  