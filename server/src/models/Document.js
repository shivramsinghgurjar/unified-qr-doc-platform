const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
      required: true,
    },

    // 🚀 NEW (SAFE ADD)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ prevent overwrite error
module.exports =
  mongoose.models.Document ||
  mongoose.model("Document", documentSchema);