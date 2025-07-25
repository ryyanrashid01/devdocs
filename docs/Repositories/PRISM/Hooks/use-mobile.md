---
title: use-mobile
sidebar_position: 1
---

# use-mobile

The `use-mobile` hook provides a reactive way to determine whether the current viewport width falls below a mobile breakpoint.

## Summary

- Checks if the screen width is less than `768px` (mobile threshold).
- Uses `matchMedia` and a `resize` listener for real-time updates.
- Returns a boolean indicating if the device is considered mobile.

## Return Value

| Value    | Type    | Description                                 |
| -------- | ------- | ------------------------------------------- |
| isMobile | boolean | `true` if width < 768px, otherwise `false`. |

## Main Logic

- Defines a breakpoint (`768px`) as the cutoff for mobile screens.
- Sets up a media query listener on mount using `window.matchMedia`.
- Updates internal state whenever the screen size crosses the threshold.
- Defaults to `false` until client-side mount completes.

## Example: Using the Hook

```tsx
const isMobile = useIsMobile();

return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>;
```
