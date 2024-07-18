import React, { useState } from "react";
import Header from "./components/Header.tsx";
import Inputs from "./components/Inputs.tsx";
import "./App.css";

const App: React.FC = () => {
  const ENDPOINT_URL = "http://127.0.0.1:5001/generate-rose";

  interface BackendResponse {
    success: boolean;
    message: string;
  }

  const requestFromBackend = async (
    jsonData: Record<string, unknown>
  ): Promise<Blob> => {
    try {
      const response = await fetch(ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image from the backend");
      }

      // Assuming the response is a PNG image
      return response.blob(); // Return the blob (image) data
    } catch (error) {
      // console.error("Error sending data to backend:", error);
      throw error; // Propagate the error up
    }
  };

  const [showRose, setShowRose] = useState(false);
  const [roseImage, setRoseImage] = useState<string | null>(null); // State to store image URL
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleShowRose = async (updatedJSON: Record<string, unknown>) => {
    try {
      const blob = await requestFromBackend(updatedJSON);

      // Convert blob to URL for image display
      const imageUrl = URL.createObjectURL(blob);
      setRoseImage(imageUrl); // Set the image URL to state
      setShowRose(true); // Set flag to display the rose image
    } catch (error) {
      console.error("Error fetching image:", error);
      setErrorMessage("Error fetching image from the backend.");
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <Inputs propState={handleShowRose} />
        {showRose && roseImage && <img src={roseImage} alt="Windrose" />}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default App;
