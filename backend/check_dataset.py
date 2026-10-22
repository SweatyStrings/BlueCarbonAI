import numpy as np
from PIL import Image
from pathlib import Path


image_path = Path("data/images/train/image_0000.npy")
mask_path = Path("data/masks/train/mask_0000.png")


# Load satellite image
image = np.load(image_path)

# Load mask
mask = np.array(Image.open(mask_path))


print("IMAGE")
print("Shape:", image.shape)
print("Data type:", image.dtype)

print("\nMASK")
print("Shape:", mask.shape)
print("Data type:", mask.dtype)

print("\nMask values:")
print(np.unique(mask))

print("\nImage value range:")
print("Minimum:", image.min())
print("Maximum:", image.max())