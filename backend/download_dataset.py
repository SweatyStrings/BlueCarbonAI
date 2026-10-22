from datasets import load_dataset
import numpy as np
from PIL import Image
from pathlib import Path


# How many samples we want
TRAIN_SAMPLES = 100
VAL_SAMPLES = 20


# Output folders
train_images = Path("data/images/train")
train_masks = Path("data/masks/train")

val_images = Path("data/images/val")
val_masks = Path("data/masks/val")


# Create folders
for folder in [
    train_images,
    train_masks,
    val_images,
    val_masks
]:
    folder.mkdir(parents=True, exist_ok=True)


print("Starting dataset stream...")


# Stream the dataset instead of downloading everything
train_dataset = load_dataset(
    "NickBurns/amazon-sentinel2-forest-segmentation",
    split="train",
    streaming=True
)

val_dataset = load_dataset(
    "NickBurns/amazon-sentinel2-forest-segmentation",
    split="val",
    streaming=True
)


print("Saving training samples...")


for index, sample in enumerate(train_dataset):

    if index >= TRAIN_SAMPLES:
        break

    image = np.array(sample["image"], dtype=np.uint16)
    mask = np.array(sample["label"], dtype=np.uint8)

    np.save(
        train_images / f"image_{index:04d}.npy",
        image
    )

    Image.fromarray(mask).save(
        train_masks / f"mask_{index:04d}.png"
    )

    print(f"Training: {index + 1}/{TRAIN_SAMPLES}")


print("Saving validation samples...")


for index, sample in enumerate(val_dataset):

    if index >= VAL_SAMPLES:
        break

    image = np.array(sample["image"], dtype=np.uint16)
    mask = np.array(sample["label"], dtype=np.uint8)

    np.save(
        val_images / f"image_{index:04d}.npy",
        image
    )

    Image.fromarray(mask).save(
        val_masks / f"mask_{index:04d}.png"
    )

    print(f"Validation: {index + 1}/{VAL_SAMPLES}")


print("\nDataset preparation complete!")