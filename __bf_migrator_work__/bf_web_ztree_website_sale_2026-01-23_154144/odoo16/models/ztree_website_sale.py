# -*- coding: utf-8 -*-
import logging

from lxml import etree

from odoo import api, fields, models

_logger = logging.getLogger(__name__)


def _bf_truthy(v, default=True):
    if v is None:
        return default
    return str(v).lower() in ('1', 'true', 'yes', 'y', 'on')


def _bf_parent_key(env, comodel):
    """Detect a parent m2o field for hierarchical models (best-effort)."""
    try:
        model = env[comodel]
    except Exception:
        return 'parent_id'

    if 'parent_id' in model._fields:
        return 'parent_id'

    # Fallback: any many2one to itself
    for fname, f in model._fields.items():
        try:
            if isinstance(f, fields.Many2one) and getattr(f, 'comodel_name', None) == comodel:
                return fname
        except Exception:
            continue

    return 'parent_id'


def _bf_inject_m2m_widget(env, res, model, field_name, widget_name):
    """Inject widget in *runtime* arch (no view inheritance/xpath), to keep stability."""
    if not res or not res.get('arch'):
        return res

    if not hasattr(model, '_fields') or field_name not in model._fields:
        return res

    f = model._fields.get(field_name)
    if not isinstance(f, fields.Many2many):
        return res

    try:
        doc = etree.fromstring(res['arch'].encode('utf-8'))
    except Exception:
        return res

    nodes = doc.xpath("//field[@name='%s']" % field_name)
    if not nodes:
        return res

    parent_key = _bf_parent_key(env, f.comodel_name)

    changed = 0
    for node in nodes:
        # Only override when widget is absent OR it's the default m2m tags widget.
        # In Odoo 12, website_sale uses widget="many2many_tags" for public categories.
        # If we never override that, the zTree widget will never be applied.
        w = (node.get('widget') or '').strip()
        if w and w not in ('many2many_tags',):
            continue
        node.set('widget', widget_name)
        node.set('ztree_parent_key', parent_key)
        changed += 1

    if changed:
        res['arch'] = etree.tostring(doc, encoding='unicode')
        _logger.info(
            'BF bf_web_ztree_website_sale injected widget=%s on %s.%s (nodes=%s, parent_key=%s)',
            widget_name, model._name, field_name, changed, parent_key,
        )

    return res


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    @api.model
    def fields_view_get(self, view_id=None, view_type='form', toolbar=False, submenu=False):
        res = super(ProductTemplate, self).fields_view_get(
            view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu
        )

        if view_type not in ('form', 'tree'):
            return res

        icp = self.env['ir.config_parameter'].sudo()
        enabled = _bf_truthy(icp.get_param('bf_web_ztree_website_sale.public_category_enabled', default='1'), True)
        if not enabled:
            return res

        # Website Sale: public categories on products (m2m)
        return _bf_inject_m2m_widget(self.env, res, self, 'public_categ_ids', 'ztree_m2m_select')
