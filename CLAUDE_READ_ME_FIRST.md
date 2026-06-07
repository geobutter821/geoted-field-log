# CLAUDE — READ THIS FIRST (Field Log App)

**This note is written by Claude, for Claude, in a future session.** Ted will paste it back to you, or tell you to read it from Drive. Follow it before you touch anything.

-----

## THE ONE RULE THAT MATTERS

`field_log_app.html` in this folder is **the** app. It is the single source of truth.
You do NOT have memory of the file’s contents between sessions — only short summaries that have been wrong before.
**So: read `field_log_app.html` from this folder FIRST, every session, before you change one character.**
Do not rebuild from your summary. Do not “reconstruct.” Read the actual file, then patch the actual file.

Workflow each session:

1. Read `field_log_app.html` from this folder (`app_source_current`).
1. Patch the real file. Small, targeted edits.
1. Verify brackets balance + key features still present (see checklist below).
1. Hand the patched file back to Ted via the outputs panel.
1. Ted saves it over the copy in this folder. The file — not your memory — carries forward.

If this file and your memory disagree, the file wins.

-----

## WHERE THIS LIVES

- Google Drive folder: `app_source_current`
  - Folder ID: `1_vFap78ONYOIeRE6UUtRixo5_6irWA1N`
  - Path: `…/06_Automation/field_app_handoff/app_source_current/`
- The app was **never saved anywhere before 2026-06** — every prior session built it as a chat artifact that vanished. There is no older/better version to recover. Stop looking for one. The version in this folder is the only one that has ever persisted.

## WHY YOU CAN’T JUST SAVE IT YOURSELF

The Google Drive connector write (`create_file` with base64) keeps returning **“No approval received”** in Ted’s environment. It has failed every attempt. Do not loop on it and do not promise it’ll work this time. The reliable path is: put the file in the outputs panel, Ted downloads it and drops it into `app_source_current` by hand. One manual step. Accept it.

-----

## WHAT THIS APP IS

A standalone, single-file mobile HTML app for logging geotechnical field points (test pits, hand augers, observation points). Pure vanilla JS, no framework, no build step. Saves to `localStorage` key `geoted_fieldlog_v3`. Opens on a phone via Safari → Add to Home Screen (runs fullscreen, so Ted isn’t trapped in the chat popup).

It is the **data-entry front end**. It feeds the separate **PDF Log Generator** (Apps Script + the `GeoTed_Field_Exploration_V2_Baseline` Sheet) by exporting V2-shaped CSVs. **These are two different systems — do not conflate them.** This app does not generate PDFs and does not talk to the Sheet directly; it produces CSVs a human imports.

Screens (router-based): projects → points → addPoint → pointDetail → addLayer → addSample. Plus a Log Preview overlay and CSV export.

## WHAT’S ALREADY BUILT (don’t rebuild these)

- **GPS button** — “📍 Use My Location”, fills lat/lng to 6 decimals, sets accuracy “GPS measured”.
- **Auto Point ID** — Test Pit→TP-1, Hand Auger→HA-1, Observation Point→OP-1; next free number per project; editable; doesn’t override an existing point on edit.
- **Numeric keypads** — `inputmode="decimal"`/`"numeric"` on all depth/number fields.
- **Layer Type dropdown** (Fill / Native Soil / Bedrock) — uses targeted DOM swaps (uscsWrap, geoWrap, bedrockTypeWrap, attitudeWrap), NOT a full re-render, so typing isn’t wiped mid-entry. Fill/Native Soil → USCS active + soil geo units. Bedrock → USCS shows disabled “N/A — bedrock” + Bedrock Type dropdown + attitude (strike/dip/dipDir) fields.
- **Bedrock Type auto-fill** — picking a type fills the description and constrains weathering/structure, all still editable.
- **Sample → layer matching** — entering a sample depth auto-builds the Sample ID (“TP-1 @ 2ft”) and shows which layer contains that depth (or warns none does). Matched layer/material flow into the CSV.
- **Color dropdown** — Brown / Tan / Gray / Reddish-brown / Olive / Dark brown. “—” saves as blank (via `cleanDash`).
- **Log Preview overlay** — 4-column depth-grid table (DEPTH / SAMPLE+LAB / LAYER+UNIT / DESCRIPTION-USCS) matching the V2 template, with title block + footer.
- **CSV export** — three V2-shaped files: `out_02_FieldPoints`, `out_03_TestPitLayers`, `out_04_FieldSamples`.

## EMBEDDED V2 DATA (matches the V2 lookup tabs — keep in sync if those change)

- PICK lists: pointType, layerType, moisture, density, weathering, bedding, contact, groundwater, caving, backfilled, accuracy, sampleType, color.
- `USCS_CODES` + `USCS_DESC` (soil only): SM, SC, CL, ML, GP, GM, SP, GC, CH, MH, SW, GW, CL-ML.
- `GEO_UNITS` by layer type: Fill→[Af]; Native Soil→[Qa, Qc, Qoa]; Bedrock→[M, Tmss, Tush, Tuss, Tm, QTs, Tps, Kcs].
- `BEDROCK_TYPES`: “Sandstone and shale”, “Sandstone”, “Shale” (each with desc + weathering[] + structure[]).
- `ALL_PROJECTS`: one project — 26-02, 16215 Dorilee Ln, Encino, CA 91436, lat 34.1329484, lng -118.485788, region M, defaultBedrock “Sandstone and shale”.

## STILL MISSING vs the original spec (the next work)

1. **Hand Auger 02B section** — conditional block shown ONLY when point type = Hand Auger: drilling method, sampling method, hammer weight, refusal depth, refusal material, notes. Not in the current build.
1. **Clear local draft** button — with a confirm prompt, to wipe `localStorage`. Not in the current build.
1. Export currently covers 02/03/04. Original intended 02 + 02B + 03 + 04 + 06 (point location). 02B and 06 not yet exported.

When you add 02B, gate it on `f_type === "Hand Auger"` the same targeted-swap way the bedrock sections are gated — don’t full re-render the form.

## VERIFY-BEFORE-HANDOFF CHECKLIST

Run a quick check that:

- `()`, `{}`, `[]` all balance in the `<script>` block.
- These strings still exist: `function showLog(`, `Preview Log`, `getGPS`, `onLayerTypeChange`, `matchLayer`, `PICK.color` / `Reddish-brown`, `localStorage` key `geoted_fieldlog_v3`.
- File still opens with `<!DOCTYPE html>` and closes `</html>`.

## STANDING PROJECT RULES (from Ted)

- Inspect before touching. No new files, merges, renames, or moves without explicit OK.
- Keep modules separate. This app stays separate from the Master Tracker, Site Plan, Figures, LADBS, and project activation unless Ted explicitly says to connect them.
- Don’t connect this to the PDF generator Sheet automatically. CSV export is the seam; a human moves the files.
- Current stated priority is the LADBS records system + field/lab/log workflow. This app is part of the field/lab/log side.

-----

*Last updated: 2026-06-07. If you change the app, update this note’s “already built” and “still missing” sections so the next session starts accurate.*