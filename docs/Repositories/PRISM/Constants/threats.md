---
title: Threats
sidebar_position: 1
---

# Drone Threat Metadata Types and Risk Scores

This file defines the coded types and associated metadata for different drone threat categories, including Remote ID integrity flags, registration errors, mission authorization statuses, and flight violations. Each metadata entry contains a human-readable label and a numerical risk score used for risk evaluation in simulations.

---

### Remote ID Integrity Flags

These flags represent various states of the drone’s Remote ID broadcast and its authenticity.

| Code   | Description                                    | Risk Score |
| ------ | ---------------------------------------------- | ---------- |
| TRIF01 | fully compliant                                | 1.0        |
| TRIF02 | missing signature                              | 8.7        |
| TRIF03 | missing certificate                            | 8.7        |
| TRIF04 | expired certificate                            | 8.7        |
| TRIF05 | RID not sent at required frequency             | 4.7        |
| TRIF06 | partial ID                                     | 6.7        |
| TRIF07 | no RID broadcast                               | 9.7        |
| TRIF08 | RID inauthentic                                | 10.0       |
| TRIF09 | RID contains deceptive data                    | 9.7        |
| TRIF10 | anonymous ID that is not mappable to actual ID | 8.0        |
| TRIF11 | authentication server unreachable              | 6.3        |
| TRIF12 | anonymization server unreachable               | 6.0        |

- Lower scores indicate safer or fully compliant states.
- Higher scores indicate more serious integrity issues.

---

### Registration Errors

Errors related to drone registration status:

| Code   | Description                             | Risk Score |
| ------ | --------------------------------------- | ---------- |
| TRGE01 | registered                              | 1.0        |
| TRGE02 | registration revoked                    | 9.7        |
| TRGE03 | registration expired                    | 9.7        |
| TRGE04 | registration not found (database error) | 6.3        |
| TRGE05 | drone registry unreachable              | 6.0        |

- A registered status has minimal risk.
- Revoked or expired registrations carry highest risk.

---

### Mission Authorization Status

Reflects the status of mission authorization relative to the drone’s operation:

| Code   | Description                                    | Risk Score |
| ------ | ---------------------------------------------- | ---------- |
| TMAS01 | approved mission plan for this time and place  | 1.0        |
| TMAS02 | server unreachable                             | 6.0        |
| TMAS03 | mission exists but expired                     | 8.0        |
| TMAS04 | mission exists but does not cover current zone | 8.0        |
| TMAS05 | mission submitted but not yet approved         | 7.3        |
| TMAS06 | mission submitted but rejected                 | 9.0        |
| TMAS07 | no mission plan found                          | 9.7        |

- Approved missions have lowest risk.
- Missing or rejected missions represent serious compliance issues.

---

### Flight Violations

Different types of flight violations, indicating deviations or infractions during operation:

| Code   | Description                                   | Risk Score |
| ------ | --------------------------------------------- | ---------- |
| TFLV01 | no deviation from approved mission plan       | 1.0        |
| TFLV02 | too early entry/take off from monitoring zone | 6.3        |
| TFLV03 | too late entry/take off from monitoring zone  | 6.0        |
| TFLV04 | flight speed too high                         | 6.3        |
| TFLV05 | flight speed too low                          | 5.0        |
| TFLV06 | too early exit/landing in monitoring zone     | 5.3        |
| TFLV07 | too late exit/landing in monitoring zone      | 6.3        |
| TFLV08 | minor deviation from spatial trajectory       | 3.7        |
| TFLV09 | major deviation from spatial trajectory       | 8.0        |
| TFLV10 | flying in a no-fly zone                       | 10.0       |
| TFLV11 | minor payload violation                       | 4.0        |
| TFLV12 | major payload violation                       | 8.0        |

- No deviation is safest.
- Major infractions like flying in no-fly zones have the highest risk.

---

### Mutually Exclusive Flight Violations

Some flight violations cannot logically coexist; these groups help enforce exclusivity in risk calculations:

- **Too fast vs. too slow:** `TFLV04` (speed too high) and `TFLV05` (speed too low)
- **Too early vs. too late entry:** `TFLV02` and `TFLV03`
- **Too early vs. too late exit:** `TFLV06` and `TFLV07`
- **Minor vs. major payload violation:** `TFLV11` and `TFLV12`
- **Minor vs. major spatial deviation:** `TFLV08` and `TFLV09`

These groups ensure that only one violation in the group is counted when assessing risk to avoid conflicting or redundant penalties.

---

### Usage Overview

- Each category uses a strict set of code identifiers (`RemoteIdIntegrityFlag`, `RegistrationError`, etc.) for consistency.
- Risk scores are numeric values to quantify severity.
- The labels provide descriptive text for UI and reporting.
- Mutually exclusive groups help enforce logical consistency in combined risk evaluations.
