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
import * as facemesh from "@tensorflow-models/facemesh";

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

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      typeof canvasRef.current !== "undefined" &&
      canvasRef.current !== null
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const face = await net.estimateFaces(video);

      if (canvasRef.current === null) return;
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillRect(0, 0, videoWidth, videoHeight);

      // Clear canvas
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      // Draw face mesh
      if (face.length > 0) {
        const [x, y, width, height] = face[0].boundingBox.topLeft.concat(
          face[0].boundingBox.bottomRight
        );
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(x, y, width - x, height - y);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    getCameraDevices();

    let loop;
    // const runFacemesh = async () => {
    //   const model = await tf.loadGraphModel('models/facemesh/model.json');
    //   const net = await facemesh.load({ model });

    //   loop = setInterval(() => {
    //     detect(net);
    //   }, 100);
    // };

    const runFacemesh = async () => {
      const net = await facemesh.load({
        inputResolution: { width: 540, height: 380 },
        scale: 0.8,
      });

      loop = setInterval(() => {
        detect(net);
      }, 100);
    };
// face mesh to be called here commented as of now.
    // runFacemesh();

    // cleaning up
    return () => {
      clearInterval(loop);
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
