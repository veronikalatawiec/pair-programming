import Webcam from "react-webcam";
import React, { useState, useRef } from "react";
import "./PhotoBooth.scss";


function PhotoBooth() {
  const [photos, setPhotos] = useState([]);
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
  };

  const handleSubmit = async () => {
    if (photos.length === 3) {
      try {
        const response = await fetch(`http://localhost:${PORT}/strips`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photos),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error creating photo strip:", error);
      }
    }
  };

  return (
    <div className="photobooth">
      <div className="photo__webcam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        width="100%"
      /></div>
      <button className= "photo__click-button" onClick={capturePhoto}>Take Photo</button>
      <button className="photo__strip-button" onClick={handleSubmit}>Create My Photo Strip</button>
      <div>
        {photos.map((photo, index) => (
          <img className="captured-photo" key={index} src={photo} alt={`Captured ${index}`} />
        ))}
      </div>
    </div>
  );
}
export default PhotoBooth;
