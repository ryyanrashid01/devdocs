---
title: Presets
sidebar_position: 5
---

The `presets.ts` file in `src/lib/` defines all preset configurations used in the simulation. These configurations act as templates that predefine both drone and monitoring zone (MZ) parameters based on the selected risk level or operational scenario.

This file ensures consistency across the app when setting up simulations, and it serves as a single source of truth for default behaviors.

---

### Summary

- Provides risk-based presets (`default`, `low`, `medium`, `high`) for simulation setup.
- Defines how drones and MZs are configured under each risk profile.
- Central location to adjust default behavior, add new presets, or tune simulation logic.
- Exports timing defaults that affect simulation cadence and processing behavior.

---

### Main Exports

- **`PresetConfigs`**: An object containing all named presets.

  - Each preset includes structured definitions for drone and MZ configuration.
  - Keys correspond to different risk levels (`default`, `low`, `medium`, `high`).

- **`timeParametersDefault`**: A `TimeParameters` object containing default timing values for each simulation phase.

---

### Example: Using a Preset

```ts
import { PresetConfigs } from "@/lib/presets";
const defaultConfig = PresetConfigs.default;
```

This will return the full configuration object for the `default` preset, which includes:

- Drone metadata flags (e.g., registration status, RID integrity)
- Monitoring zone properties (e.g., human presence, weather)
- Default risk values per metadata key

---

### Preset Structure

Each entry in `PresetConfigs` has the following structure:

```ts
{
  drone: {
    ridFlag,
    regStat,
    missionStat,
    flightViolation,
    operationType,
    airFrame,
    emergency,
    weight,
    pathTortuosity,
    presetLevel
  },
  mz: {
    operationTime,
    weather,
    areaType,
    humanPresence,
    presetLevel
  }
}
```

- The `drone` and `mz` fields are populated using constants (e.g., `RemoteIdIntegrityMetadata`) and helper functions like `getKeyByRiskLevel()`.
- `pathTortuosity` is randomized in each preset instance for diversity in drone behavior.
- `presetLevel` is stored in both the drone and mz objects to track the origin of the config.

---

### Adding a New Preset

To define a custom risk level or scenario:

1. Add a new key to `PresetConfigs`:

```ts
PresetConfigs.ultra = {
  drone: {
    ridFlag: ..., // Set manually or use getKeyByRiskLevel(..., 'ultra')
    ...
  },
  mz: {
    operationTime: ...,
    ...
  }
};
```

2. (Optional) Update your forms or context providers to include `ultra` as a selectable option.
3. Tune values manually or follow the structure of existing presets.

---

### Timing Configuration

The `timeParametersDefault` object defines how long each stage of the drone processing pipeline takes:

```ts
{
  t_tick: 1000,
  t_detect: 650,
  t_rid: 1000,
  t_auth: 300,
  t_reg: 300,
  t_authz: 300,
  t_modifiers: 200,
  t_impact: 100,
  t_compute: 150,
  parallel: true,
}
```

- These durations (in ms) are used to simulate delays across the pipeline.
- The `parallel` flag determines whether stages are evaluated concurrently (like resistors in parallel).
- You can override this object per simulation by creating a copy and adjusting values dynamically.

---

### Extension Points

- Add new preset names and profiles to `PresetConfigs`.
- Create specialized presets for experiments (e.g., heavy weather impact or RID-failure scenarios).
- Adjust `timeParametersDefault` for performance or realism testing.
- Combine with utility functions to randomize or batch-generate presets.

---

### Related Files

- `src/constants/threats.ts`: Contains threat metadata like Remote ID, registration, flight violations.
- `src/constants/modifiers.ts`: Contains operational modifiers like weather, time slot, weight class.
- `src/constants/impact.ts`: Contains zone impact metadata like human presence and zone type.
- `src/interfaces/`: Defines types for `SimulationConfig`, `TimeParameters`, and `PresetLevel`.
- `src/lib/utils.ts`: Provides helper functions like `getKeyByRiskLevel()` and `getDefaultKey()`.

---

For further customization, see the code comments in `src/lib/presets.ts` and how they're consumed in context providers or forms.
