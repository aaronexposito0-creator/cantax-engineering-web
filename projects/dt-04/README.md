# DT-04 — Browser-side BOM Revision Auditor

Independent CantaX Engineering technical automation demonstration. No API, credentials, cloud upload or analytics required by this program.

## Client problem

Technical documentation often contains two revisions of a BOM. The tool identifies parts added, removed or modified, reports quantity and revision differences, and exports a safe comparison CSV for review. This **does not replace PDM/PLM** or a controlled engineering change process.

## Use

1. Open `bom-tool.html` and load two CSV files, or paste the old/new tables.
2. Required columns: Part and Qty. Optional: Rev and Description.
3. Click Compare revisions. New, removed and changed parts are highlighted.
4. Download report as CSV for follow-up.

CSV uses common headers and can use commas, semicolons or tabs. Quotes and escaped quotes are supported. Data and file contents remain in the browser; the code contains **no fetch or network calls**.

## Important boundaries

- BOM item identifiers use case-insensitive matching, and duplicate Part IDs are rejected.
- Quantities must be nonnegative numbers; quantities are not rounded.
- The comparison does **not** validate part geometry, fit, procurement or ERP assemblies.
- Input parts can be sensitive; evaluate local browser and device policies before processing protected information.
- Spreadsheet formula prefixes are escaped when exporting CSV.
- No native Excel/XLSX, multi-level BOM or item substitutions included.

## Tests

Run `node projects/dt-04/bom-tests.js` at repo root. Tests include added/removed/modified/unchanged rows, duplicate parts, negative quantities and exported formula escaping.

No customer work, supplier datasets or certification is claimed.
