const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    templateType: {
      type: String,
      enum: ["whats_happening", "event_completion"],
      required: true,
    },

    formData: {
      type: Object,
      default: {},
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Document", documentSchema);
