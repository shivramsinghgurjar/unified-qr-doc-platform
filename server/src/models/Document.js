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
  },
  { timestamps: true }
);

// ✅ prevent overwrite error
module.exports =
  mongoose.models.Document ||
  mongoose.model("Document", documentSchema);