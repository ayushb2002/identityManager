import Webcam from "react-webcam";
import React from 'react'

const Weebcam = ({image,setImage}) => {

    const webcamRef = React.useRef(null);
    
  
    const capture = React.useCallback(async() => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      setImage(imageSrc);
      // if(imageSrc){
      //   const formData = new FormData();
      //   formData.append("img", imageSrc);
      //   const options = {
      //     method: "POST",
      //     body: formData,
      //   };
      //   var result = await fetch("http://127.0.0.1:5000/face_match", options);
      //   console.log(result);
      // }
      
    }, [webcamRef,setImage]);


  return (
    <>
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
      <button className='btn btn-primary w-[20vw] mx-auto m-5' onClick={capture}>Capture photo</button>
      
    </>
  )
}

export default Weebcam