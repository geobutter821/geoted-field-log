# CLAUDE - READ THIS FIRST (Field Log App)

**This note is written by Claude, for Claude, in a future session.** Ted will paste it back to you, or tell you to read it from Drive. Follow it before you touch anything.

-----

## THE ONE RULE THAT MATTERS

`field_log_app.html` in this folder is **the** app. It is the single source of truth.
You do NOT have memory of the file's contents between sessions - only short summaries that have been wrong before.
**So: read `field_log_app.html` from this folder FIRST, every session, before you change one character.**
Do not rebuild from your summary. Do not "reconstruct." Read the actual file, then patch the actual file.

Workflow each session:

1. Read `field_log_app.html` from this folder (`app_source_current`).
1. Patch the real file. Small, targeted edits.
1. Verify brackets balance + key features still present (see checklist below).
1. Hand the patched file back to Ted via the outputs panel.
1. Ted saves it over the copy in this folder. The file - not your memory - carries forward.

If this file and your memory disagree, the file wins.

-----

## WHERE THIS LIVES

- Google Drive folder: `app_source_current`
  - Folder ID: `1_vFap78ONYOIeRE6UUtRixo5_6irWA1N`
  - Path: `.../06_Automation/field_app_handoff/app_source_current/`
- The app was **never saved anywhere before 2026-06** - every prior session built it as a chat artifact that vanished. There is no older/better version to recover. Stop looking for one. The version in this folder is the only one that has ever persisted.

## WHY YOU CAN'T JUST SAVE IT YOURSELF

The Google Drive connector write (`create_file` with base64) keeps returning **"No approval received"** in Ted's environment. It has failed every attempt. Do not loop on it and do not promise it'll work this time. The reliable path is: put the file in the outputs panel, Ted downloads it and drops it into `app_source_current` by hand. One manual step. Accept it.

-----

## WHAT THIS APP IS

