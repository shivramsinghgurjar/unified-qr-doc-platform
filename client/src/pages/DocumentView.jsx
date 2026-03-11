import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocument } from "../services/documentService";
import Navbar from "../components/Navbar/Navbar";

function DocumentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDocument(id);
        setDocument(data);
      } catch (err) {
        setError("Could not load document.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <Navbar>
      <div className="dashboard-container">

        <button className="doc-back-btn" onClick={() => navigate("/app")}>
          ← Back to Documents
        </button>

        {loading && <p className="empty-text">Loading document...</p>}
        {error   && <p className="dash-msg dash-msg--err">{error}</p>}

        {document && (
          <div className="doc-view-card">
            <h1 className="doc-view__title">{document.title}</h1>
            <p className="doc-view__meta">
              Created: {new Date(document.createdAt).toLocaleString()}
            </p>
            <p className="doc-view__meta">ID: <code>{document._id}</code></p>
          </div>
        )}

      </div>
    </Navbar>
  );
}

export default DocumentView;