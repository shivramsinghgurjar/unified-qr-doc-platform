import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EventCompletionTemplate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventTitle: "",
    eventDate: "",
    location: "",
    sponsor: "",

    summary: "",
    highlights: "",

    images: "",
    videos: "",

    department: "",
    school: "",

    convenerName: "",
    convenerPhone: "",
    convenerEmail: "",

    speaker1: "",
    speaker2: "",
    speaker3: "",
    speaker4: "",
    speaker5: "",
    speaker6: "",

    eventType: "",

    participantsCount: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    if (!form.eventTitle || !form.eventDate) {
      alert("Please fill required fields");
      return;
    }

    navigate("/documents/preview", {
      state: {
        type: "event-completion",
        data: form
      }
    });
  };

  return (
    <Navbar>

      <div className="template-container">

        <h2>Event Completion Record</h2>

        <div className="form-grid">

          {/* BASIC DETAILS */}
          <input name="eventTitle" placeholder="Event Title" onChange={handleChange} />
          <input type="date" name="eventDate" onChange={handleChange} />

          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="sponsor" placeholder="Sponsor (if any)" onChange={handleChange} />

          {/* DESCRIPTION */}
          <textarea name="summary" placeholder="Event Summary (Max 200 words)" onChange={handleChange} />
          <textarea name="highlights" placeholder="Highlights & Notes" onChange={handleChange} />

          {/* MEDIA */}
          <input name="images" placeholder="Images Description / Links" onChange={handleChange} />
          <input name="videos" placeholder="Videos Description / Links" onChange={handleChange} />

          {/* ORGANIZATION */}
          <input name="department" placeholder="Department" onChange={handleChange} />
          <input name="school" placeholder="School" onChange={handleChange} />

          {/* CONVENER */}
          <input name="convenerName" placeholder="Convener Name" onChange={handleChange} />
          <input name="convenerPhone" placeholder="Convener Phone" onChange={handleChange} />
          <input name="convenerEmail" placeholder="Convener Email" onChange={handleChange} />

          {/* SPEAKERS */}
          <input name="speaker1" placeholder="Speaker 1" onChange={handleChange} />
          <input name="speaker2" placeholder="Speaker 2" onChange={handleChange} />
          <input name="speaker3" placeholder="Speaker 3" onChange={handleChange} />
          <input name="speaker4" placeholder="Speaker 4" onChange={handleChange} />
          <input name="speaker5" placeholder="Speaker 5" onChange={handleChange} />
          <input name="speaker6" placeholder="Speaker 6" onChange={handleChange} />

          {/* PARTICIPANTS */}
          <input name="participantsCount" placeholder="Number of Participants" onChange={handleChange} />

        </div>

        {/* ✅ EVENT TYPE (MCQ – MATCHING DOC) */}
        <div style={{ marginTop: "20px" }}>
          <label><b>Type of Event</b></label><br />

          <label><input type="radio" name="eventType" value="Conference" onChange={handleChange}/> Conference</label><br />
          <label><input type="radio" name="eventType" value="Seminar" onChange={handleChange}/> Seminar</label><br />
          <label><input type="radio" name="eventType" value="Workshop" onChange={handleChange}/> Workshop</label><br />
          <label><input type="radio" name="eventType" value="Guest Lecture" onChange={handleChange}/> Guest Lecture</label><br />
          <label><input type="radio" name="eventType" value="FDP" onChange={handleChange}/> FDP</label><br />
          <label><input type="radio" name="eventType" value="Industrial Visit" onChange={handleChange}/> Industrial Visit</label>
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>

      </div>

    </Navbar>
  );
}

export default EventCompletionTemplate;