console.info('BF bf_web_ztree 18.0.1.0.16 loaded (view_registry_tree_alias.js)');
console.info('BF bf_web_ztree 17.0.1.0.16 loaded (view_registry_tree_alias.js)');
console.info('BF bf_web_ztree 16.0.1.0.16 loaded (view_registry_tree_alias.js)');
odoo.define('bf_web_ztree.view_registry_tree_alias', function (require) {
    'use strict';

    // Keep an explicit log to confirm the latest bundle is loaded.
    // (User preference: module technical name + version)
    console.info('bf_web_ztree 14.0.1.0.15 loaded: view registry compatibility patch');

    var view_registry = require('web.view_registry');

    /**
     * Odoo 15 is "list" canonical, but legacy actions/modules may still reference
     * "tree". Additionally, if the view registry is incomplete due to asset
     * customizations, actions referencing "kanban" (e.g. Inventory) can crash.
     *
     * This file makes the web client more tolerant by:
     *  - Aliasing "tree" -> "list" when needed
     *  - Ensuring "list", "form", "kanban" exist in the registry (best-effort)
     *
     * Note: This does NOT replace Odoo core; it only fills missing keys if any.
     */

    function _ensureView(type, moduleName) {
        try {
            if (!view_registry.get(type)) {
                var View = require(moduleName);
                if (View) {
                    view_registry.add(type, View);
                }
            }
        } catch (e) {
            // Best-effort: never break the web client due to a missing optional module.
            // eslint-disable-next-line no-console
            console.warn('bf_web_ztree: could not ensure view type', type, 'from', moduleName, e);
        }
    }

    // Ensure core view types exist (best-effort).
    _ensureView('list', 'web.ListView');
    _ensureView('form', 'web.FormView');
    _ensureView('kanban', 'web.KanbanView');

    // Alias "tree" to "list" for compatibility.
    try {
        if (!view_registry.get('tree')) {
            var listView = view_registry.get('list') || require('web.ListView');
            if (listView) {
                view_registry.add('tree', listView);
            }
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('bf_web_ztree: could not add tree->list alias', e);
    }
});
