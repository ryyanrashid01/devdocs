---
sidebar_postion: 8
---

# `generate_rogue_path`

This function modifies a portion of an existing drone path, introducing a controlled detour (“rogue” segment) before rejoining the original route.

---

## Function Signature

```python
def generate_rogue_path(orig_path, orig_speeds, mz_radius, center, curviness, deviation, dt=0.2, start_frac=0.33, end_frac=0.66):
```

### Parameters

| Name          | Type           | Description                                                                                                 |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| `orig_path`   | List of tuples | Original drone path points: `[((lat, lon), t, speed), ...]`.                                                |
| `orig_speeds` | List of floats | Speeds corresponding to `orig_path` points.                                                                 |
| `mz_radius`   | float          | Radius (meters) of the monitoring zone.                                                                     |
| `center`      | Point          | Center of the monitoring zone (with `.latitude` and `.longitude`).                                          |
| `curviness`   | float          | Controls the path’s winding during rogue segment (0 = straight, 1 = very curvy).                            |
| `deviation`   | str            | One of `"none"`, `"minor"`, or `"major"`; controls how far the detour deviates from original path corridor. |
| `dt`          | float          | Time step interval between points (seconds).                                                                |
| `start_frac`  | float          | Fractional index to start rogue segment (e.g., 0.33 = start at 33% into path).                              |
| `end_frac`    | float          | Fractional index to end rogue segment.                                                                      |

---

## Overview of Process

### 1\. Define Start and End Indices of Rogue Segment

```python
start_idx = int(len(orig_path) * start_frac)
end_idx = int(len(orig_path) * end_frac)
```

- Rogue segment lies between these indices on the original path.

---

### 2\. Initialize Position, Time, Speed

```python
pos = Point(*orig_path[start_idx][0])
t = orig_path[start_idx][1]
speed_at_start = orig_path[start_idx][2]
speedSmoother = SmoothSpeed(speed_at_start)
```

- Starts rogue path from the selected start index position and time.
- Uses `SmoothSpeed` to generate realistic speed fluctuations.

---

### 3\. Copy Original Path Before Rogue Segment

```python
rogue_path = list(orig_path[:start_idx])
rogue_speeds = list(orig_speeds[:start_idx])
```

- Preserve the initial part of the original path unchanged.

---

### 4\. Build Flight Corridor Polygon and Choose Waypoint Based on Deviation

```python
path_segment = orig_path[start_idx:end_idx]
corridor_polygon = build_corridor_polygon(path_segment, buffer_radius_m=20)
```

- Creates a 20-meter buffer polygon corridor around the rogue segment.

Waypoint selection:

- `"none"`: Random point within full monitoring zone.
- `"minor"`: Point inside corridor polygon.
- `"major"`: Point outside corridor polygon.

```python
if deviation == "none":
    waypoint_pos = distance(meters=np.random.uniform(0.0, 1.0) * mz_radius).destination(center, np.random.uniform(0, 360))
elif deviation == "minor":
    waypoint_pos = sample_point_within_polygon(corridor_polygon, center, mz_radius)
else:
    waypoint_pos = sample_point_outside_polygon(corridor_polygon, center, mz_radius)
```

---

### 5\. Rogue Path Generation Loop

```python
while True:
    t += dt
    ...
```

- The drone flies toward the `waypoint_pos` first (`diverting = True`).
- After reaching the waypoint (within 10m), it rejoins the original path’s tail (`diverting = False`).

Key steps inside the loop:

- Calculate direction vector to target.
- Blend direction smoothly using a weighted average controlled by distance and curviness.
- Add random turning noise proportional to `curviness` when inside the monitoring zone.
- Adjust speed smoothly using `SmoothSpeed`.
- Compute next position using geodesic step.
- Append the position, time, and speed to `rogue_path`.

---

### 6\. Rejoin Original Path Tail

After the rogue segment:

- Find closest tail point in the original path.
- Adjust the timestamps of the remaining original path points to follow seamlessly after the rogue path.
- Append adjusted tail to `rogue_path`.

```python
t_rogue_end = rogue_path[-1][1]
t_orig_end = orig_path[new_end_idx][1]
time_offset = t_rogue_end - t_orig_end
adjusted_tail = [((lat, lon), t + time_offset, s) for (lat, lon), t, s in orig_path[new_end_idx:]]
rogue_path.extend(adjusted_tail)
```

---

## Return Value

- Returns `rogue_path`: the full drone path including the rogue detour and adjusted tail segment.

---

## Summary Table

| Step                           | Description                                                       |
| ------------------------------ | ----------------------------------------------------------------- |
| Initialize rogue segment start | Pick start/end points and initialize position, time, speed        |
| Select waypoint                | Based on deviation type, select where drone diverts               |
| Fly toward waypoint            | Use direction blending and noise to simulate curvy detour         |
| Rejoin original path           | After waypoint reached, smoothly transition back to original path |
| Return new full path           | Rogue path combined with original tail                            |

---

## Use Case

You can use this function to simulate drones deviating unpredictably within their monitoring zone while maintaining realistic flight dynamics and timing.
