const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      default: null,
    },

    data: {
      type: String,
      required: true,
    },

    qrUrl: {
      type: String,
      required: true,
    },

    scans: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("QR", qrSchema);