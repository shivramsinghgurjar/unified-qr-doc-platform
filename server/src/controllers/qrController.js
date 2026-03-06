const QR = require("../models/QR");
const QRCode = require("qrcode");

const createQR = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "QR data is required" });
    }

    const baseURL = "http://localhost:5000/api/qr/scan";

    // Step 1: Create temporary QR to get ID
    const qr = await QR.create({
      data,
      qrUrl: "temp", // temporary value
      createdBy: req.user.id || req.user._id
    });

    // Step 2: Generate scan URL
    const scanURL = `${baseURL}/${qr._id}`;

    // Step 3: Generate QR Image
    const qrImage = await QRCode.toDataURL(scanURL);

    // Step 4: Update QR with real image
    qr.qrUrl = qrImage;

    await qr.save();

    res.status(201).json(qr);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get All QR Codes of user
const getUserQRs = async (req, res) => {
  try {
    const qrs = await QR.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(qrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete QR
const deleteQR = async (req, res) => {
  try {
    const qr = await QR.findById(req.params.id);

    if (!qr) {
      return res.status(404).json({ message: "QR not found" });
    }

    if (qr.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await qr.deleteOne();

    res.json({ message: "QR deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track scan
const scanQR = async (req, res) => {
  try {

    const qr = await QR.findById(req.params.id);

    if (!qr) {
      return res.status(404).send("QR not found");
    }

    qr.scans += 1;
    await qr.save();

    return res.redirect(qr.data);

  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
  createQR,
  getUserQRs,
  deleteQR,
  scanQR
};