# Advantage Estimation

The advantage $A(s,a) = Q(s,a) - V(s)$ measures how much better an action is
than the state's average. Using it in a [policy gradient](#policy-gradient)
reduces variance. GAE (Generalized Advantage Estimation) is the common
practical estimator.

*Used by:* [PPO](#ppo)
