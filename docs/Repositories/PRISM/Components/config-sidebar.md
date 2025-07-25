---
title: config-sidebar
sidebar_position: 8
---

# config-sidebar

The `config-sidebar` component is the main sidebar for simulation configuration. It organizes the simulation setup, active drones, and controls in a scrollable layout.

## Summary

- Provides a sidebar layout for all simulation configuration steps.
- Includes the SimForm, ActiveDrones, and real-time charts.
- Shows simulation controls at the bottom.

## Props

This component does not take explicit props; it uses the drone context for state.

## Main Logic

- Renders the sidebar with a header, content, and footer.
- Shows the SimForm when simulation is stopped.
- Always shows ActiveDrones and simulation controls.
- Shows real-time charts when simulation is running.

## Example: Sidebar Layout

```tsx
<Sidebar>
  <SidebarHeader>...</SidebarHeader>
  <SidebarContent>...</SidebarContent>
  <SidebarFooter>...</SidebarFooter>
</Sidebar>
```

## Where to Make Changes

- **Sidebar content**: Add or remove configuration steps.
- **Charts**: Change which charts are shown during simulation.
- **Controls**: Update simulation controls or layout.

---

For further customization, see the code comments in `src/components/config-sidebar.tsx` and related context files.
