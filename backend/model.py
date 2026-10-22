import torch
import torch.nn as nn


class DoubleConv(nn.Module):
    def __init__(self, input_channels, output_channels):
        super().__init__()

        self.layers = nn.Sequential(
            nn.Conv2d(
                input_channels,
                output_channels,
                kernel_size=3,
                padding=1
            ),
            nn.ReLU(inplace=True),

            nn.Conv2d(
                output_channels,
                output_channels,
                kernel_size=3,
                padding=1
            ),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.layers(x)


class SmallUNet(nn.Module):

    def __init__(self):
        super().__init__()

        # Encoder
        self.encoder1 = DoubleConv(4, 32)
        self.encoder2 = DoubleConv(32, 64)

        # Middle
        self.middle = DoubleConv(64, 128)

        # Decoder
        self.up2 = nn.ConvTranspose2d(
            128,
            64,
            kernel_size=2,
            stride=2
        )

        self.decoder2 = DoubleConv(128, 64)

        self.up1 = nn.ConvTranspose2d(
            64,
            32,
            kernel_size=2,
            stride=2
        )

        self.decoder1 = DoubleConv(64, 32)

        # Final segmentation layer
        self.output = nn.Conv2d(
            32,
            1,
            kernel_size=1
        )

        self.pool = nn.MaxPool2d(2)

    def forward(self, x):

        # Encoder
        x1 = self.encoder1(x)

        x2 = self.encoder2(
            self.pool(x1)
        )

        # Middle
        x3 = self.middle(
            self.pool(x2)
        )

        # Decoder
        x = self.up2(x3)

        x = torch.cat(
            [x, x2],
            dim=1
        )

        x = self.decoder2(x)

        x = self.up1(x)

        x = torch.cat(
            [x, x1],
            dim=1
        )

        x = self.decoder1(x)

        # Segmentation output
        return self.output(x)