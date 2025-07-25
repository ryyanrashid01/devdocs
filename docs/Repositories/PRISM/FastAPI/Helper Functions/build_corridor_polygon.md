---
sidebar_postion: 4
---

# build_corridor_polygon

### Function Signature

```python
def build_corridor_polygon(path_segment, buffer_radius_m):
```

### Parameters

| Name              | Type                                 | Description                                                                         |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| `path_segment`    | `list[tuple[((lat, lon), t, speed)]` | A list of drone trajectory points in the format returned by `generate_single_path`. |
| `buffer_radius_m` | `float`                              | Radius in **meters** around the path to buffer and create the corridor polygon.     |

---

### Step 1: Convert to `LineString`

```python
line = LineString([(lon, lat) for (lat, lon), _, _ in path_segment])
```

- Transforms the path into a geometric line (`LineString`) using Shapely.
- Coordinates are converted from `(lat, lon)` to `(lon, lat)` since Shapely expects `(x, y)` (i.e., `(longitude, latitude)`).
- Ignores the time and speed values in the path — only position matters for this geometry.

---

### Step 2: Buffer the Line

```python
buffer_deg = buffer_radius_m / 111_000.0
return line.buffer(buffer_deg)
```

- Converts the buffer radius from meters to **degrees of latitude**:

  - Roughly, **1° latitude ≈ 111,000 meters**.
  - This is an approximation (good enough for small areas).

- `line.buffer()` creates a polygon around the path with the specified width.

  - This becomes your **"flight corridor polygon"**.

---

## Return Value

```python
return Polygon
```

- Returns a **Shapely `Polygon`** object representing the corridor around the path.

---

## Limitations

- Assumes Earth is flat over short distances (uses degree conversion based on latitude).
- For large-scale or polar regions, you'd need to project to a planar coordinate system (e.g., UTM) instead of using raw lat/lon + buffer.

---

## Example Usage

```python
corridor = build_corridor_polygon(path[:50], buffer_radius_m=30)
```

- This will return a polygon around the first 50 steps of the drone path, buffered by 30 meters on each side.

You can visualize it using libraries like `matplotlib`, `shapely`, or `folium`.

---

## Summary

| Step                                 | Purpose                                |
| ------------------------------------ | -------------------------------------- |
| Convert `(lat, lon)` to `(lon, lat)` | Required for correct geometry          |
| Build `LineString`                   | Represents drone trajectory            |
| Compute buffer in degrees            | Approximate meter-to-degree conversion |
| Return buffered polygon              | Represents the flight corridor         |
