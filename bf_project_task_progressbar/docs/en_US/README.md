# Bugfree Project Task Progress Bar

## Overview
Adds a **progress bar** to each **Project kanban card** showing:
- **done/total tasks (x/y)**
- **percentage** computed from *done ÷ total*
- Click the bar/label to open the project's tasks in **Kanban view**

## How "Done" is detected
A task is considered done when its stage has **Folded in Kanban** enabled (`stage_id.fold = True`).

## Installation
1. Copy the module folder `bf_project_task_progressbar` into your addons path.
2. Restart the Odoo service.
3. Apps → Update Apps List → Install the module.
4. Clear browser cache (Ctrl+F5). If needed: `?debug=assets`.

## Usage
Open **Projects** (kanban). Each project card shows the progress bar.
Click the bar or the label to open the tasks filtered by the project.

## Notes
- If your database has very large numbers of tasks, the kanban may trigger extra queries to compute counts.
- This module does not modify business logic; it only improves the UX.

## Support
Website: https://bugfree.com.br

## Project smart button
A smart button is added to the Project form showing **x/y** and opening a **Task Progress** graph (Graph view first).
