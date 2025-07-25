---
title: results-drone-path
sidebar_position: 16
---

# results-drone-path

The `results-drone-path` component fetches and displays an image overview of all drone paths in the simulation. It provides a visual summary of drone movement and zone coverage.

## Summary

- Fetches a generated image of all drone paths from the backend.
- Shows loading, error, and retry states.
- Integrates with the simulation context for path and zone data.

![Drone path overview](https://ik.imagekit.io/devdocs/img/prism/drone_path_overview.png)

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Calls the backend to generate a path image based on current paths and zone.
- Handles loading, error, and retry logic.
- Displays the image or a placeholder if unavailable.

## Example: Fetching the Image

```tsx
const fetchDronePathImage = useCallback(async () => {
  const res = await axios.post("/api/drone-paths-image", { ... });
  setImageUrl(URL.createObjectURL(res.data));
}, [paths, drones, monitoringZone]);
```

## Where to Make Changes

- **Image generation**: Update backend endpoint or image format.
- **UI feedback**: Change loading or error states.

---

For further customization, see the code comments in `src/components/results-drone-path.tsx` and related context files.
