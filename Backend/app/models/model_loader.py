from transformers import (
    AutoImageProcessor,
    SegformerForSemanticSegmentation,
)
import torch


class ModelLoader:

    def __init__(self):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        self.processor = None
        self.model = None

    def load(self):

        

        model_name = "nvidia/segformer-b0-finetuned-ade-512-512"

        self.processor = AutoImageProcessor.from_pretrained(
            model_name
        )

        self.model = SegformerForSemanticSegmentation.from_pretrained(
            model_name
        )

        self.model.to(self.device)

        self.model.eval()

        print("✅ Model Loaded")

        return self.processor, self.model