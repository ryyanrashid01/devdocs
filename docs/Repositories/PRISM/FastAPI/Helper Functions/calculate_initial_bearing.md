---
sidebar_postion: 1
---

# `calculate_initial_bearing`

This function calculates the **initial compass bearing** (in degrees) from a starting geographic coordinate to a target geographic coordinate. It’s particularly useful in navigation, drone path planning, and geospatial analysis.

---

## Function Definition

```python
def calculate_initial_bearing(start, target):
```

### Parameters

- `start`: An Point object with `latitude` and `longitude` attributes (in decimal degrees).
- `target`: Another Point object with `latitude` and `longitude` attributes.

> This comes from:

```python
from geopy.point import Point
```

### Returns

- `float`: The **initial bearing** from the `start` point to the `target` point, in **degrees**, ranging from `0` to `< 360`.

---

## Example Use Case

```python
from types import SimpleNamespace

start = SimpleNamespace(latitude=25.276987, longitude=55.296249)  # Dubai
target = SimpleNamespace(latitude=24.713552, longitude=46.675296)  # Riyadh

bearing = calculate_initial_bearing(start, target)
print(f"Initial bearing from Dubai to Riyadh: {bearing:.2f}°")
```

---

## Internal Logic Explained

### Convert Degrees to Radians

```python
lat1 = np.radians(start.latitude)
lat2 = np.radians(target.latitude)
delta_lon = np.radians(target.longitude - start.longitude)
```

All trigonometric calculations are done in radians, so inputs are converted.

---

### Calculate Components

```python
x = np.sin(delta_lon) * np.cos(lat2)
y = np.cos(lat1) * np.sin(lat2) - np.sin(lat1) * np.cos(lat2) * np.cos(delta_lon)
```

This computes the Cartesian components of the great-circle bearing.

---

### Bearing Calculation

```python
initial_bearing = np.arctan2(x, y)
```

This returns the angle in radians between the meridian and the direction to the target.

---

### Convert to Degrees and Normalize

```python
return np.degrees(initial_bearing) % 360
```

- Converts radians to degrees.
- `% 360` ensures the result is in the `[0, 360)` degree range.

---

## Output Interpretation

- `0°` = North
- `90°` = East
- `180°` = South
- `270°` = West

For example, a result of `121.5°` indicates the initial direction is southeast-ish.

---

## Notes

- This function assumes a spherical Earth model (great-circle path). It does **not** account for elevation or Earth’s ellipsoid shape.
- It is useful when simulating the heading of a drone or vehicle moving from point A to point B.
