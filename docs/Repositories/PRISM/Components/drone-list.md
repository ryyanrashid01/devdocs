---
title: drone-list
sidebar_position: 3
---

# drone-list

The `drone-list` component displays all drones currently added to the simulation. It allows users to expand each drone for details, edit properties, and remove or toggle drones as active/inactive.

## Summary

- Lists all drones with key properties and status badges.
- Allows editing of drone name, status, and configuration.
- Integrates with the simulation context for state management.

<img src="https://ik.imagekit.io/devdocs/img/prism/drone_list_with_details.png" alt="drone list" width="300" />

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Maps over the `drones` array from context to render each drone as a card.
- Uses collapsible UI for detailed editing per drone.
- Allows toggling active status, editing name, and viewing configuration.
- Supports removal of drones from the list.

## Example: Editing a Drone

```tsx
<Input
  value={drone.label}
  onChange={(e) => updateDrone(drone.id, { label: e.target.value })}
  className="h-8"
/>
```

## Where to Make Changes

- **Drone display**: Update the card layout or badges for new properties.
- **Editing logic**: Add new editable fields or validation.
- **Removal logic**: Change how drones are removed or confirmed.

---

For further customization, see the code comments in `src/components/drone-list.tsx` and related context files.
