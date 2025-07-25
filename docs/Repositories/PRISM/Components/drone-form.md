---
title: drone-form
sidebar_position: 2
---

# drone-form

The `drone-form` component provides the UI and logic for configuring individual drones or adding multiple drones at once. It allows users to select risk levels, set threats, and customize drone parameters.

## Summary

- Lets users select risk presets or customize drone configuration.
- Supports bulk addition of drones with custom or preset parameters.
- Integrates with the simulation context for state management.

<img src="https://ik.imagekit.io/devdocs/img/prism/drone_config_form.png" alt="drone config form" width="300"/>

## Props

```tsx
export function DroneForm({
  isCustom,
  setIsCustom,
  setOpen,
  setDronesConfigSelected,
  scrollToRef,
}: { ... })
```

- `isCustom`: Whether the form is in custom mode.
- `setIsCustom`: Setter for custom mode.
- `setOpen`: Controls form visibility.
- `setDronesConfigSelected`: Optional, signals when config is selected.
- `scrollToRef`: Optional, for scrolling to next section.

## Main Logic

- Uses context to update drone config and add drones.
- Handles risk preset selection and custom threat toggling.
- Supports random or fixed path tortuosity for bulk drones.
- Shows validation and feedback via toasts.

## Example: Adding Bulk Drones

```tsx
const handleAddBulkDrones = () => {
  if (selected.length === 0) {
    toast.error("Please select a flight violation");
    return;
  }
  // ...
  addMultipleDrones(bulkCount, riskPreset, pathTortuosityVals);
  toast.success(`${bulkCount} drones added`);
};
```

## Where to Make Changes

- **Drone config logic**: Update how presets or custom values are handled.
- **Threats/violations**: Add new threat types or validation.
- **Bulk logic**: Change how multiple drones are created.

---

For further customization, see the code comments in `src/components/drone-form.tsx` and related context files.
