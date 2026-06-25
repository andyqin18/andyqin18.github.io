# Residual Connection

A "skip" that adds a layer's input to its output ($y = F(x) + x$), so the layer
only has to learn the *residual* $F(x)$. This keeps gradients from vanishing,
enabling very deep networks.

*Introduced by:* [ResNet](#resnet)
