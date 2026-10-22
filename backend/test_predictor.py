from predictor import ForestPredictor


predictor = ForestPredictor()

result = predictor.predict(
    "data/images/val/image_0000.npy"
)

print("\nPrediction Result")
print("-----------------")

print(
    "Forest Coverage:",
    result["forest_percentage"],
    "%"
)

print(
    "Mask Shape:",
    result["mask"].shape
)