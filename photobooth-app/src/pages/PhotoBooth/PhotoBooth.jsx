import Webcam from "react-webcam";
import React from "react";
import CaptureButton from "../../components/CaptureButton/CaptureButton"
import { useref } from "react";
import "./PhotoBooth.scss"

function PhotoBooth() {
  return (
    <div className="PhotoBooth">
      Ready for your closeup?
      <div className="webcam_standin"></div>
      <Webcam />

      <CaptureButton />
    </div>
  );
}
export default PhotoBooth;
