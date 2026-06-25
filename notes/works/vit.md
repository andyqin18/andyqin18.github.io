# Vision Transformer (ViT)

*Dosovitskiy et al., 2020 · [arXiv:2010.11929](https://arxiv.org/abs/2010.11929)*

## Summary
Splits an image into fixed-size patches, treats each as a token, and feeds
them to a standard transformer. With enough data it matches or beats CNNs.

## Key ideas
- Replaces [convolution](#convolution) with [self-attention](#self-attention)
  over image patches.
- Relies on the same [self-attention](#self-attention) mechanism as NLP
  transformers.

## Terms used here
- [Self-Attention](#self-attention)
- [Convolution](#convolution)
