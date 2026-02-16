# -*- coding: utf-8 -*-

import logging
from lxml import etree

from odoo import api, models, fields

_logger = logging.getLogger(__name__)

_KEY = 'bf_web_ztree_product'


def _bf_enabled(env):
    icp = env['ir.config_parameter'].sudo()
    val = icp.get_param('%s.enabled' % _KEY, default='1')
    return val not in ('0', 'false', 'False', False, None, '')


def _bf_parent_key(env, comodel_name):
    """Return the parent field key for hierarchical models (e.g., parent_id, location_id)."""
    try:
        Model = env[comodel_name]
    except Exception:
        return None
    for cand in ('parent_id', 'location_id'):
        f = Model._fields.get(cand)
        if f and isinstance(f, fields.Many2one) and f.comodel_name == comodel_name:
            return cand
    return None


def _bf_inject(doc, recordset, field_names):
    changed = False
    for fname in field_names:
        f = recordset._fields.get(fname)
        if not f or not isinstance(f, fields.Many2one):
            continue
        parent_key = _bf_parent_key(recordset.env, f.comodel_name)
        if not parent_key:
            continue
        for node in doc.xpath("//field[@name='%s']" % fname):
            if node.get('widget'):
                continue
            node.set('widget', 'ztree_select')
            if not node.get('ztree_parent_key'):
                node.set('ztree_parent_key', parent_key)
            changed = True
    return changed


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    @api.model
    def fields_view_get(self, view_id=None, view_type='form', toolbar=False, submenu=False):
        res = super(ProductTemplate, self).fields_view_get(view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu)
        if view_type not in ('form', 'tree'):
            return res
        if not _bf_enabled(self.env):
            return res
        arch = res.get('arch')
        if not arch:
            return res
        try:
            doc = etree.fromstring(arch.encode('utf-8'))
        except Exception as e:
            _logger.debug("BF %s: failed to parse view arch (model=%s, view_type=%s, view_id=%s): %s", _KEY, self._name, view_type, view_id, e)
            return res
        changed = _bf_inject(doc, self, ['categ_id'])
        if changed:
            res['arch'] = etree.tostring(doc, encoding='unicode')
            _logger.info("BF %s: injected ztree_select (model=%s, view_type=%s, view_id=%s)", _KEY, self._name, view_type, view_id)
        return res


class ProductProduct(models.Model):
    _inherit = 'product.product'

    @api.model
    def fields_view_get(self, view_id=None, view_type='form', toolbar=False, submenu=False):
        res = super(ProductProduct, self).fields_view_get(view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu)
        if view_type not in ('form', 'tree'):
            return res
        if not _bf_enabled(self.env):
            return res
        arch = res.get('arch')
        if not arch:
            return res
        try:
            doc = etree.fromstring(arch.encode('utf-8'))
        except Exception as e:
            _logger.debug("BF %s: failed to parse view arch (model=%s, view_type=%s, view_id=%s): %s", _KEY, self._name, view_type, view_id, e)
            return res
        changed = _bf_inject(doc, self, ['categ_id'])
        if changed:
            res['arch'] = etree.tostring(doc, encoding='unicode')
            _logger.info("BF %s: injected ztree_select (model=%s, view_type=%s, view_id=%s)", _KEY, self._name, view_type, view_id)
        return res
