---
title: drone-control
sidebar_position: 6
---

# drone-control

The `drone-control` component provides the map drawing controls for defining the monitoring zone. It integrates with Leaflet and Leaflet Draw to allow users to draw a circular zone on the map.

## Summary

- Adds drawing controls to the map for creating a monitoring zone.
- Updates simulation context with the zone's coordinates and radius.
- Handles zone creation and deletion events.

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Adds a Leaflet Draw control to the map for drawing circles.
- On circle creation, updates the monitoring zone in context.
- On deletion, clears the monitoring zone.

## Example: Handling Draw Events

```tsx
const handleDrawCreated = (e: L.DrawEvents.Created) => {
  if (layerType === "circle") {
    // ...
    setMonitoringZone({ x: center.lat, y: center.lng, radius });
  }
};
```

## Where to Make Changes

- **Drawing logic**: Add support for new shapes or validation.
- **Zone state**: Change how the monitoring zone is stored or updated.

---

For further customization, see the code comments in `src/components/drone-control.tsx` and related context files.
