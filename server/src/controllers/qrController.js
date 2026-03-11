const QR = require("../models/QR");
const QRCode = require("qrcode");

const createQR = async (req, res) => {
  try {

    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "QR data is required" });
    }

    const baseURL = "http://localhost:5000/api/qr/scan";

    const qr = await QR.create({
      data,
      qrUrl: "temp",
      createdBy: req.user.id || req.user._id
    });

    const scanURL = `${baseURL}/${qr._id}`;

    res.status(201).json({
      qr,
      scanURL
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const updateQRImage = async (req, res) => {

  try {

    const { qrImage } = req.body;

    const qr = await QR.findById(req.params.id);

    if (!qr) {
      return res.status(404).json({ message: "QR not found" });
    }

    qr.qrUrl = qrImage;

    await qr.save();

    res.json(qr);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


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
  updateQRImage,
  getUserQRs,
  deleteQR,
  scanQR
};