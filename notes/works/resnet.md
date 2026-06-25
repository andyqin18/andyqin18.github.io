# ResNet (Deep Residual Learning)

*He et al., 2015 · [arXiv:1512.03385](https://arxiv.org/abs/1512.03385)*

## Summary
Training very deep networks degrades accuracy. ResNet adds a
[residual connection](#residual-connection) (a "skip") so each block learns a
residual function, letting gradients flow through 100+ layers.

## Key ideas
- Built on stacks of [convolution](#convolution) layers.
- The [residual connection](#residual-connection) is the core contribution.

## Terms used here
- [Convolution](#convolution)
- [Residual Connection](#residual-connection)
