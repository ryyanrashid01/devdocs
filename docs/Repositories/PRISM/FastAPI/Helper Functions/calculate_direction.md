---
sidebar_postion: 3
---

# `calculate_direction`

This function calculates the **direction vector** from one point (`p1`) to another (`p2`) on the Earth’s surface, returning a normalized 2D vector in Cartesian coordinates (x, y).

---

## Function Signature

```python
def calculate_direction(p1: Point, p2: Point):
```

### Parameters

| Name | Type    | Description                                                    |
| ---- | ------- | -------------------------------------------------------------- |
| `p1` | `Point` | Starting geographic point (with `.latitude` and `.longitude`). |
| `p2` | `Point` | Target geographic point.                                       |

---

## How It Works

### Step 1: Calculate Initial Bearing

```python
bearing = calculate_initial_bearing(p1, p2)
```

- Calls a helper function `calculate_initial_bearing` which computes the **initial compass bearing** from `p1` to `p2` in degrees.
- Bearing is the clockwise angle from north (0°) to the line connecting the two points (range: 0° to 360°).

---

### Step 2: Convert Bearing to Radians

```python
bearing_rad = np.radians(bearing)
```

- Converts the bearing from degrees to radians for use in trigonometric functions.

---

### Step 3: Calculate Direction Vector Components

```python
return np.array([np.cos(bearing_rad), np.sin(bearing_rad)])
```

- Computes the x-component as the cosine of the bearing angle.
- Computes the y-component as the sine of the bearing angle.
- Returns these as a NumPy array representing a **unit vector** pointing in the direction from `p1` to `p2`.

---

## Summary

- The function converts geographic bearing into a 2D Cartesian direction vector on a plane.
- Useful for vector math such as moving in the direction from one coordinate to another.
- The returned vector has length 1 (unit vector), simplifying scaling operations for movement or velocity.

---

## Example Usage

```python
from geopy import Point

start = Point(25.276987, 55.296249)   # Dubai
end = Point(25.285, 55.3)              # Nearby target

direction_vector = calculate_direction(start, end)
print(direction_vector)
# Example output: [0.7071, 0.7071] meaning 45° northeast direction
```
