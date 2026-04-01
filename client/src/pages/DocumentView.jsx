import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function DocumentView() {

  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then(res => res.json())
      .then(data => {
        const found = data.find(d => d._id === id);
        setDoc(found);
      });
  }, [id]);

  if (!doc) return <h2>Loading...</h2>;

  return (
    <Navbar>
      <div style={{ padding: "40px" }}>
        <h2>{doc.data?.eventTitle}</h2>

        <pre>
          {JSON.stringify(doc.data, null, 2)}
        </pre>
      </div>
    </Navbar>
  );
}

export default DocumentView;