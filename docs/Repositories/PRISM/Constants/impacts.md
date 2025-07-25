---
title: Impacts
sidebar_position: 3
---

# Zone and Human Presence Metadata Types and Risk Scores

This section defines coded types representing environmental and situational contexts related to drone monitoring zones. Each type includes a descriptive label and a numerical risk score used for risk assessment in simulations.

---

### Zone Types

These codes categorize the geographic or functional nature of monitored zones where drone activity occurs. Risk scores reflect the relative sensitivity or hazard level of each zone.

| Code   | Description                                                      | Risk Score |
| ------ | ---------------------------------------------------------------- | ---------- |
| IZNT01 | open uninhabited terrain (e.g., desert, plain)                   | 1.0        |
| IZNT02 | agricultural land                                                | 2.7        |
| IZNT03 | industrial zone (non-critical)                                   | 3.0        |
| IZNT04 | commercial area (non-critical)                                   | 3.7        |
| IZNT05 | residential neighborhood                                         | 5.3        |
| IZNT06 | sensitive buildings (schools, hospitals, embassies)              | 7.7        |
| IZNT07 | critical infrastructure (power plant, oil facility, data center) | 9.7        |
| IZNT08 | airport, military base, border zone                              | 9.7        |

- Lower scores indicate less sensitive or low-risk zones such as open terrain.
- Higher scores mark critical or high-risk zones with vulnerable infrastructure or strategic importance.

---

### Human Presence Types

These codes describe the level and type of human activity detected in a monitoring zone, which influences the risk evaluation.

| Code   | Description                                                 | Risk Score |
| ------ | ----------------------------------------------------------- | ---------- |
| IHPT01 | no human presence detected (e.g., confirmed empty zone)     | 1.0        |
| IHPT02 | sparse pedestrian activity (e.g., early morning in suburb)  | 3.0        |
| IHPT03 | work crew / maintenance activity (e.g., roads, utilities)   | 3.7        |
| IHPT04 | urban pedestrian zones (moderate density)                   | 5.7        |
| IHPT05 | gathering spot (e.g., park, mosque, mall during peak time)  | 7.0        |
| IHPT06 | stadium / mass event (concert, rally)                       | 9.3        |
| IHPT07 | overcrowded transportation hub (train/bus station, airport) | 9.7        |
| IHPT08 | school zone during active hours                             | 8.0        |
| IHPT09 | protest or emergency crowding situation                     | 10.0       |

- Risk increases with density and criticality of human presence.
- Highest risks correspond to emergency crowding or heavily populated transport hubs.

---

### Usage Notes

- These metadata types are integral in simulating the contextual risk around drone operations.
- Scores can be used to weight or adjust drone risk models dynamically based on location and time.
- Combining zone type and human presence metrics allows nuanced risk evaluation for safety-critical scenarios.
