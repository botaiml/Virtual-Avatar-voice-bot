import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
// import FaceDetection from "./components/face-recon/FaceDetection";
// import Footer from "./components/footer/Footer";
// import FaceDetect from "./components/face-recon/FcaeDetect";
// import FaceDetectWeb from "./components/face-recon/FaceDetectWeb";
// import CameraComponent from "./components/face-recon/CameraComponent";
import FaceRecon from "./components/face-recon/FaceRecon";
function App() {
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
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
              <color attach="background" args={["#ececec"]} />
              <Experience />
            </Canvas>
          </div>
          <div style={{ flex: "1", width: "50%"}}>
            {/* <FaceDetection /> */}
            {/* <FaceDetect/> */}
            {/* <FaceDetectWeb/> */}
            {/* <CameraComponent/> */}
            <FaceRecon/>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
