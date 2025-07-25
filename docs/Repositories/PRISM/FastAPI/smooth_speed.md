---
sidebar_position: 3
---

# SmoothSpeed

The `SmoothSpeed` class is used to generate **smooth, randomized drone speed values** over time, simulating natural acceleration, deceleration, and cruising behavior. It uses a **precomputed sine-based speed curve** to provide realistic motion patterns while avoiding speeds that are too low.

---

## Code Summary

```python
class SmoothSpeed:
    LOW_SPEED_THRESHOLD = 1.0
    ...
```

This class wraps a mechanism to fetch a new speed value at each step. It respects a defined minimum speed threshold (`LOW_SPEED_THRESHOLD = 1.0` m/s) to avoid speeds that are too slow for drone navigation.

---

## Initialization

### Constructor

```python
def __init__(self, initial_speed, start_at_zero=False):
```

#### Parameters

- `initial_speed`: The intended cruising speed (in m/s), used to scale the curve.
- `start_at_zero`: If `True`, the drone starts at 0 m/s and ramps up gradually to cruising speed.

#### Behavior

This block initializes a sine-based curve of speeds:

```python
self.speed_curve = np.round(self.initial_speed * np.sin(np.linspace(0, np.pi/2, 100)), 1)
```

- `np.linspace(0, π/2, 100)` creates 100 points from 0 to 90 degrees.
- `np.sin(...)` produces a smooth curve from 0 to 1.
- Multiplying by `initial_speed` creates a smooth ramp-up curve from 0 to `initial_speed`.
- Rounded to one decimal place for stability.

#### Example

```python
smooth = SmoothSpeed(initial_speed=32, start_at_zero=True)
```

If `start_at_zero=True`, speed starts from 0 and accelerates along the sine curve. Otherwise, it starts near the target speed.

---

## `get_next_speed()`

```python
def get_next_speed(self):
```

Returns the **next speed value**, based on randomness and the speed curve. This simulates **natural variation in drone velocity**, with logic to avoid unrealistic behaviors.

---

### Acceleration From Zero

If the drone is starting from zero (i.e., `start_at_zero=True`) and hasn't reached 90% of target speed yet:

```python
if self.start_at_zero and self.speed_curve[self.current_index] <= self.initial_speed * 0.9:
    updated_index = min(self.current_index + np.random.randint(1, 5), len(self.speed_curve) - 1)
```

- Randomly increase the speed index by 1–4.
- Once the drone reaches 90% of the cruising speed, it disables `start_at_zero`.

This ensures **fast but smooth ramp-up from zero**.

---

### Random Fluctuation Logic

```python
chance = np.random.random()

if chance < 0.33:
    updated_index += np.random.randint(1, 5)
elif chance < 0.66:
    updated_index -= np.random.randint(1, 5)
# else: maintain current index
```

Each time step:

- 33% chance to **speed up**
- 33% chance to **slow down**
- 34% chance to **keep current speed**

This creates **organic variation** in the speed.

---

### Clamp and Filter Unsafe Speeds

```python
updated_index = max(0, min(len(self.speed_curve) - 1, updated_index))
next_speed = self.speed_curve[updated_index]
```

This ensures the index stays within the valid range of the curve.

Then, the class rejects speeds below `LOW_SPEED_THRESHOLD` with 90% probability:

```python
if next_speed < self.LOW_SPEED_THRESHOLD:
    if np.random.random() > 0.1:
        ...
```

If the randomly chosen speed is too low, it adjusts the index toward the curve’s center to recover to a safer speed range.

---

### Final Result

```python
self.current_index = updated_index
return next_speed
```

The class updates its internal state and returns the selected speed value.

---

## Full Example Usage

```python
import numpy as np
import matplotlib.pyplot as plt
from smooth_speed import SmoothSpeed

initial_speed = np.random.randint(30, 35)
smooth_speed = SmoothSpeed(initial_speed=initial_speed, start_at_zero=True)

speeds = []
for _ in range(200):
    speeds.append(smooth_speed.get_next_speed())

plt.plot(speeds, label="Speed over time")
plt.axhline(initial_speed, color="gray", linestyle="--", label="Initial speed")
plt.legend()
plt.title("Smooth Speed Profile")
plt.xlabel("Time Step")
plt.ylabel("Speed (m/s)")
plt.grid(True)
plt.show()
```

This generates a **visually smooth speed profile** that rises quickly from zero and fluctuates gently near the target speed. It's ideal for drone simulations where **abrupt changes or unrealistic speeds are undesirable**.

---

## Key Design Goals

| Feature                | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| Smoothness             | Uses a sine curve to simulate gentle acceleration and deceleration  |
| Controlled randomness  | Varies speed with randomness, but avoids sudden large changes       |
| Start from zero        | Optional behavior to simulate drone takeoff                         |
| Safe speed enforcement | Prevents drones from operating below a reasonable threshold (1 m/s) |
| Reusable               | Can be sampled repeatedly for time-step-based simulations           |
