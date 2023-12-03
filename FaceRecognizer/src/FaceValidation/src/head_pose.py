import os
import cv2
import sys
import dlib
import argparse
import numpy as np
import src.reference_world as world


class HeadPoseDetection:
    def __init__(self):
        predictor_path = "./models/shape_predictor_68_face_landmarks.dat"
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor(predictor_path)

    def headpose_detection(self, image):
        try:

            im = image
            faces = self.detector(cv2.cvtColor(image, cv2.COLOR_BGR2RGB), 0)

            face3Dmodel = world.ref3DModel()

            for face in faces:
                shape = self.predictor(cv2.cvtColor(im, cv2.COLOR_BGR2RGB), face)

                # draw(im, shape)

                refImgPts = world.ref2dImagePoints(shape)

                height, width, channel = im.shape
                focalLength = height * width
                cameraMatrix = world.cameraMatrix(focalLength, (height / 2, width / 2))

                mdists = np.zeros((4, 1), dtype=np.float64)

                # calculate rotation and translation vector using solvePnP
                success, rotationVector, translationVector = cv2.solvePnP(
                    face3Dmodel, refImgPts, cameraMatrix, mdists)

                noseEndPoints3D = np.array([[0, 0, 1000.0]], dtype=np.float64)
                noseEndPoint2D, jacobian = cv2.projectPoints(
                    noseEndPoints3D, rotationVector, translationVector, cameraMatrix, mdists)

                # draw nose line 
                p1 = (int(refImgPts[0, 0]), int(refImgPts[0, 1]))
                p2 = (int(noseEndPoint2D[0, 0, 0]), int(noseEndPoint2D[0, 0, 1]))
                cv2.line(im, p1, p2, (110, 220, 0),
                            thickness=2, lineType=cv2.LINE_AA)

                # calculating angle
                rmat, jac = cv2.Rodrigues(rotationVector)
                angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

                if angles[1] < -15:
                    gaze = "left"
                elif angles[1] > 17:
                    gaze = "right"
                else:
                    gaze = "looking straight"
                return gaze   
        except:
            return None        

