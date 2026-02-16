# Bugfree Project Task Progress Bar

**Instant visibility for every project: a progress bar on Kanban cards and a PercentPie Tasks smart button.**

Project teams lose time opening projects just to understand “how far along we are”. This module adds a clean, lightweight visual progress indicator to the Project app so you can spot risk and progress at a glance.

## Key benefits

- See progress directly on each Project Kanban card (percentage + done/total).
- Keep the standard Tasks smart button click behavior (opens the project tasks).
- PercentPie indicator inside the Tasks smart button with Open/Total counter and tooltip.
- No external dependencies; minimal and safe view inheritance.
- Works well for PMO, agencies, internal IT and any team tracking delivery.

## Features

- Kanban progress bar rendered inside the Project card (uses computed fields).
- Tasks smart button upgraded with Odoo’s built-in percentpie widget.
- Open/Total counter displayed below the pie (space-optimized layout).
- Tooltip on the smart button: Tarefas (or your translated label).
- Backend assets only; no website impact.

## How it works

1. Install the module and upgrade it after updates.
2. Open Project → Kanban view: each card shows a progress bar.
3. Open a project form: the Tasks smart button shows a PercentPie with Open/Total.

## Compatibility

- Odoo 12 Community/Enterprise (Project app required).
- Tested with standard project views; does not replace core actions.

## Post‑install / upgrade checklist

- Restart the Odoo service after install/upgrade.
- Clear browser cache and asset bundles; if using CDN/Cloudflare, purge cached assets.
- Developer mode tip: append ?debug=assets to force asset reload.

## Support

Support by Bugfree do Brasil. Custom adjustments (labels, layout, extra KPIs) can be delivered as a PRO service if needed.
