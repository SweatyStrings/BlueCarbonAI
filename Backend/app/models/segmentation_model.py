import torch
from transformers import AutoImageProcessor
from transformers import SegformerForSemanticSegmentation


class SegmentationModel:

    MODEL_NAME = "nvidia/segformer-b0-finetuned-ade-512-512"

    def __init__(self):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        print(f"Using {self.device}")

        print("Loading Image Processor...")

        self.processor = AutoImageProcessor.from_pretrained(
            self.MODEL_NAME
        )

        print("Loading SegFormer...")

        self.model = SegformerForSemanticSegmentation.from_pretrained(
            self.MODEL_NAME
        )

        self.model.to(self.device)

        self.model.eval()

        print("✅ Segmentation model ready.")