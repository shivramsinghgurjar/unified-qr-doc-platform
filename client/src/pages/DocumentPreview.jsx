import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import html2pdf from "html2pdf.js";

// ✅ Templates
import template from "../templates/whatsHappening/template.html?raw";
import { renderECR } from "../templates/eventCompletion/preview";

// ✅ QR Service
import { createDocumentQR } from "../services/qrService";

function DocumentPreview() {

  const location = useLocation();
  const navigate = useNavigate();

  const doc = location.state;

  if (!doc) {
    return (
      <Navbar>
        <div style={{ padding: "40px" }}>
          <h2>No data available</h2>
        </div>
      </Navbar>
    );
  }

  const form = doc.data || doc;

  // 🔥 TEMPLATE ENGINE
  const renderTemplate = (html, data) => {
    let output = html;

    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (Array.isArray(value)) {
        value = value.join(", ");
      }

      output = output.replaceAll(`{{${key}}}`, value || "");
    });

    return output;
  };

  // 🔥 TEMPLATE SWITCH
  let finalHTML = "";

  if (doc.type === "event-completion") {
    finalHTML = renderECR(form);
  } else {
    finalHTML = renderTemplate(template, form);
  }

  // ✅ SAVE DOCUMENT
  const handleSave = async () => {
    try {
      const response = await fetch("https://qgen-backend-n815.onrender.com/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: doc.type,
          data: form,
        }),
      });

      if (!response.ok) throw new Error("Failed");

      navigate("/documents");
    } catch (error) {
      console.error(error);
      alert("Error saving document");
    }
  };

  // ✅ DOWNLOAD PDF
  const handleDownload = () => {
    const element = document.getElementById("doc-template");

    html2pdf().set({
      margin: 10,
      filename: "event-report.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(element).save();
  };

  // 🚀 FIXED: GENERATE QR
  const handleGenerateQR = async () => {
    try {
      // Step 1: Save document first
      const response = await fetch("https://qgen-backend-n815.onrender.com/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: doc.type,
          data: form,
        }),
      });

      if (!response.ok) throw new Error("Document save failed");

      const savedDoc = await response.json();

      // Step 2: Generate QR (FIXED)
      const qrResponse = await createDocumentQR(savedDoc._id);

      if (!qrResponse) {
        alert("QR generation failed");
        return;
      }

      alert("QR Generated Successfully!");
      console.log("Scan URL:", qrResponse.scanURL);

    } catch (err) {
      console.error(err);
      alert("QR generation failed");
    }
  };

  return (
    <Navbar>

      <div style={{ padding: "40px" }}>

        <h2>Document Preview</h2>

        <div dangerouslySetInnerHTML={{ __html: finalHTML }} />

        <div style={{ marginTop: "20px" }}>
          <button className="continue-btn" onClick={handleSave}>
            Save Document
          </button>

          <button
            onClick={handleDownload}
            style={{
              marginLeft: "10px",
              background: "green",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px"
            }}
          >
            Download
          </button>

          <button
            onClick={handleGenerateQR}
            style={{
              marginLeft: "10px",
              background: "purple",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px"
            }}
          >
            Generate QR
          </button>
        </div>

      </div>

    </Navbar>
  );
}

export default DocumentPreview;