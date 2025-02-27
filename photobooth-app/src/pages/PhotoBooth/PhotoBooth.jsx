import Webcam from "react-webcam";

import React from "react";
import CaptureButton from "../../components/CaptureButton/CaptureButton"
import { useRef, useState } from "react";
import "./PhotoBooth.scss"
import {Link} from "react-router-dom";

function PhotoBooth() {
  const [photos, setPhotos] = useState([]);
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    if (photos.length === 3) {
      try {
        console.log("Sending photos to server:", photos);
        const response = await fetch(`http://localhost:5173`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photos),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json().catch(() => {
          throw new Error("Failed to parse JSON response");
        });

        console.log("Server response:", result);
      } catch (error) {
        console.error("Error creating photo strip:", error);
      }
    } else {
      alert("Not enough photos taken. Current count:", photos.length);
    }
  };

  return (
    <div className="PhotoBooth">
      Ready for your closeup?
      <div className="webcam_standin"></div>
      <Webcam />
      <Link to="/download"><CaptureButton /></Link>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        width="100%"
      />
      <button onClick={capturePhoto}>Take Photo</button>
      <button onClick={handleSubmit}>Create My Photo Strip</button>
      <div>
        {photos.map((photo, index) => (
          <img
            className="captured-photo"
            key={index}
            src={photo}
            alt={`Captured ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
export default PhotoBooth;
