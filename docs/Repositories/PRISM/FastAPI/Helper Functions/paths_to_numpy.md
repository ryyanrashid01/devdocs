---
sidebar_postion: 9
---

# `paths_to_numpy`

This function takes a list of drone flight paths in geographic coordinates (latitude, longitude) with timestamps and converts each path into a NumPy array with planar Cartesian coordinates (meters) relative to a reference center, plus the time component.

---

## Function Signature

```python
def paths_to_numpy(paths, center_lat, center_lon):
```

### Parameters

| Name         | Type    | Description                                                                                                               |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `paths`      | `list`  | List of paths, where each path is a tuple whose first element is a list of points in the format `((lat, lon), t, speed)`. |
| `center_lat` | `float` | Latitude of the reference center point in degrees.                                                                        |
| `center_lon` | `float` | Longitude of the reference center point in degrees.                                                                       |

---

## Returns

- A list of NumPy arrays, one per path.
- Each NumPy array has shape `(N, 3)` where N is the number of points, and columns correspond to:

  - **x**: East-West distance from center in meters.
  - **y**: North-South distance from center in meters.
  - **t**: Timestamp in seconds (or other time units).

---

## How It Works

### Step 1: Initialize the output list

```python
np_paths = []
```

An empty list to hold the converted NumPy arrays.

---

### Step 2: Iterate over each path tuple

```python
for path_tuple in paths:
    path = path_tuple[0]  # Extract inner list of points
```

- Each item in `paths` is a tuple, where the actual path points list is the first element.
- Extract this list of points.

---

### Step 3: For each point, convert lat/lon to x/y meters and collect timestamp

```python
xs, ys, ts = [], [], []
for point in path:
    coords, t, _ = point
    lat, lon = coords
    x, y = latlon_to_xy_meters(center_lat, center_lon, lat, lon)
    xs.append(x)
    ys.append(y)
    ts.append(t)
```

- Each point is a tuple: `((lat, lon), time, speed)`.
- Extract latitude and longitude.
- Convert lat/lon to local Cartesian coordinates relative to the center using `latlon_to_xy_meters`.
- Append the converted x, y and timestamp values to separate lists.

---

### Step 4: Stack x, y, t columns into a NumPy array

```python
np_paths.append(np.column_stack((xs, ys, ts)))
```

- Combine the lists of x, y, and t values into a single 2D NumPy array with shape `(N, 3)`.

---

### Step 5: Return the list of NumPy arrays

```python
return np_paths
```

---

## Example Usage

```python
center_lat, center_lon = 25.276987, 55.296249

paths = [
    (
        [((25.28, 55.30), 0.0, 20), ((25.281, 55.301), 0.2, 21)],
    ),
    (
        [((25.279, 55.299), 0.0, 18), ((25.28, 55.3), 0.2, 19)],
    ),
]

np_paths = paths_to_numpy(paths, center_lat, center_lon)

for arr in np_paths:
    print(arr)
```

**Sample Output:**

```lua
[[416.0  467.0  0.0]
 [529.0  579.0  0.2]]
[[300.0  350.0  0.0]
 [416.0  467.0  0.2]]
```

---

## Summary

- Converts geographic paths into metric Cartesian coordinates plus time.
- Prepares data for numerical operations, plotting, or simulations.
- Uses the `latlon_to_xy_meters` helper for spatial conversion.
