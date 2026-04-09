import { useEffect, useState } from "react"
import QRGenerator from "../components/QRGenerator"
import { getUserQRs, deleteQR } from "../services/qrService"
import Navbar from "../components/Navbar/Navbar"
import "../styles/qr.css"
import { downloadQR } from "../utils/downloadQR"

function QRDashboard() {

  const [qrs, setQrs] = useState([])

  const loadQRs = async () => {
    const data = await getUserQRs()
    setQrs(data)
  }

  useEffect(() => {
    loadQRs()
  }, [])

  const handleDelete = async (id) => {
    await deleteQR(id)
    loadQRs()
  }

  return (
    <Navbar>

      <div className="qr-dashboard">

        <div className="qr-dashboard__head">
          <div className="qr-dashboard__head-row">
            <h2>My QR Codes</h2>
            <a href="https://feedback-form-mu-three.vercel.app" className="qr-dashboard__create-btn">
            (+) Create Custom Forms
            </a>
          </div>
          <p>Generate, customize and track all your QR codes in one place.</p>
        </div>

        {/* QR Generator */}
        <QRGenerator refreshQRs={loadQRs} />

        {qrs.length > 0 && (
          <>
            <h3 className="qr-list__heading">Saved QR Codes</h3>

            <div className="qr-list">

              {qrs.map((qr) => (
                <div key={qr._id} className="qr-card">

                  <img src={qr.qrUrl} alt="QR Code" />

                  <p className="qr-card__scans">
                    {qr.scans} scans
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="qr-card__actions">

                    {/* Download QR */}
                    <button
                      className="download-btn"
                      onClick={() => downloadQR(qr.qrUrl, `qr-${qr._id}`)}
                    >
                      Download
                    </button>

                    {/* Delete QR */}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(qr._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

    </Navbar>
  )
}

export default QRDashboard