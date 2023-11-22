import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Box, Typography } from '@mui/material';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      // Load face-api.js models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/face-models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/face-models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/face-models');

      // Start face detection
      detect();
    };

    loadModels();
  }, []);

  const detect = async () => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.width;
      const videoHeight = video.height;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      faceapi.draw.drawDetections(canvasRef.current, face);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, face);
    }

    requestAnimationFrame(detect);
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
      <canvas ref={canvasRef} style={{ position: 'absolute', top: '0', left: '0', zIndex: '1' }} />
    </Box>
  );
};

export default FaceDetection;
