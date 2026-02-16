/* Minimal zTree-compatible core for Odoo 12.
 * Provides only a subset of the original API required by bf_web_ztree.
 *
 * NOTE: This is NOT the full upstream zTree distribution.
 */
(function ($) {
    'use strict';

    if (!$ || !$.fn) {
        return;
    }

    if ($.fn.zTree && $.fn.zTree.init) {
        // Already available.
        return;
    }

    var _instances = {};

    function _buildIndex(nodes) {
        var byId = {};
        (nodes || []).forEach(function (n) {
            if (!n) return;
            byId[n.id] = n;
            n.children = [];
            n.open = !!n.open;
            n._parent = null;
            // Upstream-compatible hook used by the widget.
            n.getParentNode = function () {
                return this._parent || null;
            };
        });
        (nodes || []).forEach(function (n) {
            if (!n) return;
            var pid = n.pId || 0;
            if (pid && byId[pid]) {
                byId[pid].children.push(n);
                n._parent = byId[pid];
            }
        });
        var roots = [];
        (nodes || []).forEach(function (n) {
            if (!n) return;
            var pid = n.pId || 0;
            if (!pid || !byId[pid]) {
                roots.push(n);
            }
        });
        return { byId: byId, roots: roots };
    }

    function _renderTree($ul, roots, opts) {
        $ul.empty();
        $ul.addClass('ztree');

        // Deterministic node ids for DOM lookup (compat with upstream zTree).
        var treeId = $ul.attr('id') || '';

        function renderNode(node, level, $parentUl) {
            var hasChildren = node.children && node.children.length;

            var $li = $('<li/>').addClass('level' + level);
            node.level = level;
            node.tId = (treeId ? (treeId + '_') : 'ztree_') + ('' + node.id);
            $li.attr('id', node.tId);
            node._li = $li;

            var $toggle = $('<span/>').addClass('switch');
            var $label = $('<a href="#"/>')
                .addClass('node_name')
                .attr('id', node.tId + '_a')
                .text(node.name || ('' + node.id));
            node._a = $label;

            if (hasChildren) {
                $toggle.addClass(node.open ? 'open' : 'close');
            } else {
                $toggle.addClass('noop');
            }

            $li.append($toggle).append($label);

            var $childUl = null;
            if (hasChildren) {
                $childUl = $('<ul/>').addClass('level' + (level + 1));
                node._childrenUl = $childUl;
                if (!node.open) {
                    $childUl.hide();
                }
                $li.append($childUl);
            }

            // Toggle behavior
            $toggle.on('mousedown', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                if (!hasChildren) return;
                node.open = !node.open;
                $toggle.toggleClass('open', node.open).toggleClass('close', !node.open);
                if (node._childrenUl) {
                    node._childrenUl.toggle(!!node.open);
                }
            });

            // Click select
            $label.on('mousedown', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                // visual selection
                $ul.find('a.node_name.selected, a.node_name.curSelectedNode').removeClass('selected curSelectedNode');
                $label.addClass('selected curSelectedNode');
                if (opts && opts.onClick) {
                    try {
                        opts.onClick(ev, $ul.attr('id') || '', node);
                    } catch (e) {
                        // ignore
                    }
                }
            });

            $parentUl.append($li);

            if (hasChildren) {
                node.children.forEach(function (c) {
                    renderNode(c, level + 1, $childUl);
                });
            }
        }

        (roots || []).forEach(function (r) {
            renderNode(r, 0, $ul);
        });
    }

    function ZTreeObj(treeId, roots) {
        this._treeId = treeId;
        this._roots = roots || [];
        this._byId = {};
        this._$ul = null;
    }

    ZTreeObj.prototype._setIndex = function (byId, $ul) {
        this._byId = byId || {};
        this._$ul = $ul || null;
    };

    ZTreeObj.prototype.getNodes = function () {
        return this._roots;
    };

    ZTreeObj.prototype.transformToArray = function (nodes) {
        var out = [];
        function walk(arr) {
            (arr || []).forEach(function (n) {
                out.push(n);
                if (n.children && n.children.length) {
                    walk(n.children);
                }
            });
        }
        walk(nodes || this._roots);
        return out;
    };

    ZTreeObj.prototype.expandNode = function (node, expand) {
        if (!node) return;
        node.open = !!expand;
        if (node._childrenUl) {
            node._childrenUl.toggle(!!expand);
        }
        if (node._li) {
            node._li.find('> span.switch').toggleClass('open', !!expand).toggleClass('close', !expand);
        }
    };

    ZTreeObj.prototype.getNodeByParam = function (key, value, parentNode) {
        if (!key) return null;
        // Fast-path: id lookup.
        if (key === 'id' && this._byId) {
            var n = this._byId[value];
            if (n) return n;
            // Handle string/int mismatch.
            var iv = parseInt(value, 10);
            if (iv && this._byId[iv]) return this._byId[iv];
        }
        var roots = parentNode ? (parentNode.children || []) : this._roots;
        var stack = (roots || []).slice();
        while (stack.length) {
            var cur = stack.shift();
            if (cur && cur[key] === value) {
                return cur;
            }
            if (cur && cur.children && cur.children.length) {
                stack = stack.concat(cur.children);
            }
        }
        return null;
    };

    ZTreeObj.prototype.selectNode = function (node) {
        if (!node) return;
        var $ul = this._$ul;
        if ($ul && $ul.length) {
            $ul.find('a.node_name.selected, a.node_name.curSelectedNode').removeClass('selected curSelectedNode');
        }
        if (node._a) {
            node._a.addClass('selected curSelectedNode');
        }
    };

    // Public API
    $.fn.zTree = {
        init: function ($ul, setting, nodes) {
            var $tree = ($ul && $ul.jquery) ? $ul : $($ul);
            var treeId = $tree.attr('id') || ('ztree_' + Math.floor(Math.random() * 1000000));
            $tree.attr('id', treeId);

            var idx = _buildIndex(nodes || []);
            var cb = (setting && setting.callback && setting.callback.onClick) ? setting.callback.onClick : null;

            _renderTree($tree, idx.roots, { onClick: cb });

            var obj = new ZTreeObj(treeId, idx.roots);
            obj._setIndex(idx.byId, $tree);
            _instances[treeId] = obj;
            return obj;
        },
        getZTreeObj: function (treeId) {
            return _instances[treeId] || null;
        }
    };
})(window.jQuery);
