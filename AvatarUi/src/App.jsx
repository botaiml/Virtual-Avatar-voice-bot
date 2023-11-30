import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
// import FaceDetection from "./components/face-recon/FaceDetection";
// import Footer from "./components/footer/Footer";
// import FaceDetect from "./components/face-recon/FcaeDetect";
// import FaceDetectWeb from "./components/face-recon/FaceDetectWeb";
// import CameraComponent from "./components/face-recon/CameraComponent";
import { INITIALISE } from "./store/actions/activity";
import FaceReconize from "./components/face-recon/FaceRecon";
import { useDispatch, useSelector } from "react-redux";
import { createActivityConfig as activityConfig } from "./helpers/activity-helper";
import { activityName } from "./constants/activities";
import FaceEnroll from "./components/face-enroll/FaceEnroll";
import FaceSearch from "./components/face-search/FaceSearch";

function App(props) {
  const [eachActivityType, seteachActivityType] = useState();
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: INITIALISE,
      payload: activityConfig(0),
    });
  }, []);

  useEffect(() => {
    if (activity) {
      seteachActivityType(activity);
    }
  }, [activity]);

  const getActivity = () => {
    switch (eachActivityType.activityType) {
      case activityName.RECONZISE_FACE: {
        return <FaceReconize />;
      }
      case activityName.ENROLL_FACE: {
        return <FaceEnroll />;
      }

      case activityName.SEARCH_FACE: {
        return <FaceSearch />;
      }

      default: {
        return <>Loading..</>;
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            flex: "1",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <div style={{ flex: "1", width: "50%", position: "relative" }}>
            <h1>AVATAR</h1>
            {/* <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
              <color attach="background" args={["#ececec"]} />
              <Experience />
            </Canvas> */}
          </div>
          <div style={{ flex: "1", width: "50%" }}>
            {eachActivityType && getActivity()}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
