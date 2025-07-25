---
sidebar_postion: 10
---

# `find_conflicting_paths_np`

This function analyzes multiple drone paths (each represented as a NumPy array of positions and times) to find drones that come within a minimum safe distance of each other **at the same or near time steps**, indicating potential conflicts or collisions.

---

## Function Signature

```python
def find_conflicting_paths_np(np_paths, min_safe_dist=50, time_res=0.2):
```

### Parameters

| Name            | Type               | Description                                                                                                  |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `np_paths`      | list of np.ndarray | Each element is a NumPy array `(N,3)` with columns `[x, y, t]` representing a drone path in meters and time. |
| `min_safe_dist` | float              | Minimum safe distance (in meters) between drones to avoid conflict (default: 50 m).                          |
| `time_res`      | float              | Time resolution in seconds to bin time steps together (default: 0.2 s).                                      |

---

## Returns

- `conflicting_indices`: A set of integers indicating indices of drones whose paths conflict by violating the minimum safe distance at any binned time step.

---

## How It Works

### 1\. **Create Spatial Buckets by Time Bins**

```python
spatial_buckets = defaultdict(list)
conflicting_indices = set()

for drone_idx, arr in enumerate(np_paths):
    times = arr[:, 2]
    time_bins = np.round(times / time_res).astype(int)
    for point_idx, tb in enumerate(time_bins):
        spatial_buckets[tb].append((drone_idx, point_idx))
```

- Each drone's path has points with timestamps.
- Times are grouped into discrete bins (`time_bins`) by dividing by `time_res` and rounding.
- `spatial_buckets` maps each time bin to a list of `(drone_idx, point_idx)` pairs indicating which drone points exist in that time bin.

This groups points that occur at approximately the same time together.

---

### 2\. **For Each Time Bin, Find Conflicts Using Spatial KD-Tree**

```python
for tb, entries in spatial_buckets.items():
    if len(entries) < 2:
        continue
    points = []
    drones = []
    for drone_idx, point_idx in entries:
        x, y = np_paths[drone_idx][point_idx, :2]
        points.append([x, y])
        drones.append(drone_idx)
    points = np.array(points)
    tree = cKDTree(points)
    pairs = tree.query_pairs(r=min_safe_dist)
    for i, j in pairs:
        conflicting_indices.add(drones[i])
        conflicting_indices.add(drones[j])
```

- For each time bin with at least two drone points:

  - Extract their `(x, y)` coordinates into an array.
  - Build a **KD-tree** (`cKDTree`) for efficient spatial queries.
  - Use `query_pairs` to find all pairs of points closer than `min_safe_dist`.
  - For each pair found, add the drone indices to the `conflicting_indices` set.

This efficiently detects spatial proximity conflicts among drones flying roughly simultaneously.

---

### 3\. **Return Conflicting Drone Indices**

```python
return conflicting_indices
```

- The function returns a set of unique drone indices involved in any conflict.

---

## Example Usage

```python
conflicts = find_conflicting_paths_np(np_paths, min_safe_dist=50, time_res=0.2)
print("Conflicting drone indices:", conflicts)
```

---

## Summary

| Feature            | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| Time binning       | Groups drone positions by approximate time steps to compare simultaneous points |
| KD-tree search     | Fast spatial proximity search among drone points within each time bin           |
| Conflict detection | Finds drones whose positions violate minimum safe distance during flight        |
| Output             | Returns indices of drones involved in potential conflicts                       |
