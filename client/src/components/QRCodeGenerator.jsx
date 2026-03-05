import QRCode from "qrcode";
import { useEffect, useState } from "react";

function QRCodeGenerator({ documentId }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const generate = async () => {
      const url = `http://localhost:5173/document/${documentId}`;
      const qrImage = await QRCode.toDataURL(url);
      setQr(qrImage);
    };

    generate();
  }, [documentId]);

  return (
    <div>
      <h3>Document QR</h3>
      {qr && <img src={qr} alt="QR Code" width="150" />}
    </div>
  );
}

export default QRCodeGenerator;