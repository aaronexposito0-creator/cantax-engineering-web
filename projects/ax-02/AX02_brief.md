# AX-02 design review notes

**Client-style problem statement (invented for demonstration, not a real customer's brief):** Provide a compact axis allowing an instrumentation platform to translate across a 96 mm envelope within a 320 × 180 mm mounting footprint.

**Chosen architecture:** twin guided rods and central nominal screw; two support blocks per rail, moving carriage, concept thrust ends.

**Reasoning:** A linear screw allows repeatable theoretical motion increments without implying real-world positional accuracy. Parallel supports reduce yaw tendency in principle but **rod deflection, bearing play, lead-screw whip, cantilever moments and parallelism remain unknown**.

**Geometry checklist:** nominal X centre from 112 to 208 mm; carriage X footprint from 47 to 273 mm over travel; 23 mm plate edge margin. Full travel 96 mm / 4 mm per revolution = 24 turns.

**Critical uncertainty:** rod diameter alone is insufficient for a load rating. Bearing model, shaft tolerance/hardness, guides parallelism, joint fits, exact purchased profiles and end stops are prerequisites to a production release. Do not use this concept in safety-critical positioning machinery.

**Potential actual paid scope:** a client could commission a properly selected, interoperable CAD layout plus fabrication drawings and BOM after supplying loads, duty cycle, accurate catalogue references, tolerances and desired file format.

**Manufacturing disclaimer:** all files are for design review and demonstration only; no real machining order or accuracy claim can be based solely on this study.
