import Webcam from "react-webcam";
import React from 'react'

const Webcam = () => {

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    React.useEffect(async ()=>{
      if(imgSrc){
        const formData = new FormData();
        formData.append("img", imgSrc);
        const options = {
          method: "POST",
          body: formData,
        };
        var result = await fetch("http://127.0.0.1:5000/face_match", options);
        console.log(result);
      }
  
    }, [imgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  )
}

export default Webcam