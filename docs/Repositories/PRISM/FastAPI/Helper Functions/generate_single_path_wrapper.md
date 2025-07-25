---
sidebar_postion: 7
---

## `generate_single_path_wrapper`

### Function Signature

```python
def generate_single_path_wrapper(args):
```

- Accepts a **single argument**, usually a tuple of parameters.
- This format makes it compatible with `multiprocessing.Pool.map` or similar parallel tools.

---

### Seed Initialization for Reproducibility

```python
np.random.seed(os.getpid() + int(time.time()*1000) % 10000)
random.seed(os.getpid() + int(time.time()*1000) % 10000)
```

- **Why it's here:** When running in parallel, we want each process to produce **different random results**.
- `os.getpid()` ensures each process has a unique base.
- `int(time.time()*1000) % 10000` adds **millisecond-level randomness** to avoid duplicate seeds when many workers start close together in time.
- Both NumPy and Python’s `random` module are seeded separately to ensure all random calls are diversified.

> ⚠️ Without these seeds, different workers might generate **identical paths** if they happen to start at the same moment.

---

### Argument Unpacking

```python
center, mz_radius, tortuosity, speed = args
```

- The input `args` is expected to be a tuple like:

  ```python
  (center_point, radius, tortuosity_value, speed_setting)
  ```

---

### Path Generation Call

```python
return generate_single_path(center, mz_radius, tortuosity, speed)
```

- Delegates the actual path computation to `generate_single_path` function.

---

## Example Use Case

Here’s how this would be used in a multiprocessing context:

```python
from multiprocessing import Pool

param_list = [
    (center_point, 300, 0.2, "default"),
    (center_point, 300, 0.5, "low"),
    (center_point, 300, 0.9, "high"),
    # ...
]

with Pool(processes=4) as pool:
    results = pool.map(generate_single_path_wrapper, param_list)
```

Each worker gets its own parameters, seeds its RNG, and generates a unique path.

---

## Summary

| Feature          | Description                                       |
| ---------------- | ------------------------------------------------- |
| RNG seeding      | Ensures randomness per process/thread             |
| Tuple input      | Enables easy use with `map` or `starmap`          |
| Clean delegation | Simply wraps and calls `generate_single_path`     |
| Parallel-safe    | Safe for multiprocessing due to PID-based seeding |
