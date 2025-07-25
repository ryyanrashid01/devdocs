---
title: active-drones
sidebar_position: 4
---

# active-drones

The `active-drones` component manages the initialization and display of all drones currently active in the simulation. It handles path generation, rogue drone logic, and readiness state for simulation start.

## Summary

- Displays the list of active drones and their readiness state.
- Handles initialization of drone paths (including rogue paths).
- Integrates with the simulation context and backend API for path generation.

<img src="https://ik.imagekit.io/devdocs/img/prism/active_drones.png" alt="Active Drones" height="500" />

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Calls backend API to generate paths for all drones.
- Handles both normal and rogue drone path generation.
- Updates drone state and readiness for simulation.
- Shows loading and error states via toasts.

## Example: Initializing Drones

```tsx
const handleInitialize = () => {
  // ...
  const res = await axios.post("/api/generate_paths", { ... });
  setPaths(res.data.paths);
  // ...
};
```

## Where to Make Changes

- **Path generation**: Update API endpoints or path logic.
- **Rogue logic**: Change how rogue drones are handled.
- **UI feedback**: Customize loading, error, or success states.

## Screenshots & Diagrams

![Generating Paths](https://ik.imagekit.io/devdocs/img/prism/generating_paths.png)

---

For further customization, see the code comments in `src/components/active-drones.tsx` and related context files.
