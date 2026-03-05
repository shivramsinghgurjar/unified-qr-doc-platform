import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QRCodeGenerator from "../components/QRCodeGenerator";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ---------------- FETCH DOCUMENTS ----------------
  const fetchDocuments = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchLoading(false);
    }
  };

  // ---------------- CREATE DOCUMENT ----------------
  const createDocument = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/documents",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchDocuments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE DOCUMENT ----------------
  const deleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Document deleted successfully ✅");

      fetchDocuments();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        alert("❌ Only ADMIN can delete documents.");
      } else {
        alert("❌ Failed to delete document.");
      }
    }
  };

  // ---------------- LOAD ON MOUNT ----------------
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h2>My Documents 📄</h2>
          </div>

          {/* Create Form */}
          <form className="create-form" onSubmit={createDocument}>
            <input
              type="text"
              placeholder="Enter document title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </form>

          {/* Total Count */}
          <p className="doc-count">Total Documents: {documents.length}</p>

          {/* Document List */}
          <div className="document-list">
            {fetchLoading ? (
              <p className="empty-text">Loading documents...</p>
            ) : documents.length === 0 ? (
              <p className="empty-text">No documents yet. Create one 🚀</p>
            ) : (
              documents.map((doc) => (
                <div key={doc._id} className="document-card">
                  <div>
                    <h3>{doc.title}</h3>

                    <small>
                      {new Date(doc.createdAt).toLocaleString()}
                    </small>

                    {/* QR CODE */}
                    <QRCodeGenerator documentId={doc._id} />
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteDocument(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;