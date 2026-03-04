import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // for create button
  const [fetchLoading, setFetchLoading] = useState(true); // for document fetch

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ---------------- FETCH DOCUMENTS ----------------
  const fetchDocuments = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      await axios.delete(
        `http://localhost:5000/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ---------------- LOAD ON MOUNT ----------------
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchDocuments();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>My Documents 📄</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
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
        <p style={{ marginTop: "15px", fontWeight: "500" }}>
          Total Documents: {documents.length}
        </p>

        {/* Document List */}
        <div className="document-list">
          {fetchLoading ? (
            <p className="empty-text">Loading documents...</p>
          ) : documents.length === 0 ? (
            <p className="empty-text">
              No documents yet. Create one 🚀
            </p>
          ) : (
            documents.map((doc) => (
              <div key={doc._id} className="document-card">
                <div>
                  <h3>{doc.title}</h3>
                  <small>
                    {new Date(doc.createdAt).toLocaleString()}
                  </small>
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
  );
}

export default Dashboard;