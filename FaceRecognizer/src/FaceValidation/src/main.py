from src.headPose_estimator import HeadPoseEstimator
from src.brightness_detector import BrightnessPredictor
from src.blur_detection import detect_blur_fft

class FaceValidator():
    def __init__(self):
        self.headpose = HeadPoseEstimator()
        self.detect_brightness = BrightnessPredictor()

    def find_headpose(self, image):
        get_headpose_status = self.headpose.predict_facePose(image)

        if not get_headpose_status[0] == "straight":
            return {
                "success": False,
                "remarks": "Face is not straight"
            }
        else:
            return {
                "success" : True
            }

    def find_brightness(self, image):    
