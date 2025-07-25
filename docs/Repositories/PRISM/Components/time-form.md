---
title: time-form
sidebar_position: 12
---

# time-form

The `time-form` component provides the UI for configuring simulation timing parameters. It allows users to set tick duration, detection time, and other timing values.

## Summary

- Lets users set all timing parameters for the simulation.
- Integrates with the simulation context for state management.
- Provides tooltips and validation for each parameter.

<img src="https://ik.imagekit.io/devdocs/img/prism/time_form.png" alt="time-form" width="300" />

## Props

```tsx
export default function TimeForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
});
```

- `setOpen`: Controls form visibility.

## Main Logic

- Uses context to update timing parameters.
- Provides input fields for each timing value.
- Shows tooltips for parameter explanations.

## Example: Updating a Parameter

```tsx
<Input
  value={timeParameters.t_tick}
  onChange={(e) => updateTimeParameter({ t_tick: Number(e.target.value) })}
/>
```

## Where to Make Changes

- **Timing logic**: Add new timing parameters or validation.
- **Tooltips**: Update explanations for each parameter.

---

For further customization, see the code comments in `src/components/time-form.tsx` and related context files.
