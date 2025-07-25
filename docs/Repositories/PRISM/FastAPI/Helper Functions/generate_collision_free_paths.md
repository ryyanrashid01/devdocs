---
sidebar_postion: 11
---

# `generate_collision_free_paths`

This function generates collision-free flight paths for multiple drones within a monitoring zone by repeatedly generating paths and checking for conflicts, then resolving conflicts by regenerating paths as needed.

---

## Function Signature

```python
def generate_collision_free_paths(center, mz_radius, drones):
```

### Parameters

| Name        | Type                  | Description                                                  |
| ----------- | --------------------- | ------------------------------------------------------------ |
| `center`    | `Point`               | Center of the monitoring zone (latitude, longitude).         |
| `mz_radius` | `float`               | Radius of the monitoring zone in meters.                     |
| `drones`    | List of `DroneConfig` | List of drone configurations including speed and tortuosity. |

---

## Returns

- A list of collision-free paths, where each path is a list of dictionaries containing `lat`, `lon`, `t` (time), and `speed`.

---

## Workflow Overview

### 1\. **Preparation**

```python
num_drones = len(drones)
args = [(center, mz_radius, drone.tortuosity, drone.speed) for drone in drones]
```

- Prepares arguments for generating each drone’s path based on its configuration.

---

### 2\. **Initial Path Generation (Parallelized)**

```python
with ProcessPoolExecutor(max_workers=os.cpu_count()) as executor:
    paths = list(executor.map(generate_single_path_wrapper, args))
```

- Uses Python’s `ProcessPoolExecutor` to generate each drone path in parallel to speed up computation.
- `generate_single_path_wrapper` is a helper to seed randomness uniquely per process.

---

### 3\. **Convert Paths to NumPy for Collision Detection**

```python
center_lat, center_lon = center.latitude, center.longitude
np_paths = paths_to_numpy(paths, center_lat, center_lon)
```

- Converts generated paths to NumPy arrays (x, y, t) relative to the monitoring zone center.
- Facilitates efficient spatial and temporal collision checks.

---

### 4\. **Collision Detection and Resolution Loop**

```python
attempts = 0
while True:
    if attempts > 1000:
        print("[ERROR] : Too many attempts to resolve conflicts. Exiting.")
        return []

    bad = find_conflicting_paths_np(np_paths)
    attempts += 1

    if bad:
        print(f"[CONFLICT] : [Pass-{attempts}] - Conflict between paths {bad}")
    else:
        print("[CONFLICT] : Conflicts resolved.")
        break

    new_args = [(center, mz_radius, drones[idx].tortuosity, drones[idx].speed) for idx in bad]
    with ProcessPoolExecutor(max_workers=os.cpu_count()) as executor:
        new_paths = list(executor.map(generate_single_path_wrapper, new_args))

    for idx, new_path in zip(bad, new_paths):
        paths[idx] = new_path
        np_paths[idx] = paths_to_numpy([new_path], center_lat, center_lon)[0]
```

- Repeatedly checks for path conflicts.
- If conflicts exist:

  - Prints conflicting drone indices.
  - Regenerates only the conflicting drones' paths in parallel.
  - Updates those paths and their NumPy representations.

- Stops when no conflicts remain or if it exceeds 1000 attempts to avoid infinite loops.

---

### 5\. **Final Formatting of Paths**

```python
formatted_paths = [
    [
        {"lat": lat, "lon": lon, "t": t, "speed": s}
        for ((lat, lon), t, s) in path_data
    ]
    for (path_data, _) in paths
]
return formatted_paths
```

- Converts each path from internal tuple format `((lat, lon), t, speed)` into a list of dictionaries expected by the frontend or API clients.

---

## Summary Table

| Step                    | Description                                  |
| ----------------------- | -------------------------------------------- |
| Prepare arguments       | Extract parameters from drone configs        |
| Generate paths          | Parallel generation of initial drone paths   |
| Convert to NumPy        | For efficient conflict detection             |
| Conflict detection loop | Check & fix conflicts by regenerating paths  |
| Format output           | Convert path data to frontend-friendly dicts |

---

## Example Usage

```python
paths = generate_collision_free_paths(center, mz_radius, drones)
print(f"Generated {len(paths)} collision-free paths.")
```
