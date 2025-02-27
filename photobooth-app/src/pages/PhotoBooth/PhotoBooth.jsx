import Webcam from "react-webcam";
import React from "react";
import { useRef } from "react";


function PhotoBooth() {
  const webRef=useRef(null);
  let img=null;
  const shoowImages=()=>{
    let img=webRef.current.getScreenshot();
  };

  return (
    <div className="PhotoBooth">
      React Webcam
      <Webcam ref={webRef} />
      <button onClick={showImages}>Click</button>
      <br/>
      <img src={img}/>
    </div>
  );
}
export default PhotoBooth;
