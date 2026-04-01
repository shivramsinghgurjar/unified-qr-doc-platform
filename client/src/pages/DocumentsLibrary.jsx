import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/documents.css";

function DocumentsLibrary() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  // ✅ LOAD FROM BACKEND (SAFE UPDATE)
  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch((err) => {
        console.error("Error fetching documents:", err);

        // 🔥 FALLBACK (IMPORTANT - keeps old system working)
        const storedDocs =
          JSON.parse(localStorage.getItem("documents")) || [];
        setDocuments(storedDocs);
      });
  }, []);

  return (
    <Navbar>
      <div className="documents-page">
        {/* Header */}
        <div className="documents-header">
          <h2>Documents Library</h2>

          <button
            className="add-document-btn"
            onClick={() => navigate("/documents/whats-happening")}
          >
            + Add Document
          </button>
        </div>

        {/* Templates Section */}
        <div className="templates-section">
          <h3>Templates</h3>

          <div className="templates-grid">
            {/* What's Happening */}
            <div className="template-card">
              <h4>What's Happening</h4>
              <div className="template-actions">
                <button onClick={() => navigate("/documents/whats-happening")}>
                  Create
                </button>
              </div>
            </div>

            {/* Event Completion */}
            <div className="template-card">
              <h4>Event Completion Record</h4>
              <div className="template-actions">
                <button onClick={() => navigate("/documents/event-completion")}>
                  Create
                </button>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="template-card disabled">
              <h4>Template Coming Soon</h4>
            </div>
          </div>
        </div>

        {/* Saved Documents Section */}
        <div className="templates-section">
          <h3>Your Documents</h3>

          {documents.length === 0 ? (
            <p>No documents created yet.</p>
          ) : (
            <div className="documents-grid">
              {documents.map((doc) => (
                <div
                  key={doc._id || doc.id}
                  className="document-card"
                >
                  {/* ✅ FIXED DATA ACCESS */}
                  <h4>
                    {doc.data?.eventTitle || doc.eventTitle || "Untitled"}
                  </h4>

                  {/* ✅ TYPE FIX */}
                  <p>{doc.type || doc.eventType}</p>

                  <div className="template-actions">
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/documents/preview", {
                          state: doc.data ? doc : doc, // safe for both cases
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default DocumentsLibrary;