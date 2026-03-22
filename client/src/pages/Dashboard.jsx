import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocuments, createDocument, deleteDocument } from "../services/documentService";
import Navbar from "../components/Navbar/Navbar";
import QRCodeGenerator from "../components/QRCodeGenerator";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      setFetchLoading(true);
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setLoading(true);
      await createDocument(title);
      setTitle("");
      fetchDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      setDeleteMsg({ ok: true, text: "Document deleted." });
      fetchDocuments();
    } catch (err) {
      const msg = err.response?.status === 403
        ? "Only ADMIN can delete documents."
        : "Failed to delete document.";
      setDeleteMsg({ ok: false, text: msg });
    } finally {
      setTimeout(() => setDeleteMsg(null), 3000);
    }
  };

  return (
    <Navbar>
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>My Documents</h1>
          <p>Create and manage your event documents.</p>
        </div>

        {/* Create form */}
        <form className="create-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Enter document title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "+ Create"}
          </button>
        </form>

        {deleteMsg && (
          <p className={`dash-msg ${deleteMsg.ok ? "dash-msg--ok" : "dash-msg--err"}`}>
            {deleteMsg.text}
          </p>
        )}

        <p className="doc-count">{documents.length} document{documents.length !== 1 ? "s" : ""}</p>

        <div className="document-list">
          {fetchLoading ? (
            <p className="empty-text">Loading...</p>
          ) : documents.length === 0 ? (
            <p className="empty-text">No documents yet. Create one above.</p>
          ) : (
            documents.map((doc) => (
              <div
                key={doc._id}
                className="document-card"
                onClick={() => navigate(`/document/${doc._id}`)}
                style={{
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{doc.title}</h3>
                  <small>{new Date(doc.createdAt).toLocaleString()}</small>
                  
                    <QRCodeGenerator value={doc._id} />
                 
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => { e.stopPropagation(); handleDelete(doc._id); }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </Navbar>
  );
}

export default Dashboard;