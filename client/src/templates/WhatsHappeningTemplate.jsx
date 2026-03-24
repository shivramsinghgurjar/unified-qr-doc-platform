import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WhatsHappeningTemplate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventTitle: "",
    eventType: "",
    startDate: "",
    endDate: "",
    venue: "",
    address: "",
    contactName: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {

    // basic validation
    if (!form.eventTitle || !form.startDate || !form.endDate) {
      alert("Please fill required fields");
      return;
    }

    // navigate to preview page and pass form data
    navigate("/documents/preview", {
      state: form
    });
  };

  return (
    <Navbar>

      <div className="template-container">

        <h2>Whats Happening Template</h2>

        <div className="form-grid">

          <input
            name="eventTitle"
            placeholder="Event Title"
            value={form.eventTitle}
            onChange={handleChange}
          />

          <input
            name="eventType"
            placeholder="Event Type"
            value={form.eventType}
            onChange={handleChange}
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />

          <input
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            name="contactName"
            placeholder="Contact Person Name"
            value={form.contactName}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        <button
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </Navbar>
  );
}

export default WhatsHappeningTemplate;