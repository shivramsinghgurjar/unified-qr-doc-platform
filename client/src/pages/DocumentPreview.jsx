import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function DocumentPreview() {

  const location = useLocation();
  const navigate = useNavigate();

  const form = location.state;

  // If user directly opens preview without data
  if (!form) {
    return (
      <Navbar>
        <div style={{ padding: "40px" }}>
          <h2>No data available</h2>
        </div>
      </Navbar>
    );
  }

  // ✅ SAVE DOCUMENT FUNCTION
  const handleSave = () => {

    const existingDocs =
      JSON.parse(localStorage.getItem("documents")) || [];

    // 🔥 IMPORTANT: Detect type automatically
    let docType = "whats-happening";

    // If Event Completion fields exist → change type
    if (form.completionDate || form.organizer) {
      docType = "event-completion";
    }

    const newDoc = {
      id: Date.now(),
      type: docType, // ✅ FIXED
      ...form
    };

    localStorage.setItem(
      "documents",
      JSON.stringify([...existingDocs, newDoc])
    );

    navigate("/documents");
  };

  return (
    <Navbar>

      <div style={{ padding: "40px" }}>

        <h2>Document Preview</h2>

        <div
          style={{
            marginTop: "20px",
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h3>{form.eventTitle}</h3>

          {/* ✅ CONDITIONAL RENDERING (supports both types) */}

          {form.startDate && (
            <>
              <p><strong>Type:</strong> {form.eventType}</p>
              <p><strong>Start Date:</strong> {form.startDate}</p>
              <p><strong>End Date:</strong> {form.endDate}</p>
              <p><strong>Venue:</strong> {form.venue}</p>
              <p><strong>Address:</strong> {form.address}</p>

              <hr />

              <p><strong>Contact Person:</strong> {form.contactName}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Email:</strong> {form.email}</p>
            </>
          )}

          {form.completionDate && (
            <>
              <p><strong>Type:</strong> {form.eventType}</p>
              <p><strong>Completion Date:</strong> {form.completionDate}</p>
              <p><strong>Organizer:</strong> {form.organizer}</p>
              <p><strong>Attendees:</strong> {form.attendees}</p>

              <hr />

              <p><strong>Summary:</strong> {form.summary}</p>
              <p><strong>Remarks:</strong> {form.remarks}</p>
            </>
          )}

        </div>

        {/* ✅ SAVE BUTTON */}
        <button
          className="continue-btn"
          onClick={handleSave}
          style={{ marginTop: "20px" }}
        >
          Save Document
        </button>

      </div>

    </Navbar>
  );
}

export default DocumentPreview;