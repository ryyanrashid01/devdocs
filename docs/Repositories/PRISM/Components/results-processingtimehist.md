---
title: results-processingtimehist
sidebar_position: 18
---

# results-processingtimehist

The `results-processingtimehist` component visualizes the total processing time for each drone using a histogram. It provides a quick comparison of drone workloads.

## Summary

- Renders a histogram of total processing time per drone.
- Uses Recharts for visualization.
- Integrates with the simulation context for tick log and drone data.

![Processing time histogram](https://ik.imagekit.io/devdocs/img/prism/per_drone_hist.png)

## Props

```tsx
export const ProcessingTimeHistogram: React.FC<{
  tickLog: TickLogEntry[];
  drones: { id: string; label: string }[];
}>;
```

- `tickLog`: Array of tick log entries from the simulation
- `drones`: Array of drone objects with id and label

## Main Logic

- Sums total processing time for each drone across all ticks.
- Renders a bar chart using Recharts.
- Formats tooltips for clarity.

## Example: Rendering the Histogram

```tsx
<BarChart data={data}>
  <Bar dataKey="totalTimeSec" fill="#8884d8" />
</BarChart>
```

## Where to Make Changes

- **Chart type**: Change to another chart type or add new metrics.
- **Tooltip formatting**: Update how tooltips display time.

---

For further customization, see the code comments in `src/components/results-processingtimehist.tsx` and related context files.
