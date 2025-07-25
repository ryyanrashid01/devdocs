---
sidebar_postion: 12
---

# `plot_drone_paths_image` Function

This function plots the drone paths along with the monitoring zone on a geographic coordinate system and returns the plot as an image buffer.

---

## Function Signature

```python
def plot_drone_paths_image(monitoring_zone, original_paths, drone_paths):
```

### Parameters

| Name              | Type                      | Description                                                           |
| ----------------- | ------------------------- | --------------------------------------------------------------------- |
| `monitoring_zone` | Object                    | An object with `center` (latitude, longitude) and `radius` in meters. |
| `original_paths`  | List\[List\[PointDict\]\] | Original flight paths (lists of points with lat/lon).                 |
| `drone_paths`     | List\[DronePath\]         | Paths flown by drones, including labels and points.                   |

---

## Workflow & Key Steps

### 1\. **Setup Plot and Extract Zone Info**

```python
fig, ax = plt.subplots(figsize=(8, 8))
center_lat = monitoring_zone.center.latitude
center_lon = monitoring_zone.center.longitude
radius_m = monitoring_zone.radius
```

- Create an 8x8 inch matplotlib figure and axis.
- Extract center coordinates and radius of the monitoring zone.

---

### 2\. **Convert Radius from Meters to Degrees**

```python
radius_lat_deg = radius_m / 111_000  # Latitude degrees per meter
radius_lon_deg = radius_m / (111_000 * math.cos(math.radians(center_lat)))  # Longitude degrees per meter (corrected for latitude)
```

- Latitude degrees per meter is roughly constant (~111 km per degree).
- Longitude degrees per meter vary with latitude (cosine factor applied).

---

### 3\. **Plot Monitoring Zone Circle**

```python
circle = Circle(
    (center_lon, center_lat),
    radius_lon_deg,
    color='blue',
    alpha=0.1,
    label='Monitoring Zone',
)
ax.add_patch(circle)
```

- Draw a semi-transparent blue circle representing the monitoring zone.
- Circle is centered on the monitoring zone center, radius converted to degrees longitude.

---

### 4\. **Plot Zone Center**

```python
ax.plot(
    [center_lon],
    [center_lat],
    marker='o',
    color='red',
    markersize=5,
    label='Zone Center'
)
```

- Mark the zone center with a red dot.

---

### 5\. **Helper Function to Extract Coordinates**

```python
def extract_coords(path):
    return ([p.lon for p in path], [p.lat for p in path])
```

- Extracts longitude and latitude lists from a given path.

---

### 6\. **Plot Drone Paths**

```python
for idx, drone in enumerate(drone_paths):
    drone_path = drone.path
    original_path = original_paths[idx] if idx < len(original_paths) else []

    paths_differ = len(original_path) != len(drone_path) or any(
        abs(p1.lat - p2.lat) > 1e-7 or abs(p1.lon - p2.lon) > 1e-7
        for p1, p2 in zip(original_path, drone_path)
    )

    if paths_differ and original_path:
        ox, oy = extract_coords(original_path)
        ax.plot(
            ox,
            oy,
            linestyle='dotted',
            color=f"C{idx}",
            label=f"{drone.label} Original Path",
            alpha=0.7,
        )

    if drone_path:
        rx, ry = extract_coords(drone_path)
        ax.plot(
            rx,
            ry,
            linestyle='solid',
            color=f"C{idx}",
            label=f"{drone.label} Drone Path" if paths_differ else f"{drone.label} Path",
            alpha=0.9,
        )
```

- For each drone, checks if the drone path differs significantly from the original.
- If so, plots original path as a dotted line and drone path as a solid line.
- If not, only the drone path is plotted.
- Each drone uses a different matplotlib color cycle (`C{idx}`).

---

### 7\. **Configure Plot Limits, Labels, and Legend**

```python
ax.set_xlim(center_lon - 1.5 * radius_lon_deg, center_lon + 1.5 * radius_lon_deg)
ax.set_ylim(center_lat - 1.5 * radius_lat_deg, center_lat + 1.5 * radius_lat_deg)

ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')
ax.set_title('Drone Paths and Monitoring Zone')
ax.set_aspect('equal', adjustable='box')
ax.legend()
plt.tight_layout()
```

- Sets x/y limits to comfortably include the monitoring zone plus some margin.
- Adds axis labels, title, legend, and equal aspect ratio.

---

### 8\. **Save Plot to Bytes Buffer**

```python
buf = io.BytesIO()
plt.savefig(buf, format='png')
plt.close(fig)
buf.seek(0)
return buf
```

- Saves the figure to an in-memory bytes buffer as PNG.
- Closes the plot to free memory.
- Returns the buffer for use (e.g., to send as an HTTP response).

---

## Summary

This function creates a geographic plot of drone flight paths relative to a monitoring zone, including both original planned paths and actual flown paths, and outputs the plot image in memory.
