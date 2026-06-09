# CLAUDE - READ THIS FIRST (Two Field Apps)

This note is written for the next session. Read it before touching any app file.

## Current Truth

There are two different apps that got tangled because they both used the filename `field_log_app.html`.

Do not assume they are the same file. Do not overwrite one with the other.

## App B - Project Browser / Site Plan Bridge (LIVE PHONE APP)

This is the app Ted currently opens from the phone home screen.

- Live URL: `https://geobutter821.github.io/geoted-field-log/field_log_app.html`
- GitHub repo: `https://github.com/geobutter821/geoted-field-log`
- Local repo: `C:\temp\geoted-field-log\`
- Drive source folder: `G:\My Drive\GeoTed_AI_Operations\06_Automation\field_app_handoff\app_source_current\`
- Main file in that folder: `field_log_app.html`
- Size checked 2026-06-08: about 18 KB
- Contains: `Logs & Lab & Calcs`, `Set`, `geoted_field_app_bridge_v1`
- Does NOT contain: `geoted_fieldlog_v3`

What it does:

- Shows active projects.
- Opens project folders such as Figures and Logs & Lab & Calcs.
- Uses an Apps Script Web App bridge.
- Triggers Site Plan and Cross-Section generation.
- Shows project/folder/file views.

This is the live handoff shell. Do NOT replace it with App A.

## App A - Standalone Field Logger (53 KB)

This is the geotechnical field logging app built earlier.

- Safe project copy: `G:\My Drive\GeoTed_AI_Operations\04_Active_Projects\26-02_16215_Dorilee_Ln\Logs & Lab & Calcs\Logs\field_log_app.html`
- Clearly named safety copy: `G:\My Drive\GeoTed_AI_Operations\06_Automation\field_app_handoff\app_source_current\FIELD_LOGGER_53k_appA.html`
- Size checked 2026-06-08: about 53 KB
- Contains: `geoted_fieldlog_v3`, `showLog`, `matchLayer`, `strikeToPerpendiculars`, `LA Soil Reports`
- Does NOT contain: `geoted_field_app_bridge_v1`

What it does:

- Project -> points -> addPoint -> pointDetail -> addLayer -> addSample.
- Logs layers and samples.
- Has a `Save PDF to Logs` action on point detail. This calls the Apps Script bridge action `saveFieldLogPdf` and should create a PDF in the selected project's `Logs & Lab & Calcs/Logs` folder.
- Has verified Dibblee geologic units.
- Handles sample/layer boundary logic.
- Has strike/dip direction logic.
- Saves field data to browser `localStorage`.
- Exports CSVs for the field log workflow.

This is the field logger. It should be embedded into or launched from App B later. Do NOT use it to overwrite App B.

Bridge note: the field logger PDF save requires the deployed Apps Script Web App to include the `saveFieldLogPdf` action from `G:\My Drive\GeoTed_AI_Operations\06_Automation\site_plan_automation_v2\FieldAppWebBridge.gs`. If the phone says `Unknown action: saveFieldLogPdf`, the static app is current but the Apps Script deployment is still old and must be redeployed.

## Next Real Job

The next session should scope a merge, not patch blindly.

Goal:

Make App B, the live project browser / handoff app, surface App A inside the correct project context. The target workflow is:

1. Ted opens the live phone app.
2. Ted opens project `26-02`.
3. Ted opens `Logs & Lab & Calcs`.
4. Ted opens `Logs`.
5. Ted launches the field logger for that project.
6. Finished logs should save/export into that project's `Logs` folder, not into a random download pile and not into `app_source_current`.

This is an architecture task because it crosses:

- Static GitHub Pages app.
- Apps Script Web App bridge.
- Google Drive project folders.
- The standalone localStorage field logger.
- The field/lab/log CSV export path.

Before writing code, read:

1. App B from `app_source_current\field_log_app.html`.
2. App A from `app_source_current\FIELD_LOGGER_53k_appA.html`.
3. The Apps Script bridge used by App B.
4. The project folder structure for `26-02`.

Then produce a plan for how App B should launch or host App A and how App A should save/export finished logs into the selected project's `Logs` folder.

## Hard Rules

- Do not overwrite the 18 KB App B in `app_source_current` with the 53 KB App A.
- Do not rename or delete project folders without Ted's explicit approval.
- Do not delete duplicate folders until Ted approves.
- Do not connect modules automatically without scoping the boundary first.
- If file contents and memory disagree, the file wins.

## Quick Verification Strings

App B should contain:

- `geoted_field_app_bridge_v1`
- `Logs & Lab & Calcs`
- `renderFolder`
- `Set`

App A should contain:

- `geoted_fieldlog_v3`
- `function showLog(`
- `matchLayer`
- `strikeToPerpendiculars`
- `Reddish-brown`

Last updated: 2026-06-08.
