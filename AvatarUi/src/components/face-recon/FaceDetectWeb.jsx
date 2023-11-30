import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

export default function FaceDetectWeb() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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

    runFacemesh();

    return () => {
      clearInterval(loop);
    //   document.querySelectorAll(".frame").forEach((e) => e.remove());
    };
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
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
    </div>
  );
}
