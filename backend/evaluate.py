import torch

from torch.utils.data import DataLoader

from model import SmallUNet
from dataset import ForestDataset


# -----------------------------
# Settings
# -----------------------------

IMAGE_SIZE = 256
BATCH_SIZE = 4

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# -----------------------------
# Load validation dataset
# -----------------------------

dataset = ForestDataset(
    "data/images/val",
    "data/masks/val",
    IMAGE_SIZE
)

loader = DataLoader(
    dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)


# -----------------------------
# Load trained model
# -----------------------------

model = SmallUNet().to(DEVICE)

model.load_state_dict(
    torch.load(
        "models/bluecarbon_unet.pth",
        map_location=DEVICE
    )
)

model.eval()


# -----------------------------
# Metrics
# -----------------------------

total_intersection = 0
total_union = 0
total_predicted = 0
total_actual = 0
total_correct = 0
total_pixels = 0


with torch.no_grad():

    for images, masks in loader:

        images = images.to(DEVICE)
        masks = masks.to(DEVICE)

        outputs = model(images)

        probabilities = torch.sigmoid(outputs)

        predictions = (
            probabilities > 0.5
        ).float()


        # Flatten
        predictions_flat = predictions.view(-1)
        masks_flat = masks.view(-1)


        # Intersection
        intersection = (
            predictions_flat * masks_flat
        ).sum().item()


        # Union
        union = (
            predictions_flat.sum()
            + masks_flat.sum()
            - intersection
        )


        total_intersection += intersection
        total_union += union

        total_predicted += (
            predictions_flat.sum().item()
        )

        total_actual += (
            masks_flat.sum().item()
        )


        # Accuracy
        correct = (
            predictions_flat == masks_flat
        ).sum().item()

        total_correct += correct
        total_pixels += masks_flat.numel()


# -----------------------------
# Calculate metrics
# -----------------------------

iou = (
    total_intersection /
    (total_union + 1e-8)
)


dice = (
    2 * total_intersection /
    (
        total_predicted
        + total_actual
        + 1e-8
    )
)


accuracy = (
    total_correct /
    total_pixels
)


# -----------------------------
# Print results
# -----------------------------

print("\nModel Evaluation")
print("------------------------")

print(
    f"IoU Score     : {iou:.4f}"
)

print(
    f"Dice Score    : {dice:.4f}"
)

print(
    f"Pixel Accuracy: {accuracy:.4f}"
)