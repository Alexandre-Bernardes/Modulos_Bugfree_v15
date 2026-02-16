console.info('BF bf_web_ztree 19.0.1.0.16 loaded (ztree_select.js)');
console.info('BF bf_web_ztree 18.0.1.0.16 loaded (ztree_select.js)');
console.info('BF bf_web_ztree 17.0.1.0.16 loaded (ztree_select.js)');
console.info('BF bf_web_ztree 16.0.1.0.16 loaded (ztree_select.js)');
odoo.define('bf_web_ztree.ztree_select', function (require) {
    'use strict';

    try {
        console.info('bf_web_ztree v15.0.1.0.15 loaded');
    } catch (e) {}

    // Odoo 15: Many2one is in web.relational_fields
    var relational_fields = require('web.relational_fields');
    var field_registry = require('web.field_registry');
    var core = require('web.core');

    var _t = core._t;

    /**
     * ztree_select (Odoo 15)
     *
     * This widget targets hierarchical many2one fields.
     * It opens a dropdown-like tree overlay anchored to the input, without extra buttons.
     *
     * XML attributes supported:
     *  - ztree_parent_key: parent field (default: parent_id)
     *  - ztree_expend_level / ztree_expand_level: levels expanded by default (default: 2)
     *  - order: optional order for search_read (sanitized; ignored if invalid)
     *  - limit: max records for the tree (default: 1000)
     */
    var FieldZTreeSelect = relational_fields.FieldMany2One.extend({
        supportedFieldTypes: ['many2one'],

        init: function () {
            this._super.apply(this, arguments);

            // In Odoo 15, XML node options are available via nodeOptions.
            // Keep fallback to attrs for legacy modules.
            var opts = this.nodeOptions || this.attrs || {};

            this._bf_uid = _.uniqueId('bf_ztree_');
            this._bf_dropdown_open = false;
            this._bf_dropdown = null;
            this._bf_nodes_cache = null;

            this._bf_ztree_opts = {
                parent_key: opts.ztree_parent_key || 'parent_id',
                expand_level: parseInt(opts.ztree_expand_level || opts.ztree_expend_level || '2', 10),
                order: opts.order || null,
                limit: parseInt(opts.limit || '1000', 10)
            };
        },

        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                console.info('BF bf_web_ztree 14.0.1.0.15 loaded (ztree_select.js)');
                self._bfBindTreeDropdown();
            });
        },

        _onInputClick: function (ev) {
            // Override Odoo's default Many2one click handler.
            // We open the zTree dropdown and avoid touching jQuery UI autocomplete
            // in the click path to prevent "cannot call methods on autocomplete prior to initialization".
            if (this.mode !== 'edit') {
                return;
            }
            if (ev) {
                // Allow normal behavior when clicking special buttons.
                if ($(ev.target).closest('.o_external_button').length) {
                    return;
                }
                // Only left click.
                if (ev.which && ev.which !== 1) {
                    return;
                }
                if (this.$input && (this.$input.is(':disabled') || this.$input.prop('readonly'))) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
            }
            if (this._bf_dropdown_open) {
                return;
            }
            this._bfOpenDropdown();
        },

        _renderEdit: function () {
            this._super.apply(this, arguments);
            this._bfBindTreeDropdown();
        },

        destroy: function () {
            this._bfCloseDropdown(true);
            this._bfUnbindTreeDropdown();
            return this._super.apply(this, arguments);
        },

        // -------------------------------
        // Dropdown overlay
        // -------------------------------

        _bfBindTreeDropdown: function () {
            var self = this;
            if (this.mode !== 'edit') {
                return;
            }
            if (!this.$input || !this.$input.length) {
                return;
            }
            if (this.$input.data('bf_ztree_bound')) {
                return;
            }
            this.$input.data('bf_ztree_bound', true);

            // ESC closes.
            this.$input.on('keydown.' + this._bf_uid, function (ev) {
                if (ev.key === 'Escape' || ev.keyCode === 27) {
                    self._bfCloseDropdown(false);
                }
            });

            // If the field is removed from DOM, ensure overlay closes.
            this.on('dom_updated', this, function () {
                if (self._bf_dropdown_open && (!self.$el || !self.$el.is(':visible'))) {
                    self._bfCloseDropdown(true);
                }
            });
        },

        _bfUnbindTreeDropdown: function () {
            if (this.$input && this.$input.length) {
                this.$input.off('.' + this._bf_uid);
                this.$input.removeData('bf_ztree_bound');
            }
            $(document).off('.' + this._bf_uid);
            $(window).off('.' + this._bf_uid);
        },

        _bfOpenDropdown: function () {
            var self = this;
            var relation = this.field && this.field.relation;
            if (!relation) {
                return;
            }
            if (!this.$input || !this.$input.length) {
                return;
            }

            this._bfCloseDropdown(true);
            this._bf_dropdown_open = true;

            var $dd = $('<div class="bf_ztree_dropdown_panel"/>');
            var $search = $('<input type="text" class="form-control bf_ztree_dropdown_search" placeholder="' + _.escape(_t('Search...')) + '"/>');
            var $treeBox = $('<div class="bf_ztree_dropdown_treebox"/>');
            var $ul = $('<ul class="ztree"/>');
            var $results = $('<div class="bf_ztree_dropdown_results"/>').hide();

            $treeBox.append($ul);
            $dd.append($search).append($treeBox).append($results);

            $('body').append($dd);
            this._bf_dropdown = $dd;

            this._bfPositionDropdown();

            // Close the standard jQuery UI autocomplete menu if it is open.
            if (this.$input && this.$input.autocomplete) {
                try {
                    this.$input.autocomplete('close');
                } catch (e) {
                    // ignore
                }
            }

            // Close on outside click.
            $(document).on('mousedown.' + this._bf_uid, function (ev) {
                var $t = $(ev.target);
                if ($t.closest($dd).length) {
                    return;
                }
                if (self.$el && $t.closest(self.$el).length) {
                    return;
                }
                self._bfCloseDropdown(false);
            });

            // Reposition on resize/scroll.
            $(window).on('resize.' + this._bf_uid, _.debounce(function () {
                if (self._bf_dropdown_open) {
                    self._bfPositionDropdown();
                }
            }, 80));
            $(window).on('scroll.' + this._bf_uid, _.debounce(function () {
                if (self._bf_dropdown_open) {
                    self._bfPositionDropdown();
                }
            }, 80));

            // Load and init tree.
            var p = this._bf_nodes_cache ? $.when(this._bf_nodes_cache) : this._bfLoadNodes(relation);
            p.then(function (nodes) {
                self._bf_nodes_cache = nodes;
                var treeObj = self._bfInitTree($ul, nodes, function (node) {
                    self._bfSelectNode(node);
                    self._bfCloseDropdown(false);
                });

                // Reflect current selection (if any): expand and select the current value.
                self._bfApplyCurrentSelection(treeObj, $treeBox);

                // Search: simple client-side filter
                $search.on('input.' + self._bf_uid, _.debounce(function () {
                    var q = ($search.val() || '').trim().toLowerCase();
                    if (!q) {
                        $results.hide().empty();
                        $treeBox.show();
                        return;
                    }
                    $treeBox.hide();
                    $results.show().empty();
                    var max = 200;
                    var matches = 0;
                    (nodes || []).forEach(function (n) {
                        if (matches >= max) {
                            return;
                        }
                        if ((n.name || '').toLowerCase().indexOf(q) !== -1) {
                            matches += 1;
                            var $it = $('<div class="bf_ztree_dropdown_item"/>');
                            $it.append($('<div/>').text(n.name || ('' + n.id)));
                            if (n._path) {
                                $it.append($('<small/>').text(n._path));
                            }
                            $it.on('mousedown', function (ev) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                self._bfSelectNode(n);
                                self._bfCloseDropdown(false);
                            });
                            $results.append($it);
                        }
                    });
                    if (!matches) {
                        $results.append($('<div class="bf_ztree_dropdown_empty"/>').text(_t('No matches.')));
                    }
                }, 120));

                // Focus search input for usability.
                $search.focus();
            }).catch(function () {
                // If RPC fails, close dropdown to avoid a broken UI.
                self._bfCloseDropdown(false);
            });
        },

        _bfCloseDropdown: function (silent) {
            this._bf_dropdown_open = false;
            if (this._bf_dropdown) {
                this._bf_dropdown.remove();
                this._bf_dropdown = null;
            }
            // Unbind global listeners (keep input listeners).
            $(document).off('mousedown.' + this._bf_uid);
            $(window).off('resize.' + this._bf_uid);
            $(window).off('scroll.' + this._bf_uid);

            if (!silent && this.$input && this.$input.length) {
                // Keep cursor in field.
                this.$input.focus();
            }
        },

        _bfPositionDropdown: function () {
            if (!this._bf_dropdown || !this.$input || !this.$input.length) {
                return;
            }
            var off = this.$input.offset();
            if (!off) {
                return;
            }
            var h = this.$input.outerHeight();
            var w = Math.max(this.$input.outerWidth(), 320);

            // Guard against viewport overflow (basic).
            var top = off.top + h;
            var left = off.left;

            this._bf_dropdown.css({
                top: top,
                left: left,
                minWidth: w,
                width: w
            });
        },

        // -------------------------------
        // Data + Tree
        // -------------------------------

        _bfLoadNodes: function (relation) {
            var self = this;
            var parentKey = self._bf_ztree_opts.parent_key;
            var fields = ['id', 'name', parentKey, 'display_name'];

            var domain = [];
            var limit = self._bf_ztree_opts.limit || 1000;

            var order = self._bf_ztree_opts.order;
            // Sanitize: never send invalid order (common issue: string 'undefined')
            if (!order || order === 'undefined' || order === 'null') {
                order = null;
            }

            var kwargs = { limit: limit };
            if (order) {
                kwargs.order = order;
            }

            return this._rpc({
                model: relation,
                method: 'search_read',
                args: [domain, fields],
                kwargs: kwargs
            }).then(function (records) {
                records = records || [];

                // Build id->record and compute a readable path for search hints.
                var byId = {};
                records.forEach(function (r) { byId[r.id] = r; });

                function getPid(r) {
                    var v = r[parentKey];
                    if (!v) {
                        return 0;
                    }
                    if (_.isArray(v)) {
                        return v[0] || 0;
                    }
                    if (_.isObject(v) && v.id) {
                        return v.id;
                    }
                    return v || 0;
                }

                function getName(r) {
                    return r.name || r.display_name || ('' + r.id);
                }

                function computePath(r) {
                    var parts = [];
                    var guard = 0;
                    var cur = r;
                    while (cur && guard < 30) {
                        parts.unshift(getName(cur));
                        var pid = getPid(cur);
                        if (!pid) {
                            break;
                        }
                        cur = byId[pid];
                        guard += 1;
                    }
                    return parts.join(' / ');
                }

                return records.map(function (r) {
                    var pid = getPid(r);
                    return {
                        id: r.id,
                        pId: pid,
                        name: getName(r),
                        _path: computePath(r)
                    };
                });
            });
        },

        _bfInitTree: function ($ul, nodes, onSelect) {
            var self = this;
            var expandLevel = self._bf_ztree_opts.expand_level;
            if (isNaN(expandLevel) || expandLevel < 1) {
                expandLevel = 2;
            }

            var setting = {
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        if (onSelect) {
                            onSelect(treeNode);
                        }
                    }
                }
            };

            // Ensure UL has an id for getZTreeObj
            if (!$ul.attr('id')) {
                $ul.attr('id', self._bf_uid + '_ul');
            }

            $.fn.zTree.init($ul, setting, nodes);
            var treeObj = $.fn.zTree.getZTreeObj($ul.attr('id'));
            if (treeObj && treeObj.getNodes) {
                var all = treeObj.transformToArray(treeObj.getNodes());
                all.forEach(function (n) {
                    if (n.level < expandLevel) {
                        treeObj.expandNode(n, true, false, false);
                    }
                });
            }

            return treeObj;
        },

        _bfGetSelectedId: function () {
            // Normalize current many2one value to an integer ID.
            // Odoo 15 can expose multiple shapes depending on lifecycle (tuple, object, raw id).
            var self = this;

            function norm(val) {
                if (!val) {
                    return 0;
                }
                if (_.isNumber(val)) {
                    return val;
                }
                if (_.isString(val)) {
                    var n = parseInt(val, 10);
                    return n || 0;
                }
                if (_.isArray(val)) {
                    return norm(val[0]);
                }
                if (_.isObject(val)) {
                    // Common Odoo shapes: {res_id, display_name}, {id, display_name}, {data:{res_id/id}}
                    return norm(
                        val.res_id ||
                        val.id ||
                        (val.data && (val.data.res_id || val.data.id)) ||
                        (val.value && (val.value.res_id || val.value.id))
                    );
                }
                return 0;
            }

            // Try multiple sources for maximum compatibility.
            var candidates = [];
            candidates.push(this.value);
            if (this.res_id) {
                candidates.push(this.res_id);
            }
            if (this.recordData && this.name) {
                candidates.push(this.recordData[this.name]);
            }
            if (this.record && this.record.data && this.name) {
                candidates.push(this.record.data[this.name]);
            }

            for (var i = 0; i < candidates.length; i++) {
                var id = norm(candidates[i]);
                if (id) {
                    return id;
                }
            }
            return 0;
        },

        _bfApplyCurrentSelection: function (treeObj, $treeBox) {
            try {
                var selectedId = this._bfGetSelectedId();
                if (!selectedId) {
                    return;
                }
                if (!treeObj) {
                    return;
                }

                selectedId = parseInt(selectedId, 10);
                if (!selectedId) {
                    return;
                }

                var node = treeObj.getNodeByParam('id', selectedId, null);
                if (!node) {
                    return;
                }

                // Expand parents chain to make the selected node visible.
                // (zTree DOM nodes may not be fully laid out yet, so we do scroll after a tick.)
                var p = node.getParentNode ? node.getParentNode() : null;
                while (p) {
                    treeObj.expandNode(p, true, false, false);
                    p = p.getParentNode ? p.getParentNode() : null;
                }

                // Expand node itself (if has children) and select.
                treeObj.expandNode(node, true, false, false);
                treeObj.selectNode(node, false);

                // Debug (lightweight): helps validate that selection reflection is active.
                try {
                    console.info('BF bf_web_ztree 14.0.1.0.15 selection applied id=' + selectedId);
                } catch (e2) {}

                // Scroll into view (best effort).
                if ($treeBox && $treeBox.length && node.tId) {
                    window.setTimeout(function () {
                        try {
                            var $a = $('#' + node.tId + '_a');
                            if (!$a.length) {
                                return;
                            }

                            // Prefer native scrollIntoView when available.
                            if ($a[0] && $a[0].scrollIntoView) {
                                try {
                                    $a[0].scrollIntoView({ block: 'center', inline: 'nearest' });
                                    return;
                                } catch (e3) {
                                    // Older browsers: fallback.
                                    $a[0].scrollIntoView(true);
                                    return;
                                }
                            }

                            // Fallback: manual scroll inside the tree box.
                            if ($treeBox[0].getBoundingClientRect && $a[0].getBoundingClientRect) {
                                var boxRect = $treeBox[0].getBoundingClientRect();
                                var aRect = $a[0].getBoundingClientRect();
                                var delta = aRect.top - boxRect.top;
                                var target = $treeBox.scrollTop() + delta - (($treeBox.height() || 0) / 2);
                                $treeBox.scrollTop(Math.max(0, target));
                            }
                        } catch (e4) {
                            // ignore
                        }
                    }, 0);
                }
            } catch (e) {
                // Never break UI due to selection reflection.
            }
        },

        _bfSelectNode: function (node) {
            var self = this;
            if (!node || !node.id) {
                return;
            }
            // Write ID to the field.
            self._setValue(node.id);
            // Best-effort: update the visible label immediately.
            if (self.$input && self.$input.length) {
                self.$input.val(node._path || node.name || ('' + node.id));
            }
        }
    });

    field_registry.add('ztree_select', FieldZTreeSelect);

    return FieldZTreeSelect;
});
