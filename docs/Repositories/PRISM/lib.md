---
title: Utility Functions
sidebar_position: 4
description: Documentation for utility and helper functions used in the drone simulation app.
---

# Utility Functions

This page describes the helper functions used throughout the drone simulation codebase. These utilities simplify class management, metadata handling, risk classification, string formatting, and other logic related to drone behavior and configuration.

---

### Class Name Composition with Tailwind

The `cn(...inputs)` utility combines class names using `clsx` and resolves conflicts using `tailwind-merge`. This is helpful when dynamically assigning Tailwind classes in JSX:

```ts
cn("p-2", condition && "bg-red-500");
```

---

### Getting the Default Metadata Key

The `getDefaultKey()` function scans a metadata object and returns the key associated with the default score (i.e., `score === 1.0`). This is commonly used to reset or initialize configurations:

```ts
const defaultKey = getDefaultKey(droneModifiers);
```

---

### Selecting a Key by Risk Level

To randomly select a key associated with a specific risk level (`low`, `medium`, or `high`), `getKeyByRiskLevel()` is used. If the desired level is not found, it defaults to the key with score 1.0:

```ts
const mediumRiskKey = getKeyByRiskLevel(droneModifiers, "medium");
```

---

### Flattening Metadata

Metadata objects are structured and nested. `flattenMetadata()` transforms these into a flat array of `{ key, label, risk }` entries, which simplifies mapping and display in components:

```ts
const flat = flattenMetadata(droneModifiers);
```

---

### Risk Classification

The `classifyRisk()` function maps a numeric score to a risk label (`low`, `medium`, or `high`) based on how it compares to metadata-defined thresholds:

```ts
const risk = classifyRisk(droneModifiers, 0.7);
```

---

### Capitalizing Strings

The utility `capitalizeFirstLetter()` ensures consistent formatting by converting the first character of any given string to uppercase:

```ts
capitalizeFirstLetter("example"); // "Example"
```

---

### Conflict Detection for Violations

The `isConflicting()` function checks if a new violation conflicts with already-selected ones. It ensures mutually exclusive constraints are respected. Special case: `TFLV01` ("no deviation") cannot be combined with any other:

```ts
isConflicting(["TFLV02"], "TFLV01");
```

---

### Finding the Closest Time Index

`findClosestIndex()` performs a binary search over a sorted array of time-stamped points to return the index nearest to a target time. Useful in animation or simulation playback:

```ts
const index = findClosestIndex(drone.path, currentTime);
```

---

### Mapping Risk Levels to Styles

The `getRiskColor()` function maps a risk level to Tailwind classes for styling elements:

```ts
<div className={getRiskColor("high")}>High Risk</div>
```

Mapping:

- `low` → Green
- `medium` → Yellow
- `high` → Red
- `custom` → Purple
- `default` → Blue

---

### Internal Imports

These utilities rely on constants, types, and helper libraries:

- `@/constants/threats`: Metadata like `FlightViolation`, mutual exclusions.
- `@/interfaces/preset-level`: Types such as `PresetLevel`.
- External: `clsx` and `tailwind-merge` for class merging.

---

> This file may be extended as new utilities are introduced.
