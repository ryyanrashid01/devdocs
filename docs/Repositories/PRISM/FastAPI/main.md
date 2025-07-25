---
sidebar_position: 1
---

# Main

This FastAPI application provides an API for generating and visualizing drone paths within a defined monitoring zone (MZ). It supports both standard and "rogue" path generation, as well as rendering path visuals.

---

## Dependencies

- `fastapi`
- `pydantic`
- `fastapi.middleware.cors.CORSMiddleware`
- `StreamingResponse`
- `helper` (custom module containing core logic like `generate_collision_free_paths`, `generate_rogue_path`, `plot_drone_paths_image`)

---

## API Overview

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| `GET`  | `/`                     | Health check                     |
| `POST` | `/generate_paths`       | Generate paths for drones        |
| `POST` | `/generate_rogue_paths` | Generate rogue paths for drones  |
| `POST` | `/drone-paths-image`    | Generate an image of drone paths |

---

## CORS Configuration

Allowed origins:

- `http://localhost:5173` – For local frontend development
- `https://prism.secure-utm.org` – For production frontend

---

## Data Models

### `Center`

```python
latitude: float
longitude: float
```

### `MZ` (Monitoring Zone)

```python
center: Center
radius: float  # in meters
```

### `RoguePathSegment`

```python
start: float
end: float
```

### `DroneConfig`

```python
speed: Literal["low", "high", "default"]
deviation: Literal["minor", "major", "none"]
tortuosity: float
rogue_path_segment: RoguePathSegment
```

### `PathRequest`

Used for requesting path generation.

```python
mz: MZ
drones: List[DroneConfig]
```

### `PointDict`

Represents a single drone path point.

```python
lat: float
lon: float
t: float
speed: float
```

### `RoguePathRequest`

Used for generating rogue paths.

```python
mz: MZ
drones: List[DroneConfig]
original_paths: List[List[PointDict]]
```

### `DronePath`

```python
label: str
path: List[PointDict]
```

### `DronePathsImageRequest`

Used for image rendering.

```python
paths: List[List[PointDict]]       # Original paths
dronePaths: List[DronePath]
monitoringZone: MZ
```

---

## Endpoints

### `GET /`

**Health check**

Returns a simple JSON response to confirm the API is operational.

#### Response

```json
{
  "status": "ok",
  "message": "API is up and running"
}
```

---

### `POST /generate_paths`

**Generates initial collision-free paths for multiple drones.**

#### Request Body: `PathRequest`

#### Response

```json
{
  "center": {"lat": float, "lon": float},
  "radius": float,
  "num_drones": int,
  "paths": List[List[PointDict]]
}
```

---

### `POST /generate_rogue_paths`

**Generates altered rogue paths for drones based on deviation and tortuosity.**

#### Request Body: `RoguePathRequest`

#### Response

```json
{
  "center": {"lat": float, "lon": float},
  "radius": float,
  "num_drones": int,
  "paths": List[List[PointDict]]
}
```

If the number of drones doesn't match the number of original paths, an error is returned.

---

### `POST /drone-paths-image`

**Generates a PNG image of the drone paths and monitoring zone.**

#### Request Body: `DronePathsImageRequest`

#### Response

Returns a PNG image as a `StreamingResponse`.

```http
Content-Type: image/png
```

---

## Helper Functions (from `helper.py`)

These are used internally:

- `generate_collision_free_paths(center, radius, drones)`
- `generate_rogue_path(orig_path, orig_speeds, mz_radius, center, curviness, deviation, start_frac, end_frac)`
- `plot_drone_paths_image(monitoring_zone, original_paths, drone_paths)`

---

## Development Tips

- To run locally:

  ```bash
  uvicorn main:app --reload
  ```

- Ensure your frontend (on port `5173`) is allowed by CORS when testing locally.
