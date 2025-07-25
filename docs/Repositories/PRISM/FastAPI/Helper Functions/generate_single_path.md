---
sidebar_postion: 6
---

# `generate_single_path`

This function simulates a **single drone flight path** from an initial position toward a target location within a monitoring zone. The generated path is influenced by factors like tortuosity (how winding the path is), speed profile (low/high/default), and random variations to simulate realistic drone behavior.

---

## Function Signature

```python
def generate_single_path(center, mz_radius, tortuosity, speed='default', dt=0.2):
```

### Parameters

| Name         | Type    | Description                                                           |
| ------------ | ------- | --------------------------------------------------------------------- |
| `center`     | `Point` | Center of the monitoring zone (must have `latitude` and `longitude`). |
| `mz_radius`  | `float` | Radius of the monitoring zone in meters.                              |
| `tortuosity` | `float` | Level of winding in the path. 0 = straight line, 1 = highly curved.   |
| `speed`      | `str`   | Either `'low'`, `'high'`, or `'default'` — sets the speed range.      |
| `dt`         | `float` | Time step (in seconds) for each point along the path.                 |

---

## Returns

```python
return path, tortuosity
```

- `path`: List of tuples `((lat, lon), t, speed)` representing the drone's flight path.
- `tortuosity`: The input tortuosity value, returned for convenience.

---

## Key Components

### 1. Initial Start and Target Setup

```python
start_distance = np.random.uniform(mz_radius + 30, mz_radius + 100)
start_pos = distance(meters=start_distance).destination(center, start_angle_deg)
```

- The drone starts **outside** the monitoring zone at a random angle and distance.
- The target is randomly placed **inside** the zone, between 20% and 90% of the radius.

---

### 2. Speed Initialization

```python
if speed == "low":
    initial_speed = np.random.uniform(5, 10)
elif speed == "high":
    initial_speed = np.random.uniform(30, 35)
else:
    initial_speed = np.random.uniform(15, 25)
```

- Sets a base speed that will be smoothed using the `SmoothSpeed` class.

---

### 3. Optional Stationary Start

```python
if np.random.random() < 0.2:
    offset = np.random.randint(5, 25)
    start_distance = np.random.uniform(0, mz_radius * 0.8)
    start_pos = distance(meters=start_distance).destination(center, start_angle_deg)
    start_at_zero = True
```

- 20% of the time, the drone starts from a resting position **inside** the zone with a time offset.
- This simulates a drone taking off later in the simulation.

---

### 4. Main Path Loop

```python
while True:
    ...
    speed = speedSmoother.get_next_speed()
```

For each time step:

- Update time `t`
- Compute distance from center and target
- Adjust direction using tortuosity
- Update position based on speed and direction
- Append to the path

Path generation ends when:

- The drone enters and exits the MZ (`dist > mz_radius * 1.2`), or
- It reaches the target and the speed drops to 0 (if `stop_flag=True`)

---

## Behavior Based on Parameters

### Tortuosity-Based Random Turning

```python
angle = np.random.uniform(-max_turn_angle, max_turn_angle)
```

- Adds random angular deviations at each step for winding paths.
- The higher the `tortuosity`, the larger the turning range.

---

### Directional Blending Near Target

This logic ensures the drone **smoothly turns toward the target** as it gets closer.

#### Code

```python
blend_weight = base_blend + (1 - base_blend) * dist_factor
current_dir = (1 - blend_weight) * current_dir + blend_weight * to_target
current_dir /= np.linalg.norm(current_dir)
```

#### Detailed Explanation

##### Step 1: Compute `dist_factor`

```python
dist_factor = np.clip(1 - (distance_to_target / max_dist), 0.0, 1.0)
```

- `distance_to_target` is how far the drone is from the target.
- `max_dist` is a threshold (10% of MZ radius) within which blending starts.
- When far: `dist_factor ≈ 0` → little influence from target direction.
- When close: `dist_factor ≈ 1` → strong influence from target direction.

##### Step 2: Compute `base_blend`

```python
base_blend = 0.01 + 0.99 * (1 - tortuosity)
```

- If `tortuosity = 0`: `base_blend ≈ 1.0` → always aim straight to the target.
- If `tortuosity = 1`: `base_blend ≈ 0.01` → prioritize randomness over targeting.

##### Step 3: Compute Final Blend Weight

```python
blend_weight = base_blend + (1 - base_blend) * dist_factor
```

- When far from target: `blend_weight ≈ base_blend`
- When close to target: `blend_weight → 1.0`
- The closer the drone gets, the more it steers toward the target.

##### Step 4: Blend Directions

```python
current_dir = (1 - blend_weight) * current_dir + blend_weight * to_target
```

- Linearly interpolates between current direction and target direction.
- Makes direction changes smooth and natural.

##### Step 5: Normalize Direction

```python
current_dir /= np.linalg.norm(current_dir)
```

- Keeps `current_dir` as a unit vector to preserve proper scaling.

### Summary

This blending technique:

- Prevents overshooting or circling the target
- Avoids abrupt turns
- Produces a realistic, convergent flight path

---

## Example Usage

```python
from geopy import Point

path, tortuosity = generate_single_path(
    center=Point(25.276987, 55.296249),
    mz_radius=300,
    tortuosity=0.5,
    speed="default"
)

for step in path[:5]:
    print(step)
```

### Sample Output

```python
((25.30, 55.31), 0.0, 22.5)
((25.30, 55.31), 0.2, 21.9)
((25.30, 55.31), 0.4, 22.3)
...
```

---

## Summary Table

| Feature                 | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| Starts outside MZ       | Drone begins outside the monitoring zone                      |
| Curved/straight control | Controlled via `tortuosity` parameter                         |
| Smoothed speed          | Uses `SmoothSpeed` to simulate acceleration                   |
| Intelligent path ending | Stops path when drone exits MZ or reaches target              |
| Realistic behavior      | Includes turn smoothing, start delays, and target convergence |
