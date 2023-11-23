import {useRef,useEffect} from 'react'
import './App.css'
import * as faceapi from 'face-api.js'

function FaceRecon(){
  const videoRef = useRef()
  const canvasRef = useRef()

  // LOAD FROM USEEFFECT
  useEffect(()=>{
    startVideo()
    videoRef && loadModels()

  },[])



  // OPEN YOU FACE WEBCAM
  const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video:true})
    .then((currentStream)=>{
      videoRef.current.srcObject = currentStream
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  // LOAD MODELS FROM FACE API

  const loadModels = ()=>{
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/face-models DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/face-models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/face-models"),
      ]).then(()=>{
      faceMyDetect()
    })
  }

  const faceMyDetect = ()=>{
    setInterval(async()=>{
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions())

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:640,
        height:480
      })

      const resized = faceapi.resizeResults(detections,{
         width:640,
        height:480
      })

      faceapi.draw.drawDetections(canvasRef.current,resized)
    },1000)
  }

  return (
    <div className="myapp">
    <h1>Face Detection</h1>
      <div className="appvide">
      <video crossOrigin="anonymous" ref={videoRef} autoPlay ></video>
      </div>
      <canvas ref={canvasRef} 
      className="appcanvas"/>
    </div>
    )

}

export default FaceRecon;