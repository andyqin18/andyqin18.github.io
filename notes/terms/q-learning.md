# Q-Learning

A value-based RL method that learns $Q(s,a)$, the expected return of taking
action $a$ in state $s$. Updated toward the Bellman target
$r + \gamma \max_{a'} Q(s', a')$. Acting greedily w.r.t. $Q$ gives the policy.

*Used by:* [DQN](#dqn)
