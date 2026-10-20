# MX-03 — Pivoting marine instrument support, REV A

**CantaX Engineering — independent original academic-style concept demonstrator (not a contracted offshore design).**

## Brief

Illustrate a pivoting deck-mounted instrument support for a hypothetical marine monitoring installation. Demonstrate geometry, swept deployment envelope, a proposed part breakdown and, crucially, a transparent analysis of what **cannot** be established by concept geometry.

## Nominal geometry

- Deck mounting frame footprint: **1250 × 900 mm** (not overall swept footprint).
- Pivot location relative to frame datum: **X220, Y450, Z300 mm**.
- Nominal extension from pivot to instrument interface: **1600 mm**.
- Arm angle from horizontal: **12° to 65°**.
- Arm section for visualization only: **100 × 60 × 5 mm** rectangular hollow geometry.
- The arm tip centre coordinate in side view, assuming rigid planar movement:
  - `tip_x = 220 + 1600 × cos(angle)`
  - `tip_z = 300 + 1600 × sin(angle)`
- At 12°: X ≈ **1785.0 mm**, Z ≈ **632.7 mm**.
- At 65°: X ≈ **896.2 mm**, Z ≈ **1750.1 mm**.
- Nominal sensor interface geometry: 200 × 160 × 12 mm rectangular plate, unqualified.

**Important:** The deployed tip height and whole-system swept envelope are NOT the same as the 1250×900 frame footprint. No real instrument mass has been specified. No arm load rating is possible yet.

## Included verifiable deliverables

- `MX03_assembly.scad` — adjustable 3D concept model with `angle_deg`.
- `MX03_kinematics.svg` — geometric side-view overview of the pivot motion.
- `MX03_design_spec.json` — parameters and endpoint coordinates.
- `MX03_bom.csv` — concept components register (explicitly not procurement-ready).
- `MX03_verify.js` — kinematic and dimensional checks runnable in Node.js.
- `MX03_review.md` — engineering uncertainty / further design gates.

## Not represented as done

**No load calculation, pin contact pressure, fatigue evaluation, weld design, buckling, wave slamming, CFD, FEA, corrosion protection system design, IP ingress classification, class approval, CE conformity, fabrication drawings or prototype tests have been completed.**

The illustration is a transparent portfolio study of design documentation skills, **not a safe offshore device**. A real project requires load assumptions, deck data, environmental criteria, class/flag requirements and approval by appropriately qualified engineers.

© 2026 CantaX Engineering. No customer or manufacturer sponsorship implied.
