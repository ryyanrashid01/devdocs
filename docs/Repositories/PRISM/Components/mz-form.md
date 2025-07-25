---
title: mz-form
sidebar_position: 11
---

# mz-form

The `mz-form` component provides the UI for configuring the monitoring zone. It allows users to select risk presets, set modifiers, and customize zone parameters.

## Summary

- Lets users select risk presets or customize zone configuration.
- Supports selection of operation time, weather, human presence, and zone type.
- Integrates with the simulation context for state management.

<img src="https://ik.imagekit.io/devdocs/img/prism/mz_form.png" alt="mz config form" width="300"/>

## Props

```tsx
export function MzForm({
  isCustom,
  setIsCustom,
  setOpen,
  setMzConfigSelected,
  scrollToRef,
}: { ... })
```

- `isCustom`: Whether the form is in custom mode.
- `setIsCustom`: Setter for custom mode.
- `setOpen`: Controls form visibility.
- `setMzConfigSelected`: Optional, signals when config is selected.
- `scrollToRef`: Optional, for scrolling to next section.

## Main Logic

- Uses context to update zone config and apply presets.
- Handles risk preset selection and modifier changes.
- Shows validation and feedback via toasts.

## Example: Changing a Modifier

```tsx
<Select
  value={config.mz.operationTime}
  onValueChange={(value) => updateMzConfig({ operationTime: value })}
>
  {/* ... */}
</Select>
```

## Where to Make Changes

- **Zone config logic**: Update how presets or custom values are handled.
- **Modifiers**: Add new modifiers or validation.

---

For further customization, see the code comments in `src/components/mz-form.tsx` and related context files.
