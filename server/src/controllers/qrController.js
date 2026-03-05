const Document = require("../models/Document");

const createDocument = async (req, res) => {
  const { title, content } = req.body;

  const document = await Document.create({
    title,
    content,
    user: req.user._id,
  });

  res.status(201).json(document);
};

const getDocuments = async (req, res) => {
  const documents = await Document.find({
    user: req.user._id,
  });

  res.json(documents);
};

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  if (document.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await document.deleteOne();

  res.json({ message: "Document deleted" });
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
};