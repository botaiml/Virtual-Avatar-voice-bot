import React, { useEffect, useState, useRef } from "react";
import styles from "./FaceEnroll.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import { createActivityConfig as activityConfig } from "../../helpers/activity-helper";
import faceApiService from "../../services/faceApiService";
import SnackBar from "../SnackBar";
import { ENROLLFACE } from "../../store/actions/activity";
export default function FaceEnroll() {
  const activity = useSelector((state) => state.activity);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [canCapture, setCanCapture] = useState(false);
  const [capturedFaces, setCapturedFaces] = useState([]);
  const [indexIds, setIndexIds] = useState([]);
  const [isCaptured, setisCaptured] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [detection, setdetection] = useState({});
  const [notify, setNotify] = useState({
    open: false,
    message: "This is notification",
  });
  const dispatch = useDispatch();

  let intervalId;
  // LOAD FROM USEEFFECT
  useEffect(() => {
    const initialize = async () => {
      startVideo();
      videoRef.current && (await loadModels());
      intervalId = setInterval(faceMyDetect, 1000);
    };

    initialize();

    // cleaUP
    return () => {
      // stopVideo();
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const captureFace = async () => {
      // Capture and display face images if score is high enough
      if (capturedFaces.length < 5) {
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = 100;
        faceCanvas.height = 100;
        const faceCtx = faceCanvas.getContext("2d");

        // Access properties directly from detection.box
        faceCtx.drawImage(
          videoRef.current,
          detection.box._x,
          detection.box._y,
          detection.box._width,
          detection.box._height,
          0,
          0,
          100,
          100
        );
        const result = await faceApiService.enrollFace(
          faceCanvas.toDataURL("image/png")
        );
        if (result[0].success) {
          setNotify({
            open: true,
            message: "Please wait...",
          });
          setCapturedFaces((prevFaces) => [
            ...prevFaces,
            faceCanvas.toDataURL("image/png"),
          ]);
          setIndexIds((prev) => [...prev, result[0].indexid]);
        } else {
          // recapture with notify the user
          setNotify({ open: true, message: result[0].error });
        }
      }
    };

    if (!isCaptured && canCapture) captureFace();
    if (capturedFaces.length === 5) setisCaptured(true);
  }, [canCapture, capturedFaces, detection]);

  useEffect(() => {
    const nextActivity = async () => {
      setNotify({
        open: true,
        message: "Moving into user enrollment",
      });
      dispatch({
        type: ENROLLFACE,
        payload: activityConfig(3, {
          indexIds: indexIds,
          faceImages: capturedFaces,
        }),
      });
    };
    if (isCaptured) {
      setBackdropOpen(true);
      // API call to search for face
      nextActivity();
    }
  }, [isCaptured]);

  // OPEN WEBCAM
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          // Additional logic if needed
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  // LOAD MODELS FROM FACE API
  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOUR PUBLIC/face-models DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/face-models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/face-models"),
    ]);
    // .then(() => {
    //   faceMyDetect();
    // });
  };

  const faceMyDetect = async () => {
    const detections = await faceapi.detectAllFaces(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    // DRAW FACE IN WEBCAM
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(canvas);

    faceapi.matchDimensions(canvas, {
      width: 640,
      height: 480,
    });

    if (detections.length > 0) {
      const detection = detections[0];
      setdetection(detection);

      const resizedDetection = faceapi.resizeResults(detection, {
        width: 640,
        height: 480,
      });

      faceapi.draw.drawDetections(canvas, resizedDetection);
      if (detection.score > 0.75) {
        setCanCapture(true);
      } else {
        setCanCapture(false);
      }
    }
  };

  const closeSnackBar = () => {
    setNotify({ open: false, message: "" });
  };
  return (
    <>
      <SnackBar
        notifyOpen={notify.open}
        notifyMessage={notify.message}
        closeSnackBar={closeSnackBar}
      />
      <div className={styles.myapp}>
        <h1>Face Enrollment</h1>
        <div className={styles.appvide}>
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        </div>
        <div className={styles.appcanvas} ref={canvasRef}></div>
        {/* Display 5 face images */}
        <div className={styles.captured_faces}>
          {capturedFaces.map((face, index) => (
            <div
              key={index}
              className={styles.captured_face}
              style={{ marginRight: "10px" }}
            >
              <img src={face} alt={`Captured Face ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
