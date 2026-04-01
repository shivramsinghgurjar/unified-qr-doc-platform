import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import html2pdf from "html2pdf.js";

// ✅ Whats Happening Template
import template from "../templates/whatsHappening/template.html?raw";

// ✅ ECR Template Engine
import { renderECR } from "../templates/eventCompletion/preview";

function DocumentPreview() {

  const location = useLocation();
  const navigate = useNavigate();

  const doc = location.state;

  // ✅ SAFETY CHECK
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

  // 🔥 COMMON TEMPLATE ENGINE (for Whats Happening)
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

  // 🔥 MAIN LOGIC (SAFE UPDATE)
  let finalHTML = "";

  if (doc.type === "event-completion") {
    // ✅ ECR TEMPLATE
    finalHTML = renderECR(form);
  } else {
    // ✅ EXISTING WHATS HAPPENING (UNCHANGED)
    finalHTML = renderTemplate(template, form);
  }

  // ✅ SAVE (MongoDB)
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/documents", {
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

  // ✅ DOWNLOAD PDF (NO CHANGE)
  const handleDownload = () => {
    const element = document.getElementById("doc-template");
    html2pdf().from(element).save("event-report.pdf");
  };

  return (
    <Navbar>

      <div style={{ padding: "40px" }}>

        <h2>Document Preview</h2>

        {/* ✅ FINAL RENDER (WORKS FOR BOTH TYPES) */}
        <div dangerouslySetInnerHTML={{ __html: finalHTML }} />

        <div style={{ marginTop: "20px" }}>
          <button
            className="continue-btn"
            onClick={handleSave}
          >
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
        </div>

      </div>

    </Navbar>
  );
}

export default DocumentPreview;