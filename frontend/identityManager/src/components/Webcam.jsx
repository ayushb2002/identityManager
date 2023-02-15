import Webcam from "react-webcam";
import React from 'react'

const Weebcam = ({ image, setImage }) => {

  const webcamRef = React.useRef(null);


  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
    

  }, [webcamRef, setImage]);


  return (
    <>
      <div style={{ display: "flex" }}>
        <Webcam
          width={400}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        {image && (
          <img
            width={400}
            src={image}
          />
        )}
      </div>
      <button className='btn btn-primary w-[20vw] mx-auto m-5' onClick={capture}>Capture photo</button>
    </>
  )
}

export default Weebcam