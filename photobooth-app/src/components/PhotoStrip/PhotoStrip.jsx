import React from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import "./PhotoStrip.scss"
// import Link from "react-router-dom";

function PhotoStrip ({ image }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "photo-strip.png";
    link.click();
  };

  return (
    <div className="photo__strip">
      <img src={image} alt="Photo Strip" />
      <DownloadButton />
    </div>
  );
};

export default PhotoStrip;
