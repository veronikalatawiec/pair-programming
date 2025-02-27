import React from "react";

const PhotoStrip = ({ image }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "photo-strip.png";
    link.click();
  };

  return (
    <div className="photo__strip">
      <img src={image} alt="Photo Strip" />
      <button className="download__button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default PhotoStrip;
