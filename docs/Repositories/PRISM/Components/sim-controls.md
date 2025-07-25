---
title: sim-controls
sidebar_position: 9
---

# sim-controls

The `sim-controls` component provides the main controls for starting, stopping, and resetting the simulation. It also shows the simulation running status.

## Summary

- Provides buttons to start, stop, reset, and view results.
- Shows simulation running status and feedback.
- Integrates with the simulation context for state management.

<img src="https://ik.imagekit.io/devdocs/img/prism/sim_controls.png" alt="sim-controls" width="300" />

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Shows different buttons based on simulation state (stopped, running, finished).
- Disables start if no drones or not initialized.
- Shows a badge and message when simulation is running.

## Example: Control Buttons

```tsx
{
  isSimulationRunning === "stopped" ? (
    <Button onClick={startSimulation}>Start</Button>
  ) : isSimulationRunning === "running" ? (
    <Button onClick={stopSimulation}>Stop</Button>
  ) : (
    <Button onClick={() => navigate("/results")}>Show results</Button>
  );
}
<Button onClick={resetSimulation}>Reset</Button>;
```

## Where to Make Changes

- **Button logic**: Add new actions or change state transitions.
- **Status feedback**: Update running status or messages.

---

For further customization, see the code comments in `src/components/sim-controls.tsx` and related context files.
