import { useEffect, useState } from "react";
import QRGenerator from "../components/QRGenerator";
import { getUserQRs, deleteQR } from "../services/qrService";
import Navbar from "../components/Navbar";
import "../styles/qr.css";

function QRDashboard() {

  const [qrs, setQrs] = useState([]);

  const loadQRs = async () => {
    const data = await getUserQRs();
    setQrs(data);
  };

  useEffect(() => {
    loadQRs();
  }, []);

  const handleDelete = async (id) => {
    await deleteQR(id);
    loadQRs();
  };

  return (
    <>
      <Navbar />

      <div className="qr-dashboard">

        <h2>My QR Codes</h2>

        <QRGenerator refreshQRs={loadQRs} />

        <div className="qr-list">

          {qrs.map((qr) => (
            <div key={qr._id} className="qr-card">

              <img src={qr.qrUrl} alt="QR Code" />

              <p>Scans: {qr.scans}</p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(qr._id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default QRDashboard;