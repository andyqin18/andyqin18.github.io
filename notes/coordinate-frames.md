# Coordinate Frames

Almost every bug in a robotics stack is, at bottom, a frame bug: a
quantity expressed in the wrong frame, or a transform applied in the
wrong direction. Getting disciplined about frames pays off everywhere.

## Notation

A common convention writes a transform as ${}^{A}T_{B}$ — the pose of
frame $B$ expressed in frame $A$. Read it right-to-left: it maps a point
in $B$ into $A$:

```text
p_A = A_T_B @ p_B
```

Chaining transforms then "cancels" adjacent frames:

```text
A_T_C = A_T_B @ B_T_C
```

## The homogeneous transform

A rigid transform combines a rotation $R \in SO(3)$ and a translation
$t \in \mathbb{R}^3$ into a single $4\times 4$ matrix:

```text
T = | R  t |
    | 0  1 |
```

Using homogeneous coordinates lets you compose rotation and translation
with a single matrix multiply.

```python
import numpy as np

def make_transform(R, t):
    T = np.eye(4)
    T[:3, :3] = R
    T[:3, 3] = t
    return T

def invert_transform(T):
    R, t = T[:3, :3], T[:3, 3]
    Ti = np.eye(4)
    Ti[:3, :3] = R.T
    Ti[:3, 3] = -R.T @ t
    return Ti
```

## Common frames in a mobile manipulator

| Frame    | Description                                  |
|----------|----------------------------------------------|
| `world`  | Fixed inertial frame                         |
| `base`   | Robot body / chassis                         |
| `ee`     | End-effector (tool) frame                    |
| `camera` | Optical frame of a mounted sensor            |

The pose you actually care about — say, the object in the gripper frame
— is usually a chain:

```text
ee_T_obj = ee_T_camera @ camera_T_obj
```

## Practical checklist

- Name variables with both frames, e.g. `base_T_ee`, never just `T`.
- When in doubt, multiply a known point through and check it lands where
  you expect.
- Keep a single source of truth for static transforms (a URDF, a TF
  tree) rather than hard-coding numbers in several places.

See the [Introduction](#intro) for how to add your own pages.
