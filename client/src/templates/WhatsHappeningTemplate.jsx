import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WhatsHappeningTemplate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventTitle: "",
    ezoneId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    venue: "",
    address: "",
    contactName: "",
    phone: "",
    email: "",
    school: "",
    department: "",
    eventType: "",
    description: "",
    objective: "",
    convener: "",
    coordinator: "",
    collaboration: "",
    chiefGuest: "",
    speakers: "",
    budget: "",
    participants: "",
    targetAudience: [],
    mediaCoverage: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ MSQ handler
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    setForm((prev) => {
      const arr = prev.targetAudience || [];

      if (checked) {
        return { ...prev, targetAudience: [...arr, value] };
      } else {
        return {
          ...prev,
          targetAudience: arr.filter((item) => item !== value),
        };
      }
    });
  };

  const handleContinue = () => {
    if (!form.eventTitle || !form.startDate || !form.endDate) {
      alert("Please fill required fields");
      return;
    }

    navigate("/documents/preview", {
      state: {
        type: "whats-happening",
        data: form
      }
    });
  };

  return (
    <Navbar>

      <div className="template-container">

        <h2>Whats Happening Template</h2>

        <div className="form-grid">

          <input name="eventTitle" placeholder="Event Title" onChange={handleChange} />
          <input name="ezoneId" placeholder="Ezone ID" onChange={handleChange} />

          <input type="date" name="startDate" onChange={handleChange} />
          <input type="time" name="startTime" onChange={handleChange} />

          <input type="date" name="endDate" onChange={handleChange} />
          <input type="time" name="endTime" onChange={handleChange} />

          <input name="venue" placeholder="Venue" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />

          <input name="contactName" placeholder="Contact Person Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />

          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="school" placeholder="School" onChange={handleChange} />

          <input name="department" placeholder="Department" onChange={handleChange} />

          {/* ✅ MCQ */}
          <select name="eventType" onChange={handleChange}>
            <option value="">Select Event Type</option>
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Training Programme</option>
            <option>Guest Lecture</option>
          </select>

          <textarea name="description" placeholder="Event Description" onChange={handleChange} />
          <textarea name="objective" placeholder="Objective" onChange={handleChange} />

          <input name="convener" placeholder="Convener Details" onChange={handleChange} />
          <input name="coordinator" placeholder="Coordinator Details" onChange={handleChange} />

          <input name="collaboration" placeholder="Collaboration" onChange={handleChange} />
          <input name="chiefGuest" placeholder="Chief Guest" onChange={handleChange} />

          <input name="speakers" placeholder="Speakers" onChange={handleChange} />
          <input name="budget" placeholder="Budget" onChange={handleChange} />

          <input name="participants" placeholder="Participants" onChange={handleChange} />

        </div>

        {/* 🔥 MSQ */}
        <div style={{ marginTop: "20px" }}>
          <label><b>Target Audience</b></label><br />

          <label><input type="checkbox" value="UG" onChange={handleCheckbox} /> UG</label>
          <label><input type="checkbox" value="PG" onChange={handleCheckbox} /> PG</label>
          <label><input type="checkbox" value="Faculty" onChange={handleCheckbox} /> Faculty</label>
        </div>

        {/* ✅ MCQ */}
        <div style={{ marginTop: "20px" }}>
          <label><b>Media Coverage</b></label><br />

          <label><input type="radio" name="mediaCoverage" value="Photo" onChange={handleChange} /> Photo</label>
          <label><input type="radio" name="mediaCoverage" value="Video" onChange={handleChange} /> Video</label>
          <label><input type="radio" name="mediaCoverage" value="Both" onChange={handleChange} /> Both</label>
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>

      </div>

    </Navbar>
  );
}

export default WhatsHappeningTemplate;