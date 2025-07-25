---
title: Modifiers
sidebar_position: 2
---

# Drone and Environment Metadata Types

This file defines TypeScript types and metadata constants for drone operations, airframe types, emergency statuses, weight classes, operation time slots, and weather conditions used in the drone simulation app. Each metadata entry includes a human-readable label and a numeric risk score to support risk assessments.

---

### Drone Operation Types

Defines categories of drone operations with associated risk scores:

| Code   | Label        | Score |
| ------ | ------------ | ----- |
| MDOP01 | government   | 0.5   |
| MDOP02 | commercial   | 1.0   |
| MDOP03 | research     | 1.08  |
| MDOP04 | recreational | 1.5   |

- Lower scores imply lower risk.
- Used to represent the nature of the drone’s mission.

---

### Airframe Types

Specifies drone airframe categories and their risk weights:

| Code   | Label      | Score |
| ------ | ---------- | ----- |
| MAFM01 | VTOL       | 1.0   |
| MAFM02 | fixed-wing | 1.4   |

- VTOL (vertical takeoff and landing) considered less risky than fixed-wing.
- Important for flight dynamics and impact assessment.

---

### Emergency Status

Indicates whether the drone is currently in an emergency state:

| Code   | Label         | Score |
| ------ | ------------- | ----- |
| MEGS01 | emergency     | 0.5   |
| MEGS02 | non-emergency | 1.0   |

- Emergency status affects prioritization in the simulation.

---

### Weight Classes

Classifies drones by weight categories with corresponding risk scores:

| Code   | Label         | Score |
| ------ | ------------- | ----- |
| MWTC01 | very light    | 0.48  |
| MWTC02 | low weight    | 0.75  |
| MWTC03 | medium weight | 1.0   |
| MWTC04 | heavy weight  | 1.83  |

- Heavier drones typically pose higher risks.

---

### Operation Time Slots

Time periods during which drone operations occur, reflecting potential risk variations:

| Code   | Label                           | Score |
| ------ | ------------------------------- | ----- |
| MOTS01 | 00:00 - 05:00 (weekday)         | 1.0   |
| MOTS02 | 05:00 - 08:00 (weekday)         | 1.37  |
| MOTS03 | 08:00 - 16:00 (weekday)         | 1.52  |
| MOTS04 | 16:00 - 20:00 (weekday)         | 1.67  |
| MOTS05 | 20:00 - 23:00 (weekday)         | 1.37  |
| MOTS06 | 00:00 - 08:00 (weekend/holiday) | 1.0   |
| MOTS07 | 08:00 - 20:00 (weekend/holiday) | 1.4   |
| MOTS08 | 20:00 - 00:00 (weekend/holiday) | 1.53  |

- Time slots are split into weekday and weekend/holiday periods.
- Scores reflect relative risk depending on time of operation.

---

### Weather Status

Weather conditions affecting drone flight, each with a risk score:

| Code   | Label                     | Score |
| ------ | ------------------------- | ----- |
| MWTS01 | clear sky, calm winds     | 1.0   |
| MWTS02 | mild breeze ≤ 15kmph      | 1.18  |
| MWTS03 | strong winds (15-30 kmph) | 1.4   |
| MWTS04 | heavy winds ≥ 30 kmph     | 1.7   |
| MWTS05 | rain (light - moderate)   | 1.35  |
| MWTS06 | heavy rain or storm       | 1.8   |
| MWTS07 | fog or low visibility     | 1.6   |
| MWTS08 | snowfall                  | 1.65  |
| MWTS09 | thunderstorm              | 2.0   |
| MWTS10 | extreme heat ≥ 45°C       | 1.62  |
| MWTS11 | extreme cold ≤ 10°C       | 1.62  |

- Increasing severity or difficulty conditions yield higher risk scores.

---

### Usage Notes

- These types and metadata objects provide standardized codes and scoring used throughout the simulation.
- Risk scores feed into calculations for overall drone risk assessment.
- The labels allow UI components to display human-friendly descriptions.
- Scores can be updated if risk evaluations change without modifying application logic.
