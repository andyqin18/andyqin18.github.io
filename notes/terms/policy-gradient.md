# Policy Gradient

Directly optimizes a parameterized policy $\pi_\theta(a|s)$ by ascending the
gradient of expected return:

$$\nabla_\theta J = \mathbb{E}\big[\nabla_\theta \log \pi_\theta(a|s)\, A(s,a)\big]$$

The $A(s,a)$ term comes from [advantage estimation](#advantage-estimation).

*Used by:* [PPO](#ppo)
