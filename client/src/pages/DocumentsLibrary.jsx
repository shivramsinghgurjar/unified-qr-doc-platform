import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/documents.css";

function DocumentsLibrary() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  // Load saved documents
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents")) || [];

    setDocuments(storedDocs);
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
                <div key={doc.id} className="document-card">
                  <h4>{doc.eventTitle}</h4>

                  {/* Handles both types */}
                  <p>{doc.type || doc.eventType}</p>

                  <div className="template-actions">
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/documents/preview", {
                          state: doc,
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
