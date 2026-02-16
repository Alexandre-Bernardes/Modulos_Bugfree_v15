# RECOVERY / RESTART DOC — Bugfree zTree Widget - Product

## Goal
Provide a stable, per-domain implementation that applies the zTree widget only to selected fields.

## How it works
- Overrides fields_view_get on selected models.
- Parses the returned XML arch and sets widget=ztree_select on configured fields when absent.
- Has a Settings toggle stored in ir.config_parameter: bf_web_ztree_product.enabled.

## Recreate from scratch
1. Create an Odoo addon named bf_web_ztree_product.
2. Add dependency on bf_web_ztree and the corresponding base module ('product','bf_web_ztree').
3. Implement model overrides (see models/ztree_product.py) and settings model (models/res_config_settings.py).
4. Add settings view inherit to expose the boolean toggle.
5. Restart Odoo and upgrade module.
