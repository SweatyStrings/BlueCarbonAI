from PIL import Image
import numpy as np
import os


class Visualization:

    def save_mask(self, mask, output_path="outputs/mask.png"):

        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        mask_image = (mask * 255).astype(np.uint8)

        Image.fromarray(mask_image).save(output_path)

        print(f"✅ Mask saved to {output_path}")


    def create_overlay(self, rgb_image, mask,
                       output_path="outputs/overlay.png"):

        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        rgb = rgb_image.copy()

        overlay = rgb.copy()

        # Paint vegetation green
        overlay[mask == 1] = [0, 255, 0]

        # Blend original + overlay
        blended = (
            rgb * 0.65 +
            overlay * 0.35
        ).astype(np.uint8)

        Image.fromarray(blended).save(output_path)

        print(f"✅ Overlay saved to {output_path}")