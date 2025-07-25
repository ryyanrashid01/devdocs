---
title: results-charts
sidebar_position: 15
---

# results-charts

The `results-charts` component visualizes simulation processing times using line charts. It shows both total and per-drone processing times over simulation ticks.

## Summary

- Renders line charts for total and per-drone processing times.
- Uses Recharts for visualization.
- Maps drone IDs to labels for clarity.

![Total processing time](https://ik.imagekit.io/devdocs/img/prism/processing_time_graph.png)

---

![Per drone processing time](https://ik.imagekit.io/devdocs/img/prism/per_drone_processing_time.png)

## Props

```tsx
export const ResultsCharts = ({ tickLog, drones }: { tickLog: TickLogEntry[]; drones: { id: string; label: string }[] })
```

- `tickLog`: Array of tick log entries from the simulation
- `drones`: Array of drone objects with id and label

## Main Logic

- Prepares data for total and per-drone charts.
- Renders two line charts using Recharts.
- Assigns unique colors to each drone line.

## Example: Rendering a Line Chart

```tsx
<LineChart width={1200} height={500} data={totalProcessingData}>
  <Line
    type="monotone"
    dataKey="totalProcessingTime"
    stroke="#8884d8"
    dot={false}
  />
</LineChart>
```

## Where to Make Changes

- **Chart type**: Add new charts or change chart types.
- **Data mapping**: Update how data is prepared for visualization.

---

For further customization, see the code comments in `src/components/results-charts.tsx` and related context files.
