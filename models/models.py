"""Various potential architectures for the neural network."""

import torch.nn as nn
import torch


class CN_S200_5_D0(nn.Module):
    """A convolutional neural network with 5 layers of 200 neurons each and no dropout."""

    def __init__(self):
        super(CN_S200_5_D0, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(36, 200),
            nn.ReLU(),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Linear(200, 8),
        )

    def forward(self, x):
        return self.net(x)

    def load(self, path="models/model_state_dict_CN_S200_5_D0.pt"):
        self.load_state_dict(torch.load(path))


class CN_S200_5_D25(nn.Module):
    """A convolutional neural network with 5 layers of 200 neurons each and 25% dropout."""

    def __init__(self):
        super(CN_S200_5_D25, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(36, 200),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(200, 200),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(200, 8),
        )

    def forward(self, x):
        return self.net(x)

    def load(self, path="models/model_state_dict_CN_S200_5_D25.pt"):
        self.load_state_dict(torch.load(path))


class CN_S50_4_D0(nn.Module):
    """A convolutional neural network with 4 layers of 50 neurons each and no dropout."""

    def __init__(self):
        super(CN_S50_4_D0, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(36, 50),
            nn.ReLU(),
            nn.Linear(50, 50),
            nn.ReLU(),
            nn.Linear(50, 50),
            nn.ReLU(),
            nn.Linear(50, 8),
        )

    def forward(self, x):
        return self.net(x)

    def load(self, path="models/model_state_dict_CN_S200_5_D25.pt"):
        self.load_state_dict(torch.load(path))
