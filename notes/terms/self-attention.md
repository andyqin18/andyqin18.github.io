# Self-Attention

Each token computes a weighted sum of all other tokens, where the weights come
from query-key similarity:

$$\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

This lets the model relate any two positions regardless of distance.

*Used by:* [Vision Transformer](#vit)
