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
      createdBy: req.user.id || req.user._id,
    });

    const scanURL = `${baseURL}/${qr._id}`;

    res.status(201).json({
      qr,
      scanURL,
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

const getQRAnalytics = async (req, res) => {
  try {

    const qrs = await QR.find({ createdBy: req.user._id });

    const totalQRs = qrs.length;

    let totalScans = 0;

    qrs.forEach(qr => {
      totalScans += qr.scans;
    });

    const topQR = qrs.sort((a,b) => b.scans - a.scans)[0] || null;

    // Generate dynamic weekly chart
    const weeklyData = [
      { day: "Mon", scans: 0 },
      { day: "Tue", scans: 0 },
      { day: "Wed", scans: 0 },
      { day: "Thu", scans: 0 },
      { day: "Fri", scans: 0 },
      { day: "Sat", scans: 0 },
      { day: "Sun", scans: 0 },
    ];

    qrs.forEach(qr => {

      const day = new Date(qr.updatedAt).getDay();

      const map = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

      const index = weeklyData.findIndex(d => d.day === map[day]);

      if(index !== -1){
        weeklyData[index].scans += qr.scans;
      }

    });

    res.json({
      totalQRs,
      totalScans,
      uniqueScans: totalScans,
      topQR,
      weeklyData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQR,
  updateQRImage,
  getUserQRs,
  deleteQR,
  scanQR,
  getQRAnalytics
};