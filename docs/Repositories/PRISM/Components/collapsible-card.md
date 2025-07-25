---
title: collapsible-card
sidebar_position: 13
---

# collapsible-card

The `collapsible-card` component provides an expandable card UI for forms and setup sections. It is used throughout the simulation setup wizard.

## Summary

- Renders a card that can be expanded or collapsed.
- Used for each section in the simulation setup wizard.
- Supports custom icons, colors, and disabled state.

## Props

```tsx
export function CollapsibleCard({
  title,
  icon,
  cardColor,
  children,
  open,
  setOpen,
  disabled = false,
}: { ... })
```

- `title`: Card title
- `icon`: Optional icon for the card
- `cardColor`: Optional color class
- `children`: Card content
- `open`: Whether the card is expanded
- `setOpen`: Setter for open state
- `disabled`: Whether the card is disabled

## Main Logic

- Renders a card with a clickable header to toggle open/close.
- Animates expansion/collapse using Framer Motion.
- Shows content only when expanded.

## Example: Usage in Setup Wizard

```tsx
<CollapsibleCard
  title="Configure drones"
  icon={<DroneIcon />}
  open={droneFormOpen}
  setOpen={setDroneFormOpen}
>
  <DroneForm ... />
</CollapsibleCard>
```

## Where to Make Changes

- **Animation**: Update Framer Motion settings for different effects.
- **Props**: Add new props for more customization.

## Screenshots & Diagrams

1. Closed
   <img src="https://ik.imagekit.io/devdocs/img/prism/collapsible_card_closed.png" alt="collapsible card closed" width="300"/>

2. Open
   <img src="https://ik.imagekit.io/devdocs/img/prism/collapsible_card_open.png" alt="collapsible card open" width="300"/>

---

For further customization, see the code comments in `src/components/collapsible-card.tsx` and related context files.
