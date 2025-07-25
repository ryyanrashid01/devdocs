---
title: mz-map
sidebar_position: 7
---

# mz-map

The `mz-map` component is the main map container for the simulation. It integrates the map display, drawing controls, and the drone simulation canvas.

## Summary

- Renders the map using React Leaflet.
- Integrates the DrawControl for monitoring zone selection.
- Overlays the DroneCanvas for simulation rendering.
- Passes the current drones from context to the canvas.

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Sets up the map with a default center and zoom.
- Loads the tile layer using an API key from environment variables.
- Adds the DrawControl for zone selection.
- Adds the DroneCanvas for simulation rendering.

## Example: Map Setup

```tsx
<MapContainer
  center={[24.4539, 54.3773]}
  zoom={15}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer url={...} />
  <DrawControl />
  <DroneCanvas drones={drones} />
</MapContainer>
```

## Where to Make Changes

- **Map provider**: Change the tile layer or map provider.
- **Canvas logic**: Update how the DroneCanvas is integrated.
- **Drawing controls**: Add or remove map controls as needed.

## Screenshots & Diagrams

![Monitoring zone with drones](https://ik.imagekit.io/devdocs/img/prism/deviation_drone_sim.png)

---

For further customization, see the code comments in `src/components/mz-map.tsx` and related context files.
