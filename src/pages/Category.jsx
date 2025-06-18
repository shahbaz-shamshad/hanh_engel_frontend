import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthenticationLayout from "../layouts/Authentication";
import "../css/Category.css";
import axios from "axios";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: "de", name: "Deutschland", flag: "/src/assets/deutsch.svg" },
    { id: "us", name: "USA", flag: "/src/assets/usa.svg" },
    { id: "vn", name: "Vietnam", flag: "/src/assets/veitnam.svg" },
    { id: "gb", name: "Großbritannien", flag: "/src/assets/great-britian.svg" },
    { id: "es", name: "Spanien", flag: "/src/assets/spain.svg" },
    { id: "ch", name: "Schweiz", flag: "/src/assets/switzerland.svg" },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = async () => {
  if (selectedCategory) {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        throw new Error("Email not found in storage");
      }

      console.log("Making request to:", `${import.meta.env.VITE_API_URL}/api/category`);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/category`,
        { 
          country: selectedCategory,
          email: email 
        }
      );

      console.log("API response:", response.data);
      navigate("/", {
        state: { 
          message: "Country selected successfully",
          category: selectedCategory 
        }
      });
    } catch (error) {
      console.error("Full error details:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      }
      alert(error.message || "Failed to select country");
    }
  }
};
  


//   const handleContinue = () => {
//     if (selectedCategory) {
//       // Navigate to the next step or submit the selection
//       console.log(`Selected category: ${selectedCategory}`);
//       navigate("/registration-details", {
//         state: { category: selectedCategory },
//       });
//     }
//   };

  return (
    <div className="category-page">
      <Navbar />
      <AuthenticationLayout imageSrc="src/assets/registration-bg.svg">
        <div className="category-container">
          <h1>Kategorie</h1>
          <p className="category-instruction">WÄHLE EINE KATEGORIE AUS</p>

          <div className="category-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${
                  selectedCategory === category.id ? "selected" : ""
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <img
                  src={category.flag}
                  alt={`Flag of ${category.name}`}
                  className="category-flag"
                />
                <div className="category-name">{category.name}</div>
                {selectedCategory === category.id && (
                  <div className="category-check">✓</div>
                )}
              </div>
            ))}
          </div>

          <div className="category-buttons">
            <button className="back-button" onClick={handleBack}>
              Zurück
            </button>
            <button
              className="continue-button"
              onClick={handleContinue}
              disabled={!selectedCategory}
            >
              Weiter
            </button>
          </div>
        </div>
      </AuthenticationLayout>
    </div>
  );
};

export default CategoryPage;
