# PPO (Proximal Policy Optimization)

*Schulman et al., 2017 · [arXiv:1707.06347](https://arxiv.org/abs/1707.06347)*

## Summary
A policy-gradient method that improves stability by clipping the policy update
so each step stays close to the previous policy.

## Key ideas
- A [policy gradient](#policy-gradient) method at its core.
- Uses [advantage estimation](#advantage-estimation) to reduce variance of the
  gradient.

## Terms used here
- [Policy Gradient](#policy-gradient)
- [Advantage Estimation](#advantage-estimation)
