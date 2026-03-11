import { useState, useEffect, useRef } from "react";
import { createQR } from "../services/qrService";
import QRCodeStyling from "qr-code-styling";

function QRGenerator({ refreshQRs }) {
  const [text, setText] = useState("");

  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const [logo, setLogo] = useState(null);

  const qrRef = useRef(null);
  const qrCode = useRef(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: size,
      height: size,
      data: text || "QRDoc",
      dotsOptions: {
        color: qrColor,
        type: "rounded",
      },
      backgroundOptions: {
        color: bgColor,
      },
      image: logo || "",
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    });

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (!qrCode.current) return;

    qrCode.current.update({
      width: size,
      height: size,
      data: text || "QRDoc",
      dotsOptions: {
        color: qrColor,
      },
      backgroundOptions: {
        color: bgColor,
      },
      image: logo || "",
    });
  }, [text, qrColor, bgColor, size, logo]);

  const handleGenerate = async () => {
    if (!text) return;

    // Step 1: create QR in backend
    const res = await createQR({ data: text });

    if (!res) return;

    const qrId = res.qr._id;
    const scanURL = res.scanURL;

    // Step 2: update preview QR with scan URL
    qrCode.current.update({
      data: scanURL,
    });

    // Step 3: export customized QR
    const blob = await qrCode.current.getRawData("png");

    const reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onloadend = async () => {
      const base64 = reader.result;

      await fetch(`http://localhost:5000/api/qr/${qrId}/image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          qrImage: base64,
        }),
      });

      refreshQRs();
    };
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="qr-generator">
      <h3>Create QR Code</h3>

      <div className="qr-input-group">
        <input
          type="text"
          placeholder="Enter text or URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleGenerate}>Generate</button>
      </div>

      <div className="qr-customization">
        <h4>Customize QR</h4>

        <label>QR Color</label>
        <input
          type="color"
          value={qrColor}
          onChange={(e) => setQrColor(e.target.value)}
        />

        <label>Background</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />

        <label>Size</label>
        <input
          type="range"
          min="150"
          max="400"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />

        <label>Logo</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>

      <div
        ref={qrRef}
        style={{
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default QRGenerator;
