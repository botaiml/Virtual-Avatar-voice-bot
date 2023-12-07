import { useRef, useEffect, useState } from "react";
import styles from "./FaceRecon.module.css";
import * as faceapi from "face-api.js";
import faceApiService from "../../services/faceApiService";
import { useDispatch } from "react-redux";
import { createActivityConfig as activityConfig } from "../../helpers/activity-helper";
import { ENROLLFACE, SEARCHFACE } from "../../store/actions/activity";
import SnackBar from "../SnackBar";
import { SpeechApiService } from "../../services/speechApiService";
import { INITIALISE as InitAudioData } from "../../store/actions/audioData";
function FaceReconize() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [canCapture, setCanCapture] = useState(false);
  const [capturedFaces, setCapturedFaces] = useState([]);
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
    const searchFace = async () => {
      const result = await faceApiService.searchFace(capturedFaces[2]);
      setBackdropOpen(false);
      if (result.success) {
        //face search face found
        // handle success implementations TODO
        setNotify({
          open: true,
          message: "Welcome, Moving into appointments",
        });
        let text = "Welcome, Moving into appointments";
        const { metadata, mouthCues } = await SpeechApiService.getSpeechData(
          text
        );
        dispatch({
          type: InitAudioData,
          payload: { audio_byte: metadata.soundFile, mouthque: mouthCues },
        });
        dispatch({
          type: SEARCHFACE,
          payload: activityConfig(2, { indexId: result.indexid }),
        });
      } else {
        if (result.error === "Please traighten up your face") {
          /* face is not straight
           reset the face images and recapture the face images */
          setCapturedFaces([]);
          setisCaptured(() => false);
          setNotify({ open: true, message: "Please straighten up your face" });
          // TODO play audio here
          let text = "Please straighten up your face";
          const { metadata, mouthCues } = await SpeechApiService.getSpeechData(
            text
          );
          dispatch({
            type: InitAudioData,
            payload: { audio_byte: metadata.soundFile, mouthque: mouthCues },
          });
        } else if (result.error === "Face is not enrolled") {
          // face is not enrolled
          // hanlde nagivation to face enrollment
          setNotify({
            open: true,
            message: "Face is not enrolled, Moving into enrollment",
          });
          let text = "Face is not enrolled, Moving into enrollment";
          const { metadata, mouthCues } = await SpeechApiService.getSpeechData(
            text
          );
          dispatch({
            type: InitAudioData,
            payload: { audio_byte: metadata.soundFile, mouthque: mouthCues },
          });
          /*chaging state to enrollface*/
          dispatch({
            type: ENROLLFACE,
            payload: activityConfig(1, { faceImages: capturedFaces }),
          });
        }
      }
    };
    if (isCaptured) {
      setBackdropOpen(true);
      // API call to search for face
      setTimeout(() => {
        searchFace();
      }, 3000);
    }
  }, [isCaptured]);

  useEffect(() => {
    const captureFace = () => {
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
        setCapturedFaces((prevFaces) => [
          ...prevFaces,
          faceCanvas.toDataURL("image/png"),
        ]);
      }
    };

    if (!isCaptured && canCapture) captureFace();
    if (capturedFaces.length === 5) setisCaptured(true);
  }, [canCapture, capturedFaces, detection]);

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
      if (detection.score > import.meta.env.VITE_FACERECON_THRESHOLD) {
        setCanCapture(true);
      } else {
        setCanCapture(false);
      }
    }
  };

  const deleteCapturedFace = (index) => {
    // setCapturedFaces((prevFaces) => {
    //   const updatedFaces = [...prevFaces];
    //   updatedFaces.splice(index, 1);
    //   return updatedFaces;
    // });
    // setCaptureCount((prevCount) => prevCount - 1);
  };

  const handleOpenBackdrop = () => {
    setBackdropOpen(true);
  };

  const handleCloseBackdrop = () => {
    console.log("hanlde close");
    setBackdropOpen(false);
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
      {/* <SimpleBackdrop open={backdropOpen} handleClose={handleCloseBackdrop} /> */}
      <div className={styles.myapp}>
        <h1>Face Detection</h1>
        <div className={styles.appvide}>
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        </div>
        <div className={styles.appcanvas} ref={canvasRef}></div>
        <div className={styles.captured_faces}>
          {capturedFaces.map((face, index) => (
            <div
              key={index}
              className={styles.captured_face}
              style={{ marginRight: "10px" }}
            >
              <img src={face} alt={`Captured Face ${index}`} />
              {/* <IconButton
                className={styles.delete_button}
                onClick={() => deleteCapturedFace(index)}
              >
                <DeleteIcon />
              </IconButton> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FaceReconize;
