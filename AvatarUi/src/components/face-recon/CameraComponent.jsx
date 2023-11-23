import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import * as faceapi from "face-api.js";

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const getCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setCameraDevices(cameras);
      setSelectedCamera(cameras.length > 0 ? cameras[0].deviceId : "");
    } catch (error) {
      console.error("Error getting camera devices:", error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setIsWebcamOn(false);
    setIsWebcamOn(true);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/face-models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/face-models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/face-models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/face-models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(webcamRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        webcamRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  useEffect(() => {
    getCameraDevices();
    webcamRef && loadModels()
    // cleaning up
    return () => {
      // clearInterval(loop);
      //   document.querySelectorAll(".frame").forEach((e) => e.remove());
    };
  }, []);

  useEffect(() => {
    setIsWebcamOn(false);
    setIsWebcamOn(true);
  }, [selectedCamera]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <FormControl>
        <InputLabel id="camera-select-label">Select Camera</InputLabel>
        <Select
          labelId="camera-select-label"
          id="camera-select"
          value={selectedCamera}
          onChange={handleCameraChange}
        >
          {cameraDevices.map((camera) => (
            <MenuItem key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${cameraDevices.indexOf(camera) + 1}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} mb={2}>
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={{
            deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
          }}
          mirrored={true}
          width={640}
          height={480}
          screenshotFormat="image/jpeg"
          onUserMediaError={(error) => console.error("Webcam Error:", error)}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 800,
            right: 0,
            top: 90,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </Box>

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PhotoCamera />}
          onClick={handleCapture}
        >
          Capture
        </Button>
      </Box>

      {capturedImage && (
        <Box>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "100px", height: "auto" }}
          />
        </Box>
      )}
    </div>
  );
};

export default CameraComponent;
