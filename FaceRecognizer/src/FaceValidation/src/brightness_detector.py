import cv2
import numpy as np

class BrightnessPredictor:
    def __init__(self):

        self.bright_thres = 0.7
        self.dark_thres = 0.5

    def face_brightness_detection(self, image):
        
        resized_image = cv2.resize(image, (100, 100))
        gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        dark_part = cv2.inRange(gray, 0, 50) #before 0-30
        bright_part = cv2.inRange(gray, 150, 255)
        total_pixel = np.size(gray)
        dark_pixel = np.sum(dark_part > 0)
        bright_pixel = np.sum(bright_part > 0)
        d_pix = dark_pixel/total_pixel
        b_pix = bright_pixel/total_pixel
        print(f'image dark pix: {d_pix} and bright pix: {b_pix}')
        return False if d_pix > self.dark_thres or b_pix > self.bright_thres else True
