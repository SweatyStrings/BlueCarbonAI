from dataset import ForestDataset


dataset = ForestDataset(
    "data/images/train",
    "data/masks/train"
)


print("Number of images:", len(dataset))


image, mask = dataset[0]


print("Image shape:", image.shape)
print("Mask shape :", mask.shape)

print("Image min:", image.min().item())
print("Image max:", image.max().item())

print("Mask values:", mask.unique())