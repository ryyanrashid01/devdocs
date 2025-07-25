---
sidebar_postion: 2
---

# `latlon_to_xy_meters`

This function converts geographic coordinates (latitude and longitude) into **local Cartesian coordinates** (x, y) in meters relative to a central reference point.

---

## Function Signature

```python
def latlon_to_xy_meters(center_lat, center_lon, lat, lon):
```

### Parameters

| Name         | Type  | Description                                        |
| ------------ | ----- | -------------------------------------------------- |
| `center_lat` | float | Latitude of the reference center point (degrees).  |
| `center_lon` | float | Longitude of the reference center point (degrees). |
| `lat`        | float | Latitude of the point to convert (degrees).        |
| `lon`        | float | Longitude of the point to convert (degrees).       |

---

## Purpose

- Converts the difference between a point (`lat`, `lon`) and a center reference (`center_lat`, `center_lon`) from degrees into approximate distances **in meters** along the east-west (x) and north-south (y) axes.
- Useful for planar calculations when working with geographic data on a small scale, where Earth curvature can be approximated.

---

## How It Works

### Step 1: Define Conversion Constants

```python
meter_per_deg_lat = 111320
```

- Approximately **111,320 meters per degree of latitude**, nearly constant globally because degrees of latitude correspond roughly to fixed distances north-south.

```python
meter_per_deg_lon = 40075000 * np.cos(np.radians(center_lat)) / 360
```

- Calculates meters per degree of longitude at the given latitude:

  - Earth's circumference ≈ 40,075,000 meters.
  - At the equator, 1° longitude ≈ 111,320 meters (same as latitude).
  - Multiplied by cosine of latitude to adjust for shrinking longitude distance as you move away from the equator.

---

### Step 2: Calculate Local X and Y Distances (meters)

```python
x = (lon - center_lon) * meter_per_deg_lon
y = (lat - center_lat) * meter_per_deg_lat
```

- `x`: East-west distance from center (meters).
- `y`: North-south distance from center (meters).

---

## Returns

- A tuple `(x, y)` representing the approximate planar coordinates in meters relative to the reference point.

---

## Example Usage

```python
center_lat, center_lon = 25.276987, 55.296249  # Reference point (Dubai)
lat, lon = 25.285, 55.3                        # Nearby point

x, y = latlon_to_xy_meters(center_lat, center_lon, lat, lon)
print(f"x: {x:.1f} meters, y: {y:.1f} meters")
# Example output: x: 414.0 meters, y: 901.0 meters
```

---

## Notes

- This method assumes a **local flat-earth approximation**, valid for small distances (a few kilometers).
- For longer distances or high precision, consider using geodesic calculations.
