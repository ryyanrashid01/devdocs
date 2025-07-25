---
title: results-table
sidebar_position: 14
---

# results-table

The `results-table` component displays a per-tick summary table of simulation results, including processing times and risk levels for each drone. It also allows exporting the results as CSV.

## Summary

- Renders a table of tick-by-tick simulation results.
- Shows total processing time and risk level for each drone per tick.
- Allows downloading the results as a CSV file.

![Table per tick](https://ik.imagekit.io/devdocs/img/prism/per_tick_table.png)

## Props

```tsx
export const ResultsTable = ({ tickLog, drones }: { tickLog: TickLogEntry[]; drones: { id: string; label: string }[] })
```

- `tickLog`: Array of tick log entries from the simulation
- `drones`: Array of drone objects with id and label

## Main Logic

- Maps over the tick log to render each row.
- Uses drone IDs to map results to labels.
- Provides a button to download the table as CSV.

## Example: Downloading CSV

```tsx
<Button size="sm" variant="default" onClick={downloadCSV}>
  <DownloadCloud />
  Download CSV
</Button>
```

## Where to Make Changes

- **Table columns**: Add or remove columns for new data.
- **Export logic**: Change CSV formatting or add new export options.

---

For further customization, see the code comments in `src/components/results-table.tsx` and related context files.
