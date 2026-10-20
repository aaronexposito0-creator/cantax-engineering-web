# AX-02 — Adjustable linear positioning fixture, REV A

**CantaX Engineering · original independent demonstration · October 2026**

This study demonstrates a two-rail guided carriage concept with lead-screw-derived nominal translation. It is a **design demonstration**, not a manufactured, load-tested, certified or tolerance-qualified positioning system.

## Design basis

- Base plate 320 × 180 × 16 mm.
- Two 12 mm **nominal** guide rods (bearing specification not defined), centre-lines at Y = 44 and 136, Z = 36.
- Carriage 130 × 150 × 12 mm, nominal underside Z=55; it travels ±48 mm along X from Xcentre=160.
- A notional lead screw has 4 mm nominal advance per revolution. Across 96 mm nominal travel it requires 24 theoretical revolutions.
- Alignment blocks, rod supports, nut interface, lubrication and drive coupling are **concept geometry**, requiring purchased-component catalogue selection and CAD review.

## Calculation

`x_carriage_center = 160 + pitch × turns`, with `pitch=4 mm/rev` and `-12 ≤ turns ≤ 12`.

This is idealized lead advance and **does not predict positioning precision, efficiency, load capacity or backlash**. There is no substantiated repeatability figure.

## Deliverables

- `AX02_assembly.scad` — parametric 3D OpenSCAD concept with `travel` and `exploded` options.
- `AX02_layout.svg` — 2D reference drawing with part spacing and travel positions.
- `AX02_bom.csv` — concept parts register; no purchasing validation.
- `AX02_design_spec.json` — reference parameters.
- `AX02_verify.js` — reproducible geometric-consistency tests.
- `AX02_brief.md` — mechanical engineering limitations and next actions.

This is **not a completed production drawing pack, a STEP assembly or verified fabricated equipment**.

## Next design gates

1. Select real rods/blocks, lead screw and support bearings from manufacturer catalogues.
2. Check kinematic binding, longitudinal travel limits, screw/rail alignment, end-stop design, assembly order, clearances.
3. Establish design loads, free-body diagrams, required accuracy, stiffness, duty cycle, safety and tolerances.
4. Produce native solid CAD, interference-free assemblies, GD&T and drawings to the chosen manufacturing process.
5. Prototype, inspect and test against acceptance requirements before any customer use.

© 2026 CantaX Engineering. Independent uncommissioned study.
