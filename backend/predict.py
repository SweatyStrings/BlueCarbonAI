import numpy as np
import torch
from pathlib import Path
from PIL import Image

from model import SmallUNet


# -----------------------------
# Paths
# -----------------------------

MODEL_PATH = "models/bluecarbon_unet.pth"

IMAGE_PATH = "data/images/val/image_0000.npy"

OUTPUT_DIR = Path("outputs")

OUTPUT_DIR.mkdir(exist_ok=True)


# -----------------------------
# Device
# -----------------------------

device = torch.device("cpu")


# -----------------------------
# Load model
# -----------------------------

model = SmallUNet()

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model.to(device)
model.eval()


print("Model loaded successfully")


# -----------------------------
# Load Sentinel-2 image
# -----------------------------

image = np.load(IMAGE_PATH)

print("Original image shape:", image.shape)


# Normalize exactly like training

image = image.astype(np.float32) / 10000.0


# Convert to tensor

image_tensor = torch.from_numpy(image)


# Add batch dimension

image_tensor = image_tensor.unsqueeze(0)


# Resize to model input size

image_tensor = torch.nn.functional.interpolate(
    image_tensor,
    size=(256, 256),
    mode="bilinear",
    align_corners=False
)


image_tensor = image_tensor.to(device)


# -----------------------------
# Prediction
# -----------------------------

with torch.no_grad():

    output = model(image_tensor)

    probability = torch.sigmoid(output)

    prediction = (probability > 0.5).float()


# Remove batch/channel dimensions

prediction = prediction.squeeze().cpu().numpy()


# -----------------------------
# Resize prediction to original
# size
# -----------------------------

prediction_image = Image.fromarray(
    (prediction * 255).astype(np.uint8)
)

prediction_image = prediction_image.resize(
    (512, 512),
    Image.Resampling.NEAREST
)


prediction_array = np.array(
    prediction_image
)


# -----------------------------
# Save predicted mask
# -----------------------------

mask_path = OUTPUT_DIR / "predicted_mask.png"

prediction_image.save(mask_path)


print("Predicted mask saved to:")
print(mask_path)


# -----------------------------
# Create RGB image
# -----------------------------

# Dataset channels:
# 0 = Red
# 1 = Green
# 2 = Blue
# 3 = NIR

rgb = image[:3]

# Convert CHW -> HWC

rgb = np.transpose(rgb, (1, 2, 0))


# Normalize for display

rgb_min = rgb.min()
rgb_max = rgb.max()

rgb = (rgb - rgb_min) / (
    rgb_max - rgb_min + 1e-8
)

rgb = (rgb * 255).astype(np.uint8)


# -----------------------------
# Create forest overlay
# -----------------------------

overlay = rgb.copy()

forest_pixels = prediction_array > 0

# Give forest pixels a green overlay

overlay[forest_pixels] = (
    0.5 * overlay[forest_pixels]
    + 0.5 * np.array([0, 255, 0])
).astype(np.uint8)


# -----------------------------
# Save images
# -----------------------------

rgb_path = OUTPUT_DIR / "original_rgb.png"

overlay_path = OUTPUT_DIR / "forest_overlay.png"


Image.fromarray(rgb).save(rgb_path)

Image.fromarray(overlay).save(overlay_path)


print("Original RGB image saved to:")
print(rgb_path)

print("Forest overlay saved to:")
print(overlay_path)


print("\nPrediction complete!")