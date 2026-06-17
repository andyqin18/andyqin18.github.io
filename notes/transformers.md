# Transformer Basics

The Transformer is a sequence model built almost entirely from
**attention** and feed-forward layers — no recurrence, no convolution.
Introduced in *Attention Is All You Need* (Vaswani et al., 2017), it is
now the backbone of large language models and is increasingly used in
robotics for policies, world models, and perception.

This note builds the architecture from the ground up: attention first,
then multi-head attention, positional encodings, and the full block.

## Why attention?

Recurrent models process a sequence one step at a time, so information
from token $i$ reaches token $j$ only after $|i - j|$ steps. This makes
long-range dependencies hard to learn and impossible to parallelize over
the sequence length.

Attention instead lets **every token look at every other token in one
step**. The path length between any two positions is constant, and the
whole operation is a couple of matrix multiplies — ideal for GPUs.

## Scaled dot-product attention

Each token produces three vectors via learned projections:

- a **query** $q$ — "what am I looking for?"
- a **key** $k$ — "what do I offer?"
- a **value** $v$ — "what I will pass on if attended to."

Stacking these over all $n$ tokens gives matrices
$Q, K \in \mathbb{R}^{n \times d_k}$ and $V \in \mathbb{R}^{n \times d_v}$.
Attention is then:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{Q K^\top}{\sqrt{d_k}}\right) V
$$

Reading it left to right:

1. $Q K^\top$ scores every query against every key — an $n \times n$
   matrix of similarities.
2. Dividing by $\sqrt{d_k}$ keeps the scores from growing with dimension,
   which would otherwise push the softmax into saturated regions with
   vanishing gradients.
3. The row-wise softmax turns each row into a probability distribution
   over the other tokens — the **attention weights**.
4. Multiplying by $V$ returns a weighted average of values: each output
   token is a blend of the values it attended to.

```python
import numpy as np

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.swapaxes(-1, -2) / np.sqrt(d_k)
    weights = softmax(scores, axis=-1)
    return weights @ V, weights
```

### Self-attention vs. cross-attention

- **Self-attention**: $Q$, $K$, $V$ all come from the *same* sequence —
  tokens mix information among themselves.
- **Cross-attention**: $Q$ comes from one sequence (e.g. the decoder)
  while $K$, $V$ come from another (e.g. the encoder output). This is how
  a decoder conditions on the input.

### Masking

To prevent a position from attending to future tokens (needed for
autoregressive generation), add a mask $M$ with $-\infty$ in the
disallowed entries *before* the softmax:

$$
\text{softmax}\!\left(\frac{Q K^\top}{\sqrt{d_k}} + M\right)
$$

The $-\infty$ entries become zero weight after the softmax.

## Multi-head attention

A single attention function averages everything into one representation.
Instead we run $h$ attention operations in parallel — **heads** — each
with its own projections, so different heads can specialize (syntax,
position, coreference, …).

$$
\text{MultiHead}(X) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\, W^O
$$

$$
\text{head}_i = \text{Attention}(X W_i^Q,\; X W_i^K,\; X W_i^V)
$$

Each head works in a smaller subspace of size $d_k = d_{\text{model}}/h$,
so multi-head attention costs about the same as single-head at full
width, while being strictly more expressive.

## Positional encodings

Attention is **permutation-invariant**: shuffle the tokens and the output
shuffles with them. Order carries meaning, so we inject position
explicitly. The original paper uses fixed sinusoids:

$$
PE_{(p,\,2i)} = \sin\!\left(\frac{p}{10000^{2i/d_{\text{model}}}}\right),
\qquad
PE_{(p,\,2i+1)} = \cos\!\left(\frac{p}{10000^{2i/d_{\text{model}}}}\right)
$$

where $p$ is the position and $i$ the dimension index. These vectors are
*added* to the token embeddings. Modern models often replace this with
**learned** or **rotary (RoPE)** position embeddings, but the goal is the
same: give the model a sense of where each token sits.

## The Transformer block

A block wraps attention and a position-wise feed-forward network, each in
a **residual + layer-norm** sandwich:

```text
x = x + MultiHeadAttention(LayerNorm(x))   # pre-norm variant
x = x + FFN(LayerNorm(x))
```

The feed-forward network is two linear layers with a nonlinearity,
applied independently to each position:

$$
\text{FFN}(x) = \max(0,\; x W_1 + b_1)\, W_2 + b_2
$$

Two design choices matter in practice:

| Choice | Effect |
|--------|--------|
| Residual connections | Stable gradients through deep stacks |
| Layer normalization  | Keeps activations well-scaled per token |
| Pre-norm vs. post-norm | Pre-norm trains more stably at depth |

Stacking $N$ such blocks gives an encoder (or, with masking and
cross-attention, a decoder). That stack — embeddings, positional
encodings, $N$ blocks, and an output projection — is the full
Transformer.

## Complexity and the long-context problem

Self-attention compares every pair of tokens, so both compute and memory
scale as $O(n^2 d)$ in the sequence length $n$. For long sequences this
quadratic cost dominates, which is why efficient-attention variants
(FlashAttention, sparse/linear attention, sliding windows) are an active
area.

| Component | Cost |
|-----------|------|
| $QK^\top$ scores | $O(n^2 d)$ |
| Softmax × $V$ | $O(n^2 d)$ |
| Feed-forward | $O(n d^2)$ |

## Why this matters for robotics

Transformers now show up across the stack:

- **Policies** — decision/trajectory transformers cast control as
  sequence modeling; vision-language-action models map observations and
  instructions to actions.
- **Perception** — ViT and DETR-style detectors treat image patches as
  tokens.
- **World models** — attention over state/action histories for prediction
  and planning.

The same attention primitive you built above is what powers all of them.

## References

- Vaswani et al., *Attention Is All You Need*, NeurIPS 2017.
- Phuong & Hutter, *Formal Algorithms for Transformers*, 2022.

See the [Introduction](#intro) for how these notes are organized, or the
[Coordinate Frames](#coordinate-frames) note for a more classical topic.
