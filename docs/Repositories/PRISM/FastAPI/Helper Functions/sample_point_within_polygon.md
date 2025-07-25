---
sidebar_position: 5
---

## `sample_point_within_polygon`

### Purpose

Randomly generates a geographic point within a polygon around a specified center point.

### Function Signature

```python
def sample_point_within_polygon(polygon, center, radius_m):
```

### Parameters

| Name       | Type            | Description                                                   |
| ---------- | --------------- | ------------------------------------------------------------- |
| `polygon`  | Shapely Polygon | The polygon inside which a point must lie.                    |
| `center`   | Geopy Point     | Central point for distance calculations.                      |
| `radius_m` | float           | Maximum radius in meters for sampling points around `center`. |

### How It Works

- Tries up to 1000 times to find a random point inside the polygon.
- Generates a random angle from 0 to 360 degrees.
- Picks a random distance `r` between 5 meters and `radius_m`.
- Calculates a candidate point at that distance and angle from the center using geodesic calculations (`distance(meters=r).destination(center, angle)`).
- Converts the candidate to a Shapely point (longitude, latitude order).
- Checks if the candidate lies **inside** the polygon (`polygon.contains(point)`).
- Returns the candidate point immediately if valid.
- Raises an error if no valid point is found within 1000 attempts.

---

## `sample_point_outside_polygon`

### Purpose

Randomly generates a geographic point **outside** a given polygon but within a radius around the center.

### Function Signature

```python
def sample_point_outside_polygon(polygon, center, radius_m, min_dist_m=15):
```

### Parameters

| Name         | Type               | Description                                                   |
| ------------ | ------------------ | ------------------------------------------------------------- |
| `polygon`    | Shapely Polygon    | The polygon outside which a point must lie.                   |
| `center`     | Geopy Point        | Central point for distance calculations.                      |
| `radius_m`   | float              | Maximum radius in meters for sampling points around `center`. |
| `min_dist_m` | float (default=15) | Minimum distance in meters from center for candidate points.  |

### How It Works

- Attempts up to 1000 times to sample a point **outside** the polygon.
- Generates a random angle between 0 and 360 degrees.
- Picks a random distance `r` between `min_dist_m` and `radius_m`.
- Computes the candidate point using geodesic calculations.
- Converts to a Shapely point.
- Returns the candidate if it lies **outside** the polygon (`not polygon.contains(point)`).
- Raises an error if no suitable point is found after 1000 tries.

---

## Common Notes

- Both functions use **rejection sampling**: randomly sample and test until a valid point is found.
- The max number of attempts (1000) prevents infinite loops in pathological cases.
- The `distance` function from `geopy` accurately accounts for Earth's curvature in calculating destination points.
- Shapely expects points as `(longitude, latitude)`.

---

## Example Usage

```python
from shapely.geometry import Polygon
from geopy import Point

# Suppose you have a polygon and a center:
poly = your_corridor_polygon  # Shapely Polygon
center = Point(25.276987, 55.296249)
radius = 300  # meters

# Sample a point inside the polygon
inside_point = sample_point_within_polygon(poly, center, radius)
print("Inside point:", inside_point.latitude, inside_point.longitude)

# Sample a point outside the polygon but within radius
outside_point = sample_point_outside_polygon(poly, center, radius, min_dist_m=20)
print("Outside point:", outside_point.latitude, outside_point.longitude)
```
