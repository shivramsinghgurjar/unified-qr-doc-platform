const Document = require("../models/Document");

// ✅ CREATE DOCUMENT
const createDocument = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const newDoc = new Document({
      type,
      data,

      // 🚀 NEW (SAFE ADD)
      createdBy: req.user?._id || null,
    });

    await newDoc.save();

    res.status(201).json(newDoc);

  } catch (error) {
    console.error("Create Document Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET DOCUMENTS
const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error("Fetch Document Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDocument,
  getDocuments,
};