A standalone, single-file mobile HTML app for logging geotechnical field points (test pits, hand augers, observation points). Pure vanilla JS, no framework, no build step. Saves to `localStorage` key `geoted_fieldlog_v3`. Opens on a phone via Safari -> Add to Home Screen (runs fullscreen, so Ted isn't trapped in the chat popup).

It is the **data-entry front end**. It feeds the separate **PDF Log Generator** (Apps Script + the `GeoTed_Field_Exploration_V2_Baseline` Sheet) by exporting V2-shaped CSVs. **These are two different systems - do not conflate them.** This app does not generate PDFs and does not talk to the Sheet directly; it produces CSVs a human imports.

Screens (router-based): projects -> points -> addPoint -> pointDetail -> addLayer -> addSample. Plus a Log Preview overlay and CSV export.

## WHAT'S ALREADY BUILT (don't rebuild these)

- **GPS button** - "Use My Location", fills lat/lng to 6 decimals, sets accuracy "GPS measured".
- **Auto Point ID** - Test Pit -> TP-1, Hand Auger -> HA-1, Observation Point -> OP-1; next free number per project; editable; doesn't override an existing point on edit.
- **Numeric keypads** - `inputmode="decimal"`/`"numeric"` on all depth/number fields.
- **Layer Type dropdown** (Fill / Native Soil / Bedrock) - uses targeted DOM swaps (uscsWrap, geoWrap, bedrockTypeWrap, attitudeWrap), NOT a full re-render, so typing isn't wiped mid-entry. Fill/Native Soil -> USCS active + soil geo units. Bedrock -> USCS shows disabled "N/A - bedrock" + Bedrock Type dropdown + attitude (strike/dip/dipDir) fields.
- **Bedrock Type auto-fill** - picking a type fills the description and constrains weathering/structure, all still editable.
- **Sample -> layer matching** - entering a sample depth auto-builds the Sample ID ("TP-1 @ 2ft") and shows which layer contains that depth (or warns none does). Matched layer/material flow into the CSV.
- **Color dropdown** - Brown / Tan / Gray / Reddish-brown / Olive / Dark brown. "-" saves as blank (via `cleanDash`).
- **Log Preview overlay** - 4-column depth-grid table (DEPTH / SAMPLE+LAB / LAYER+UNIT / DESCRIPTION-USCS) matching the V2 template, with title block + footer.
- **CSV export** - three V2-shaped files: `out_02_FieldPoints`, `out_03_TestPitLayers`, `out_04_FieldSamples`.

### Added 2026-06-07 (session 2)

- App renamed **GeoTed -> "LA Soil Reports"** in all visible UI (title, log header). The *business* is still GeoTed; only the app display name changed.
- **Fill** geologic units now include **Cf - Compacted fill** (alongside Af - Artificial fill).
- **Bedrock description auto-fills from Geologic Unit** via `GEO_UNIT_DESC` map (Tmss, Tush, Tm, etc each have a correlated description). Bedrock Type dropdown still works as an override - BOTH paths fill the description.
- **Depth caps:** layer bottom depth and sample depth are clamped to the point's Total Depth on save (alert + auto-correct if exceeded).
- **Remove project from the app:** small red x on each active project card -> `removeProject()`, confirms, deletes that project + its points from localStorage (declutters the list). Re-addable from the + picker.
- Log preview sample column simplified to: depth once, then DD pcf / MC % / blows - only fields that have values.

### Added 2026-06-07 (session 3)

- **Geologic units replaced with the 19 VERIFIED Dibblee units** from `GeoTed_VERIFIED_Geologic_Unit_Lookup_Dibblee_20260514.xlsx` (Drive, file ID `1DnCsyRqYSCFUWhgkah2n_UM3vwckAxIm`). Bedrock list is now: qd, sms, Tush, Tuss, Tm, Tmss, Qoa, QTs, Tps, Tsr, Ttus, Ttucg, Tcvb, Tcva, Tvb, Kcs, Kcsh, Kcg, Tsus - using exact-case dropdown labels. Each has its Field Log Description wired into `GEO_UNIT_DESC` for auto-fill. **Do NOT add** Qof, Qsp, Qi, Tmat, Tma, Tmg, Tmv, Ttusi - the sheet marks these unverified. When the sheet adds more verified units, sync GEO_UNITS + GEO_UNIT_DESC from it.
- **Sample-layer boundary fix:** a sample depth on a shared boundary (e.g. 5ft between Fill 0-5 and Native 5-6) now belongs to the UPPER layer. Lower layer requires depth strictly greater than its top. Fixed in both `matchLayer` and the log-preview filter.
- **Strike auto-uppercases**; **Dip Direction is now a dropdown** of the two perpendiculars computed from the strike (e.g. N40W -> NE / SW) via `strikeToPerpendiculars` + `compassDir`.

### Live hosting (set up session 2-3)

- App is hosted on GitHub Pages: repo `https://github.com/geobutter821/geoted-field-log`, live URL `https://geobutter821.github.io/geoted-field-log/field_log_app.html`.
- Preview URL for the file is `https://drive.google.com/file/d/1X__yHf2jvp5XLd0oichCID92NOTUx_Fk/preview` but Drive shows source, not rendered - GitHub Pages URL is the one to use on the phone.
- Update flow: Ted downloads the new HTML from chat -> saves into `app_source_current` (Drive) -> Codex copies it into local repo `C:\temp\geoted-field-log\` -> commits + `git push origin main` -> Pages rebuilds in ~30s. Same fixed URL every time.

## EMBEDDED V2 DATA (matches the V2 lookup tabs - keep in sync if those change)

- PICK lists: pointType, layerType, moisture, density, weathering, bedding, contact, groundwater, caving, backfilled, accuracy, sampleType, color.
- `USCS_CODES` + `USCS_DESC` (soil only): SM, SC, CL, ML, GP, GM, SP, GC, CH, MH, SW, GW, CL-ML.
- `GEO_UNITS` by layer type: Fill -> [Af, Cf]; Native Soil -> [Qa, Qc, Qoa]; Bedrock -> [qd, sms, Tush, Tuss, Tm, Tmss, Qoa, QTs, Tps, Tsr, Ttus, Ttucg, Tcvb, Tcva, Tvb, Kcs, Kcsh, Kcg, Tsus].
- `BEDROCK_TYPES`: "Sandstone and shale", "Sandstone", "Shale" (each with desc + weathering[] + structure[]).
- `ALL_PROJECTS`: one project - 26-02, 16215 Dorilee Ln, Encino, CA 91436, lat 34.1329484, lng -118.485788, region M, defaultBedrock "Sandstone and shale".

## STILL MISSING vs the original spec (the next work)

1. **Hand Auger 02B section** - conditional block shown ONLY when point type = Hand Auger: drilling method, sampling method, hammer weight, refusal depth, refusal material, notes. Not in the current build.
1. **Clear local draft** button - with a confirm prompt, to wipe `localStorage`. Not in the current build.
1. Export currently covers 02/03/04. Original intended 02 + 02B + 03 + 04 + 06 (point location). 02B and 06 not yet exported.

When you add 02B, gate it on `f_type === "Hand Auger"` the same targeted-swap way the bedrock sections are gated - don't full re-render the form.

## ON THE HORIZON — what Ted wants next (NOT built yet, do not build without his go-ahead)

The field app is **considered complete for now** (as of 2026-06-07 session 3). Ted is moving to other work and will return to these. Captured here so next session has his intent without him re-explaining:

### 1. Connect the field data to the Site Plan (the big next step)

**The goal in Ted’s words:** the field data should *project onto the site plan based on the coordinates.* Each logged point (TP/HA/OP) has a lat/lng captured via the GPS button (or entered manually). Those coordinates are what place the point on the site plan. So the seam between this app and the Site Plan system is the **coordinate data** — the app already collects it (lat, lng, accuracy on every point, and exports it; note the `06_Point_Location_Export` output is intended but not yet built — see “still missing” #3 above; it’s needed for this).

- The Site Plan system is the separate `generate_site_plan_v2.py` QGIS workflow (file ID `1rpZ4n2saHDGO5_vsb-VNe1YJoPE9dUGs`, under `06_Automation_REPLACEMENT`). It expects point-location columns that match the `06_Point_Location_Export` sheet headers.
- **What to build when Ted says go:** make the app export (or feed) the point coordinates in the shape the site plan generator expects, so the field points drop onto the site plan at their real locations. Likely the missing `out_06` / point-location CSV is the bridge.
- **Rule reminder:** this connects two modules (Field App ↔ Site Plan). Per Ted’s standing rule, do NOT wire them together until he explicitly says so. He has now flagged intent, but wait for the explicit “connect them” before building the link.

### 2. Activation once a project is active

Ted wants the app to tie in so that **once a project is activated (made an active project), this field logging is part of that flow.** This crosses into project activation / Master Tracker territory — also gated. Details TBD; he said “let’s just get to that” later. Do not build until he scopes it.

### 3. “Something to implement later”

Ted mentioned a further feature beyond the above but deferred it (“we also want to implement something later but for now…”). Unspecified. Ask him what it was when he returns to this.

## VERIFY-BEFORE-HANDOFF CHECKLIST

Run a quick check that:

- `()`, `{}`, `[]` all balance in the `<script>` block.
- These strings still exist: `function showLog(`, `Preview Log`, `getGPS`, `onLayerTypeChange`, `matchLayer`, `PICK.color` / `Reddish-brown`, `localStorage` key `geoted_fieldlog_v3`.
- File still opens with `<!DOCTYPE html>` and closes `</html>`.

## STANDING PROJECT RULES (from Ted)

- Inspect before touching. No new files, merges, renames, or moves without explicit OK.
- Keep modules separate. This app stays separate from the Master Tracker, Site Plan, Figures, LADBS, and project activation unless Ted explicitly says to connect them.
- Don't connect this to the PDF generator Sheet automatically. CSV export is the seam; a human moves the files.
- Current stated priority is the LADBS records system + field/lab/log workflow. This app is part of the field/lab/log side.

-----

*Last updated: 2026-06-07. If you change the app, update this note's "already built" and "still missing" sections so the next session starts accurate.*
