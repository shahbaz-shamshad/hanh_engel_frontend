import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStepper from "./ui/ProgressStepper";
import ImageUploader from "./ui/ImageUploader";
import InfoModal from "./InfoModal";
import "../css/RegistrationDetailsForm.css";
import axios from "axios";

const RegistrationDetailsForm = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [infoA, setInfoA] = useState("");
  const [infoB, setInfoB] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (file) => {
    setProfileImage(file);
    console.log("Image selected:", file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    console.log("email being sent:", email);

    console.log("Form submitted:", { profileImage, infoA, infoB });
    // Navigate to next step or process form

    const formData = new FormData();

    formData.append("image", profileImage);
    formData.append("infoA", infoA);
    formData.append("infoB", infoB);
    formData.append("email", email)
    console.log(`Here: ${import.meta.env.VITE_API_URL}`);

axios.post(`${import.meta.env.VITE_API_URL}/api/complete-profile`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    // Authorization: `Bearer ${token}`,
  },
}).then(response => {
  console.log("Full response:", response);
  if (response.data.success) {  // Adjust based on your API's response structure
    navigate("/category");
  } else {
    alert("Profile completion failed: " + (response.data.message || "Unknown error"));
  }
})

  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="registration-details-form">
      <h1>Registrierung</h1>

      <ProgressStepper
        steps={["Schritt 1", "Schritt 2", "Schritt 3"]}
        currentStep={0}
      />

      <div className="help-link">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          Warum fragen wir danach?
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileImage">BILD</label>
          <ImageUploader onChange={handleImageChange} />
          <input
            type="file"
            id="profileImage"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="infoA">INFO A</label>
          <input
            type="text"
            id="infoA"
            placeholder="Info A eingeben"
            value={infoA}
            onChange={(e) => setInfoA(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="infoB">INFO B</label>
          <input
            type="text"
            id="infoB"
            placeholder="Info B eingeben"
            value={infoB}
            onChange={(e) => setInfoB(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={handleBack}>
            Zurück
          </button>
          <button type="submit" className="next-button">
            Weiter
          </button>
        </div>
      </form>

      <div className="info-visibility">
        <button>
          WER WIRD DIESE INFORMATIONEN SEHEN?
        </button>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default RegistrationDetailsForm;
