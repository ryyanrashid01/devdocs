---
id: interfaces-and-types
title: Interfaces and Types
sidebar_position: 3
---

This page provides an overview of the core interfaces and type definitions used throughout the PRISM simulation application. These are grouped by category for clarity.

## DroneContextType

```tsx
interface DroneContextType {
  drones: Drone[];
  config: SimulationConfig;
  monitoringZone: MonitoringZone | null;
  isSimulationRunning: "stopped" | "running" | "finished";
  initialized: Boolean;
  setInitialized: Dispatch<SetStateAction<Boolean>>;
  addMultipleDrones(
    count: number,
    riskLevel: PresetLevel | "custom",
    pathTortuosity: number[]
  ): void;
  updateDrone(id: string, updates: Partial<Drone>): void;
  removeDrone(id: string): void;
  updateDroneConfig(updates: Partial<SimulationConfig["drone"]>): void;
  updateMzConfig(updates: Partial<SimulationConfig["mz"]>): void;
  setMonitoringZone(zone: MonitoringZone | null): void;
  startSimulation(): void;
  stopSimulation(): void;
  finishSimulation(): void;
  resetSimulation(): void;
  applyDronePreset(level: PresetLevel): void;
  applyZonePreset(level: PresetLevel): void;
  drawnItemsRef: React.RefObject<FeatureGroup<any> | null>;
  animationRef: React.RefObject<number | null>;
  paths: Path[][];
  setPaths: Dispatch<SetStateAction<Path[][]>>;
  timeParameters: TimeParameters;
  updateTimeParameter(updates: Partial<TimeParameters>): void;
  tickLogRef: React.RefObject<TickLogEntry[]>;
}
```

## Drone

```tsx
interface Drone {
  id: string;
  label: string;
  operatorId: string;
  ridIntegrity: RemoteIdIntegrityFlag;
  regError: RegistrationError;
  missionAuth: MissionAuthStatus;
  flightViolation: FlightViolation[];
  operationalCategory: DroneOperation;
  airFrame: AirFrame;
  emergencyStatus: EmergencyStatus;
  weightClass: WeightClass;
  active: boolean;
  riskLevel: PresetLevel | "custom";
  path: Path[];
  rogue: boolean;
  roguePath: { start: number; end: number };
  pathTortuosity: number;
}
```

## Path

```tsx
interface Path {
  lat: number;
  lon: number;
  t: number;
  speed: number;
}
```

## MonitoringZone

```tsx
interface MonitoringZone {
  x: number;
  y: number;
  radius: number;
}
```

## SimulationConfig

```tsx
interface SimulationConfig {
  drone: {
    ridFlag: RemoteIdIntegrityFlag;
    regStat: RegistrationError;
    missionStat: MissionAuthStatus;
    flightViolation: FlightViolation[];
    operationType: DroneOperation;
    airFrame: AirFrame;
    emergency: EmergencyStatus;
    weight: WeightClass;
    presetLevel: PresetLevel;
    pathTortuosity: number;
  };
  mz: {
    operationTime: OperationTimeSlot;
    weather: WeatherStatus;
    areaType: ZoneType;
    humanPresence: HumanPresenceType;
    presetLevel: PresetLevel;
  };
}
```

## TimeParameters

```tsx
interface TimeParameters {
  t_tick: number;
  t_detect: number;
  t_rid: number;
  t_auth: number;
  t_reg: number;
  t_authz: number;
  t_modifiers: number;
  t_impact: number;
  t_compute: number;
  parallel: boolean;
}
```

## TickLogEntry

```tsx
interface TickLogEntry {
  tick: number;
  drones: {
    [droneId: string]: DroneTickMetrics;
  };
  totalProcessingTime: number;
}
```

## DroneTickMetrics

```tsx
interface DroneTickMetrics {
  totalTime: number;
  perStep: Partial<Record<keyof TimeParameters, number>>;
  firstTick: boolean;
  riskLevel: "low" | "medium" | "high" | "default" | "custom";
}
```

## PresetLevel

```tsx
type PresetLevel = "low" | "medium" | "high" | "default";
```

## Notes

External enums like `RemoteIdIntegrityFlag`, `DroneOperation`, and `WeatherStatus` are defined in `/constants/`.

All time-based logic depends on TimeParameters and is used in `tickLogRef`.
