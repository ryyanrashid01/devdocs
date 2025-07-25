---
title: sim-form
sidebar_position: 10
---

# sim-form

The `sim-form` component is a wizard for configuring the simulation. It organizes the setup into monitoring zone, drone configuration, and time parameters.

## Summary

- Guides the user through all simulation setup steps.
- Uses collapsible cards for each section.
- Integrates with MzForm, DroneForm, and TimeForm.

<img src="https://ik.imagekit.io/devdocs/img/prism/sim_form.gif" alt="sim form" width="300" />

## Props

This component does not take explicit props; it uses local state and context.

## Main Logic

- Manages open/close state for each setup section.
- Passes refs to allow scrolling between sections.
- Enables/disables sections based on completion of previous steps.

## Example: Section Navigation

```tsx
<CollapsibleCard ...>
  <MzForm ... />
</CollapsibleCard>
<CollapsibleCard ...>
  <DroneForm ... />
</CollapsibleCard>
<CollapsibleCard ...>
  <TimeForm ... />
</CollapsibleCard>
```

## Where to Make Changes

- **Section order**: Add or remove setup steps.
- **Validation**: Change how completion is determined.

---

For further customization, see the code comments in `src/components/sim-form.tsx` and related context files.
