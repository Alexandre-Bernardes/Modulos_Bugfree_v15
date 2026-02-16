console.info('BF bf_web_ztree_website_sale 16.0.1.0.5 loaded (ztree_m2m_select.js)');
odoo.define('bf_web_ztree_website_sale.ztree_m2m_select', function (require) {
    'use strict';

    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var relational_fields = require('web.relational_fields');
    var field_registry = require('web.field_registry');

    var _t = core._t;

    /**
     * zTree selector for many2many fields.
     *
     * Target use case (Odoo 15 CE): product.template.public_categ_ids (website public categories)
     * which is typically rendered with widget="many2many_tags".
     *
     * This widget keeps the tags UI, but replaces the selection UI with a zTree dialog
     * that supports multi-selection via checkboxes.
     */

    var FieldMany2ManyTags = relational_fields.FieldMany2ManyTags;

    var FieldZTreeM2MSelect = FieldMany2ManyTags.extend({
        className: (FieldMany2ManyTags.prototype.className || '') + ' bf_ztree_m2m_select',
        events: _.extend({}, FieldMany2ManyTags.prototype.events, {
            'click .bf_ztree_m2m_btn': '_onOpenZTree',
        }),

        init: function () {
            this._super.apply(this, arguments);
            this._bf_uid = _.uniqueId('bf_ztree_m2m_');
        },

        start: function () {
            // Load marker for troubleshooting asset cache issues.
            try {
                var v = (this && this.view && this.view.arch && this.view.arch.attrs && this.view.arch.attrs['data-version']) || '';
                // Version is not reliably available in Odoo 15 runtime; keep it simple.
                console.info('BF bf_web_ztree_website_sale 14.0.1.0.4 loaded (ztree_m2m_select.js)');
            } catch (e) { /* noop */ }
            return this._super.apply(this, arguments);
        },

        _renderEdit: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                self._bfEnsureButton();
            });
        },

        _renderReadonly: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                self._bfEnsureButton(true);
            });
        },

        _bfEnsureButton: function (readonly) {
            // Keep the standard tags rendering, just add a compact button.
            if (this.$('.bf_ztree_m2m_btn').length) {
                return;
            }
            var $btn = $('<span/>', {
                'class': 'bf_ztree_m2m_btn fa fa-sitemap',
                'title': _t('Selecionar na árvore'),
                'tabindex': readonly ? -1 : 0,
            });
            // Place button near the tags container.
            this.$el.append($btn);
        },

        _bfGetSelectedIds: function () {
            // Extract current m2m ids in a defensive way.
            var ids = [];
            try {
                // Odoo 15 basic_model stores m2m values in different shapes.
                if (this.value) {
                    if (_.isArray(this.value.res_ids)) {
                        ids = this.value.res_ids.slice(0);
                    } else if (_.isArray(this.value.data)) {
                        ids = this.value.data.map(function (r) { return r.id; });
                    } else if (_.isArray(this.value)) {
                        // Sometimes it's already a list of ids
                        ids = this.value.slice(0);
                    }
                }
            } catch (e) { /* noop */ }
            ids = (ids || []).filter(function (x) { return !!x; });
            // Normalize to integers
            return ids.map(function (x) { return parseInt(x, 10); }).filter(function (x) { return !isNaN(x) && x > 0; });
        },

        _bfLoadNodes: function (relation, parentKey) {
            var fields = ['id', 'name', parentKey, 'display_name'];
            return this._rpc({
                model: relation,
                method: 'search_read',
                args: [[], fields],
                kwargs: { limit: 20000 },
            }).then(function (records) {
                records = records || [];

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

                return records.map(function (r) {
                    return {
                        id: r.id,
                        pId: getPid(r),
                        name: getName(r),
                    };
                });
            });
        },

        _bfExpandParents: function (treeObj, node) {
            if (!treeObj || !node) {
                return;
            }
            var cur = node.getParentNode && node.getParentNode();
            var guard = 0;
            while (cur && guard < 60) {
                treeObj.expandNode(cur, true, false, false);
                cur = cur.getParentNode && cur.getParentNode();
                guard += 1;
            }
        },

        _bfScrollIntoView: function ($container, treeId, node) {
            try {
                if (!node) {
                    return;
                }
                // zTree uses aId like "treeDemo_1_a". We can locate by node.tId.
                var $a = $('#' + node.tId + '_a');
                if (!$a.length) {
                    return;
                }
                var contTop = $container.scrollTop();
                var contH = $container.height();
                var aTop = $a.position().top;
                var aH = $a.outerHeight();

                if (aTop < 0) {
                    $container.scrollTop(contTop + aTop - 20);
                } else if ((aTop + aH) > contH) {
                    $container.scrollTop(contTop + (aTop + aH - contH) + 20);
                }
            } catch (e) { /* noop */ }
        },

        _onOpenZTree: function (ev) {
            ev.preventDefault();
            ev.stopPropagation();

            var self = this;
            var relation = (this.field && this.field.relation) || (this.field && this.field.comodel_name);
            if (!relation) {
                return;
            }

            var parentKey = (this.nodeOptions && this.nodeOptions.ztree_parent_key) || 'parent_id';
            var selectedIds = this._bfGetSelectedIds();

            var $wrap = $('<div/>', { 'class': 'bf_ztree_m2m_dialog' });
            var $hint = $('<div/>', {
                'class': 'text-muted',
                'text': _t('Marque as categorias desejadas e confirme.'),
            });
            var $treeBox = $('<div/>', { 'class': 'bf_ztree_m2m_box' });
            var $ul = $('<ul/>', {
                'class': 'ztree',
                'id': self._bf_uid + '_ul',
            });
            $treeBox.append($ul);
            $wrap.append($hint).append($treeBox);

            var dialog = new Dialog(this, {
                title: _t('Selecionar categorias (zTree)'),
                size: 'large',
                $content: $wrap,
                buttons: [
                    {
                        text: _t('Aplicar'),
                        classes: 'btn-primary',
                        close: true,
                        click: function () {
                            if (!self._bf_treeObj) {
                                return;
                            }
                            var checked = self._bf_treeObj.getCheckedNodes(true) || [];
                            var ids = checked.map(function (n) { return n.id; });
                            ids = (ids || []).map(function (x) { return parseInt(x, 10); }).filter(function (x) { return !isNaN(x) && x > 0; });
                            // Replace full set (deterministic)
                            self._setValue({ operation: 'REPLACE_WITH', ids: ids });
                        },
                    },
                    { text: _t('Cancelar'), close: true },
                ],
            });

            dialog.opened().then(function () {
                // Load nodes then init zTree with checkboxes.
                return self._bfLoadNodes(relation, parentKey).then(function (nodes) {
                    var setting = {
                        check: {
                            enable: true,
                            chkboxType: { 'Y': 'ps', 'N': 'ps' },
                        },
                        data: {
                            simpleData: {
                                enable: true,
                            },
                        },
                    };

                    $.fn.zTree.init($ul, setting, nodes);
                    self._bf_treeObj = $.fn.zTree.getZTreeObj($ul.attr('id'));

                    // Pre-check current selection
                    if (self._bf_treeObj && selectedIds && selectedIds.length) {
                        selectedIds.forEach(function (id) {
                            var n = self._bf_treeObj.getNodeByParam('id', id);
                            if (n) {
                                self._bfExpandParents(self._bf_treeObj, n);
                                self._bf_treeObj.checkNode(n, true, false, false);
                            }
                        });

                        // Focus first selected node (expand/select/scroll)
                        var focus = self._bf_treeObj.getNodeByParam('id', selectedIds[0]);
                        if (focus) {
                            self._bfExpandParents(self._bf_treeObj, focus);
                            self._bf_treeObj.selectNode(focus, false);
                            self._bfScrollIntoView($treeBox, $ul.attr('id'), focus);
                        }
                    } else if (self._bf_treeObj) {
                        // Expand first levels for usability
                        var roots = self._bf_treeObj.getNodes();
                        var all = self._bf_treeObj.transformToArray(roots);
                        all.forEach(function (n) {
                            if (n.level < 2) {
                                self._bf_treeObj.expandNode(n, true, false, false);
                            }
                        });
                    }
                });
            });

            dialog.open();
        },
    });

    field_registry.add('ztree_m2m_select', FieldZTreeM2MSelect);

    return FieldZTreeM2MSelect;
});
