import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button, Typography, Box } from '@mui/material';
import * as facemesh from '@tensorflow-models/facemesh';

const FaceDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load facemesh model
    const loadModel = async () => {
      const net = await facemesh.load();
      detect(net);
    };

    loadModel();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = video.width;
      const videoHeight = video.height;

      // Set video width and height for canvas
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces(video);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext('2d');

      // Draw mesh
      drawMesh(face, ctx);
    }

    // Request animation frame
    requestAnimationFrame(() => detect(net));
  };

  const drawMesh = (face, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (face.length > 0) {
      // Draw bounding box for each face
      face.forEach((data) => {
        const { topLeft, bottomRight } = data.boundingBox;
        const size = [bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]];

        ctx.beginPath();
        ctx.rect(topLeft[0], topLeft[1], size[0], size[1]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.stroke();
        ctx.fill();
      });
    }
  };

  const capture = async () => {
    // Access the webcam and capture a frame
    const imageSrc = webcamRef.current.getScreenshot();

    // Face detection
    const net = await facemesh.load();
    detect(net);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Face Detection
      </Typography>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />
      <Button variant="contained" color="primary" onClick={capture} style={{ marginTop: '10px' }}>
        Capture Photo
      </Button>
      <canvas ref={canvasRef} style={{ marginTop: '20px' }} />
    </Box>
  );
};

export default FaceDetection;
