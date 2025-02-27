import Webcam from "react-webcam";
import React, { useState, useRef } from "react";

function PhotoBooth() {
  const [photos, setPhotos] = useState([]);
  const webcamRef = useRef(null);

  return (
    <div className="PhotoBooth">
      React Webcam
      <Webcam />
    </div>
  );
}
export default PhotoBooth;
