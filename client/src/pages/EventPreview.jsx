import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function EventPreview() {

  const location = useLocation();
  const navigate = useNavigate();

  const form = location.state;

  if (!form) {
    return (
      <Navbar>
        <h2 style={{ padding: "40px" }}>No Data Found</h2>
      </Navbar>
    );
  }

  const handleSave = () => {

    const existingDocs =
      JSON.parse(localStorage.getItem("documents")) || [];

    const newDoc = {
      id: Date.now(),
      type: "event-completion",
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

        <h2>Event Completion Preview</h2>

        <div className="preview-card">

          <h3>{form.eventTitle}</h3>

          <p><strong>Type:</strong> {form.eventType}</p>
          <p><strong>Completion Date:</strong> {form.completionDate}</p>
          <p><strong>Organizer:</strong> {form.organizer}</p>
          <p><strong>Attendees:</strong> {form.attendees}</p>

          <hr />

          <p><strong>Summary:</strong> {form.summary}</p>
          <p><strong>Remarks:</strong> {form.remarks}</p>

        </div>

        <button className="continue-btn" onClick={handleSave}>
          Save Document
        </button>

      </div>

    </Navbar>
  );
}

export default EventPreview;