---
title: results-pertickbreakdown
sidebar_position: 17
---

# results-pertickbreakdown

The `results-pertickbreakdown` component visualizes the breakdown of processing times per tick using a stacked bar chart. It shows how each processing step contributes to the total time.

## Summary

- Renders a stacked bar chart for per-tick processing breakdown.
- Uses Recharts for visualization.
- Integrates with the simulation context for timing parameters.

![Per tick breakdown](https://ik.imagekit.io/devdocs/img/prism/per_tick_breakdown.png)

## Props

```tsx
export const PerTickBreakdownChart: React.FC<{ tickLog: TickLogEntry[] }>;
```

- `tickLog`: Array of tick log entries from the simulation

## Main Logic

- Prepares data for each processing step per tick.
- Renders a stacked bar chart using Recharts.
- Colors each bar segment by processing step.

## Example: Rendering the Bar Chart

```tsx
<BarChart data={data}>
  <Bar dataKey="t_detect" stackId="a" fill="#8884d8" />
  {/* ...other bars... */}
</BarChart>
```

## Where to Make Changes

- **Chart steps**: Add or remove processing steps.
- **Color scheme**: Update colors for each step.

---

For further customization, see the code comments in `src/components/results-pertickbreakdown.tsx` and related context files.
