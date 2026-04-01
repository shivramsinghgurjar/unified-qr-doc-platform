import QRCode from "qrcode";
import { useEffect, useState } from "react";

function QRCodeGenerator({ documentId }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const generate = async () => {

      // 🔥 IMPORTANT CHANGE → backend scan route
      const url = `http://localhost:5000/api/qr/scan/document/${documentId}`;

      const qrImage = await QRCode.toDataURL(url);
      setQr(qrImage);
    };

    if (documentId) generate();
  }, [documentId]);

  return (
    <div>
      <h3>Document QR</h3>
      {qr && <img src={qr} alt="QR Code" width="150" />}
    </div>
  );
}

export default QRCodeGenerator;