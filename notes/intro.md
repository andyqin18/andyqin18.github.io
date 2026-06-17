# Introduction

Welcome to my robotics notes. This is a living collection of concepts,
derivations, and practical lessons I pick up while working on robot
manipulation, perception, and control.

Each page in the left sidebar is a standalone Markdown file in the
`notes/` folder. The page you are reading right now is
`notes/intro.md` — edit it and refresh to see your changes.

## How these notes are organized

- **Getting Started** — orientation and how to use this site.
- **Concepts** — the core math and ideas, one topic per page.

The right-hand panel ("On this page") is generated automatically from
the headings, so structuring a note is just a matter of writing good
`##` and `###` headings.

## Writing a note

Everything standard Markdown supports works here. A few examples:

### Lists and emphasis

You can mix **bold**, *italic*, and `inline code`. Ordered steps:

1. Define the problem and the frames involved.
2. Write the kinematics.
3. Sanity-check against a known configuration.

### Code blocks

```python
import numpy as np

def skew(v):
    """Return the 3x3 skew-symmetric matrix of a 3-vector."""
    x, y, z = v
    return np.array([[0, -z,  y],
                     [z,  0, -x],
                     [-y, x,  0]])
```

### Tables

| Symbol | Meaning            | Units |
|--------|--------------------|-------|
| $q$    | joint angles       | rad   |
| $\tau$ | joint torques      | N·m   |

### Links

Notes can link to each other with a normal link to the page hash, e.g.
see [Coordinate Frames](#coordinate-frames).

> **Tip:** keep one concept per file. Short, focused pages are easier to
> revisit than one long document.
