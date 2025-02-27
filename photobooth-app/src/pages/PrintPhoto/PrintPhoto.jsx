import Webcam from "react-webcam";
import React from "react";
import { useref } from "react";
import PhotoStrip from "../../components/PhotoStrip/PhotoStrip"
import "./PrintPhoto.scss"

function PrintPhoto() {
  return (
    <div className="PhotoPrint photo">
      Looking great!
      <PhotoStrip />
    </div>
  );
}
export default PrintPhoto;