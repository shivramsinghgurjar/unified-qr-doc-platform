import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DocumentView() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/documents/${id}`
        );

        setDocument(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return <p style={{ color: "white" }}>Loading document...</p>;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{document.title}</h1>

      <p>
        Created At: {new Date(document.createdAt).toLocaleString()}
      </p>

      <p>Document ID: {document._id}</p>
    </div>
  );
}

export default DocumentView;