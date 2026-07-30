import cv2
import numpy as np


class MaskCleaner:

    def __init__(self, kernel_size=3):
        self.kernel = np.ones((kernel_size, kernel_size), np.uint8)

    def clean(self, mask):

        opened = cv2.morphologyEx(
            mask,
            cv2.MORPH_OPEN,
            self.kernel
        )

        cleaned = cv2.morphologyEx(
            opened,
            cv2.MORPH_CLOSE,
            self.kernel
        )

        return cleaned