---
title: results-processingtimechart
sidebar_position: 17
---

# results-processingtimechart

The `results-processingtimechart` component visualizes the total processing time per tick during the simulation. It uses `recharts` to render a live-updating line chart from tick log data.

## Summary

- Uses `recharts` to display a line chart of total processing time over time.
- Pulls data from the shared drone context (`tickLogRef`).
- Supports both live-updating and static (snapshot) modes.
- Provides clear X/Y axis labels and chart styling using ShadCN's `Card` component.

<img src="https://ik.imagekit.io/devdocs/img/prism/timeprocessing_chart_live.png" alt="Time processing chart" width="400" />

## Props

| Prop | Type    | Default | Description                                                     |
| ---- | ------- | ------- | --------------------------------------------------------------- |
| live | boolean | `true`  | Whether the chart should update live based on tick log changes. |

## Main Logic

- Accesses the `tickLogRef` from the drone context.
- If `live` is `false`, it loads the current snapshot of the tick log.
- If `live` is `true`, it sets up a polling interval (every 500ms) to detect changes in the tick log.
- On each update, it transforms the tick data into a format suitable for `recharts`, converting ticks from milliseconds to seconds.

## Example: Converting Tick Log Data

```tsx
const totalProcessingData = useMemo(() => {
  return tickLog.map(({ tick, totalProcessingTime }) => ({
    tick: Math.round(tick / 1000), // convert ms to s
    totalProcessingTime,
  }));
}, [tickLog]);
```
