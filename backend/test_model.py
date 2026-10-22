import torch

from model import SmallUNet


model = SmallUNet()


# Fake 4-band satellite image
image = torch.randn(
    1,
    4,
    512,
    512
)


output = model(image)


print("Input shape :", image.shape)
print("Output shape:", output.shape)