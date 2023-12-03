import cv2
import numpy as np
from src.FaceValidation.src.TFLiteFaceAlignment import DepthFacialLandmarks
from src.FaceValidation.src.TFLiteFaceDetection import UltraLightFaceDetecion
from src.FaceValidation.src.process import pose
import pickle

class HeadPoseEstimator():

    def __init__(self):
        self.detect_face = UltraLightFaceDetecion("src/FaceValidation/models/RFB-320.tflite",
                                        conf_threshold=0.90)

        self.detect_headPose = DepthFacialLandmarks("src/FaceValidation/models/sparse_face.tflite")

        with open('src/FaceValidation/models/model.pkl', 'rb') as f:
            self.s = pickle.load(f)

    def predict_facePose(self, image):
        
        # cv2.imshow("headpose_image", image)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        boxes = self.detect_face.inference(image) 
        
        if boxes is not None:
            for results in self.detect_headPose.get_landmarks(image, boxes):
                get_euler_val = pose(results)
                # print(get_headpose)
                pitch, yaw, roll = get_euler_val[0], get_euler_val[1], get_euler_val[2]
                get_pose_result = self.s.predict([(pitch, yaw, roll)])

            return get_pose_result        
        
        else:
            return []




