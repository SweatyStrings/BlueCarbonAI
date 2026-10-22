import numpy as np
import torch

from pathlib import Path
from PIL import Image
from torch.utils.data import Dataset
from torchvision.transforms.functional import resize


class ForestDataset(Dataset):

    def __init__(self, image_dir, mask_dir, image_size=256):

        self.image_dir = Path(image_dir)
        self.mask_dir = Path(mask_dir)

        self.image_size = image_size

        self.images = sorted(
            self.image_dir.glob("*.npy")
        )

    def __len__(self):

        return len(self.images)

    def __getitem__(self, index):

        # Get image path
        image_path = self.images[index]

        # Find matching mask
        image_name = image_path.stem
        mask_path = self.mask_dir / f"mask_{image_name.split('_')[-1]}.png"

        # Load satellite image
        image = np.load(image_path)

        # Convert:
        # (4, 512, 512)
        # →
        # torch tensor
        image = torch.from_numpy(image).float()

        # Normalize satellite values
        image = image / 10000.0

        # Resize image
        image = resize(
            image,
            [self.image_size, self.image_size]
        )

        # Load mask
        mask = Image.open(mask_path)

        mask = np.array(mask)

        # Convert mask to tensor
        mask = torch.from_numpy(mask).float()

        # Add channel dimension
        mask = mask.unsqueeze(0)

        # Resize mask
        mask = resize(
            mask,
            [self.image_size, self.image_size],
            interpolation=Image.Resampling.NEAREST
        )

        # Make sure mask is binary
        mask = (mask > 0).float()

        return image, mask