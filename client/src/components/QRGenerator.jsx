import { useState } from "react";
import { createQR } from "../services/qrService";

function QRGenerator({ refreshQRs }) {

  const [text, setText] = useState("");

  const handleGenerate = async () => {

    if (!text) return;

    const res = await createQR(text);

    if (res) {
      refreshQRs();   // reload QR list
    }

    setText("");
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

        <button onClick={handleGenerate}>
          Generate
        </button>

      </div>

    </div>
  );
}

export default QRGenerator;