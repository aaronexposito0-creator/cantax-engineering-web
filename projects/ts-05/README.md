# TS-05 — Linear Tolerance Stack-up Explorer

**20 October 2026 · Original independent software demonstration. Not a customer engagement, production validation or certification.**

## What it shows
An interactive, local-only engineering workflow from dimensional assumptions to a documented numerical report. Users enter 1–16 signed dimensions, symmetric dimensional tolerances and an acceptable resulting-assembly interval. This is a **one-dimensional scalar stack**, not full GD&T analysis.

For nominal values n(i), tolerances t(i) >= 0 and signs s(i) = +/-1:
- Nominal result N = SUM [s(i) * n(i)]
- Worst-case interval under given bounds [N - SUM t(i), N + SUM t(i)]
- Illustrative independent uniform errors epsilon(i) from -t(i) to +t(i), with standard deviation sigma = sqrt(SUM[t(i)^2 / 3])
- 12,000 pseudorandom Monte Carlo draws from a fixed seed; histogram has 20 bins.
- The simulated outside-spec percentage is **not a predicted rejection or inspection failure rate**.

## Reference example
Housing shoulder +50 +/-0.10 mm, shaft reach -20 +/-0.05 mm, spacer -29.50 +/-0.03 mm:
- Nominal clearance = **0.50 mm**.
- Worst-case range = **0.32–0.68 mm**.
- Example acceptance bounds 0.35–0.65 mm exclude some valid combinations of component tolerances.

## Transparency and quality
- All calculation runs locally: no network calls, third-party script, analytics, database or file uploads.
- Labels are inserted with DOM properties rather than rendering user-generated HTML.
- CSV export has basic spreadsheet-formula sanitization.
- Readable source file: [ts05.js](../../ts05.js).
- Tests: [tests.js](tests.js); run from repository root using **node projects/ts-05/tests.js**.

## Limitations
No correlated or measured manufacturing distributions, process capability, asymmetrical tolerances, datum chains, geometric/angular/3D error, temperature, wear, fit verification, strength or fatigue. Engineering acceptance of a real design requires additional analysis and professional judgment.

**Commercial positioning:** illustrates small engineering-data automation that can be delivered with transparent inputs, reproducible logic and an explicit technical handover.
