# CX-01 · Adjustable instrument mounting fixture (REV A)

**Independent CantaX Engineering demonstration · 20 October 2026**

This is an original **small machine fixture concept** intended to demonstrate mechanical design logic, parametric geometry, editable CAD source, 2D cutting profiles, component-level BOM, dimensional constraints and an engineering handover. It is **not** a commercial commission, load-rated design, certified device or tested manufacture.

## Problem and solution

A machine builder needs to place a non-safety-critical instrument or sensor on a frame and align its position along one axis without redesigning the bracket. CX-01 combines:

- A rounded aluminium **base plate** with four chassis mounting holes and two parallel 80 × 9 mm longitudinal slots.
- A separate **sliding carriage** with two Ø9 locking clearances and two Ø6.6 payload mounting holes on a 35 mm pitch.
- Two M8 locking joints (nut and washers illustrated), with a nominal **±35.5 mm** slider-center range.

The slider is fixed by tightening both locking joints after alignment; **no holding torque or slip-load rating is asserted**.

## Dimensions (all in mm)

| Characteristic | CX01-001 base | CX01-002 slider |
| --- | ---: | ---: |
| Finished outline X×Y | 180 × 100 | 85 × 60 |
| Thickness | 8 | 6 |
| Rounded external corners | R8 | R5 |
| Chassis holes | 4 × Ø6.6 | — |
| Adjustment slots | 2 × (80 overall × 9) | — |
| Locking holes | — | 2 × Ø9 |
| Payload holes | — | 2 × Ø6.6 |
| Material (suggested) | EN AW-6082 T6 | EN AW-6082 T6 |

### Hole coordinate system

Coordinates below refer to the **lower-left bounding rectangle** of each part; x right, y up. Profiles in the supplied DXFs use the same origin. Coordinates are nominal centre positions in mm.

- Base M6 chassis holes: (20,12), (160,12), (20,88), (160,88).
- Base slot centres: (90,37), (90,63); each slot is 80 mm **overall** long × 9 mm wide. End centres are x = 54.5 and 125.5.
- Slider M8 locking holes: (42.5,17), (42.5,43).
- Slider M6 payload holes: (25,30), (60,30).

At zero offset, slider lower-left corner is at base coordinates (47.5,20). Two locking holes align with the base slots at (90,37) and (90,63).

### Geometric checks, **not** performance verification

- Nominal permitted slider-centre travel: x ∈ [54.5, 125.5], i.e. **±35.5 mm** about x=90.
- At both travel extremes, the slider footprint lies within the base envelope with at least **12 mm margin in X** (nominal).
- At each end of travel the M8 bolt shafts are centred on slot semicircle centres.
- 35 mm pitch between carriage payload mounting holes; 26 mm spacing between slider lock centres.
- Nominal plate mass using density 2.70 g/cm³ (hardware excluded): base **0.3543 kg**, slider **0.0791 kg**, combined **0.4334 kg**. These are analytical values from the CAD primitives, not measured weights.
- Clearance from carriage long edges y=20/80 to chassis-hole centres y=12/88 is 8 mm. **Check screw-head and washer envelope, access and assembly feasibility before build**.
- No structural capacity, bending stress, fastener preload, fatigue life, vibration margin or tolerance stack is verified by this concept package.

## Files

| File | Purpose |
| --- | --- |
| `CX01_assembly.scad` | OpenSCAD parametric model, selectable single parts/assembly and slide position |
| `CX01_base_profile.dxf` | Full-size editable 2D DXF profile (mm), independent layers for outer, holes, slots |
| `CX01_slider_profile.dxf` | Full-size editable 2D DXF profile (mm), independent layers for outer, holes |
| `CX01_engineering_drawing.svg` | Readable diagram and drawing reference, not a signed manufacturing drawing |
| `CX01_bom.csv` | Explicit custom parts and illustrative bought-in hardware |
| `geometry.json` | Machine-readable geometry specification |
| `CX01_checks.js` | Reproducible geometry consistency checks (Node.js) |

**Actual STEP or native FreeCAD output is not included; do not represent the OpenSCAD source as STEP.** The .scad source and DXFs are editable with free tools, but a real manufacturing handover should be reviewed in CAD for clearances, dimensioning, chosen tolerances and client requirements.

## How to inspect

1. Download `CX01_assembly.scad` and open it in [OpenSCAD](https://openscad.org/) (free).
2. Change `travel_mm` between -35.5 and 35.5; set `part` to `base` or `slider` for individual part viewing/export.
3. Open the DXF profiles in a CAD program and independently verify **units = mm** and the nominal dimensions before use.
4. The BOM is demonstrative; procure from actual verified supplier specifications.

## Assumptions, fabrication and boundary

- This is a two-axis *mounting footprint* with **one degree of freedom** (longitudinal translation); it is **not** a complete commercial guided linear slide.
- Nominal plate thicknesses are stock-based. Material grade and heat treatment would require material certificates if contracted.
- Manufacturing route: plate cutting (saw/waterjet/CNC), drilling/slot cutting, deburr, edge finishing, inspect hole diameter and positions, verify slider travel, trial-assemble with selected fasteners.
- Supplier process tolerances, surface requirements, thread selection, torque and safety assessment remain **TBD** at project briefing.
- Reference-only prototype design: do not build into load-bearing or safety-related machinery without independent mechanical verification.

© 2026 CantaX Engineering · original demo geometry. No claims of customer sponsorship.
