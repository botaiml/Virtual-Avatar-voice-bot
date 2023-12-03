import cv2
import numpy as np


def rotationMatrixToEulerAngles(R):
    '''
    Ref: https://stackoverflow.com/a/15029416
    '''
    sy = np.sqrt(R[0, 0] ** 2 + R[1, 0] ** 2)

    if sy < 1e-6:
        x = np.arctan2(-R[1, 2], R[1, 1])
        y = np.arctan2(-R[2, 0], sy)
        z = 0
    else:
        x = np.arctan2(R[2, 1], R[2, 2])
        y = np.arctan2(-R[2, 0], sy)
        z = np.arctan2(R[1, 0], R[0, 0])

    return np.degrees([x, y, z])



def pose(results):
    landmarks, params = results

    # rotate matrix
    R = params[:3, :3].copy()

    # decompose matrix to ruler angle
    euler = rotationMatrixToEulerAngles(R)
    # print(f"Pitch: {euler[0]}; Yaw: {euler[1]}; Roll: {euler[2]};")

    return euler
