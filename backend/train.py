import torch
import torch.nn as nn

from torch.utils.data import DataLoader

from model import SmallUNet
from dataset import ForestDataset


# -----------------------------
# Settings
# -----------------------------

IMAGE_SIZE = 256
BATCH_SIZE = 4
EPOCHS = 10
LEARNING_RATE = 0.001

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print("Using device:", DEVICE)


# -----------------------------
# Dataset
# -----------------------------

train_dataset = ForestDataset(
    "data/images/train",
    "data/masks/train",
    IMAGE_SIZE
)

val_dataset = ForestDataset(
    "data/images/val",
    "data/masks/val",
    IMAGE_SIZE
)


train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)


print("Training samples:", len(train_dataset))
print("Validation samples:", len(val_dataset))


# -----------------------------
# Model
# -----------------------------

model = SmallUNet().to(DEVICE)


# -----------------------------
# Loss
# -----------------------------

bce_loss = nn.BCEWithLogitsLoss()


def dice_loss(predictions, targets):

    predictions = torch.sigmoid(predictions)

    predictions = predictions.view(-1)
    targets = targets.view(-1)

    intersection = (predictions * targets).sum()

    dice = (
        (2 * intersection + 1)
        /
        (predictions.sum() + targets.sum() + 1)
    )

    return 1 - dice


def total_loss(predictions, targets):

    bce = bce_loss(
        predictions,
        targets
    )

    dice = dice_loss(
        predictions,
        targets
    )

    return bce + dice


# -----------------------------
# Optimizer
# -----------------------------

optimizer = torch.optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)


# -----------------------------
# Training
# -----------------------------

for epoch in range(EPOCHS):

    model.train()

    training_loss = 0.0

    for images, masks in train_loader:

        images = images.to(DEVICE)
        masks = masks.to(DEVICE)

        optimizer.zero_grad()

        predictions = model(images)

        loss = total_loss(
            predictions,
            masks
        )

        loss.backward()

        optimizer.step()

        training_loss += loss.item()


    training_loss /= len(train_loader)


    # -------------------------
    # Validation
    # -------------------------

    model.eval()

    validation_loss = 0.0

    with torch.no_grad():

        for images, masks in val_loader:

            images = images.to(DEVICE)
            masks = masks.to(DEVICE)

            predictions = model(images)

            loss = total_loss(
                predictions,
                masks
            )

            validation_loss += loss.item()


    validation_loss /= len(val_loader)


    print(
        f"Epoch {epoch + 1}/{EPOCHS} "
        f"| Train Loss: {training_loss:.4f} "
        f"| Validation Loss: {validation_loss:.4f}"
    )


# -----------------------------
# Save model
# -----------------------------

torch.save(
    model.state_dict(),
    "models/bluecarbon_unet.pth"
)


print("\nTraining complete!")
print("Model saved to:")
print("models/bluecarbon_unet.pth")