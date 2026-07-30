import cv2
import numpy as np


class Predictor:

    def predict(self, image):

        # image comes in RGB format
        hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)

        # Green vegetation range
        lower_green = np.array([35, 40, 40])
        upper_green = np.array([90, 255, 255])

        mask = cv2.inRange(hsv, lower_green, upper_green)

        # Convert to binary
        mask = (mask > 0).astype(np.uint8)
        print("Mask unique values:", np.unique(mask))
        print("Vegetation pixels:", np.sum(mask))
        cv2.imwrite("outputs/debug_mask.png", mask * 255)

        return {
            "mask": mask,
            "classes": [1]
        }