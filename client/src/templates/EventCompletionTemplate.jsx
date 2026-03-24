import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EventCompletionTemplate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventTitle: "",
    eventType: "",
    completionDate: "",
    organizer: "",
    attendees: "",
    summary: "",
    remarks: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    navigate("/documents/event-preview", { state: form });
  };

  return (
    <Navbar>

      <div className="template-container">

        <h2>Event Completion Record</h2>

        <div className="form-grid">

          <input name="eventTitle" placeholder="Event Title" onChange={handleChange} />
          <input name="eventType" placeholder="Event Type" onChange={handleChange} />

          <input type="date" name="completionDate" onChange={handleChange} />
          <input name="organizer" placeholder="Organizer Name" onChange={handleChange} />

          <input name="attendees" placeholder="No. of Attendees" onChange={handleChange} />

          <input name="summary" placeholder="Event Summary" onChange={handleChange} />

          <input name="remarks" placeholder="Remarks" onChange={handleChange} />

        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>

      </div>

    </Navbar>
  );
}

export default EventCompletionTemplate;