# -*- coding: utf-8 -*-
import logging
from odoo import api, models

_logger = logging.getLogger(__name__)


def _bf_apply_ztree_widget(arch, field_names, widget='ztree_select'):
    """Safely inject widget attribute into <field name="..."> nodes.

    - Does NOT override an existing widget.
    - Ignores parsing errors.
    """
    if not arch or not field_names:
        return arch
    try:
        from lxml import etree
        doc = etree.fromstring(arch.encode('utf-8'))
    except Exception as e:
        _logger.warning('BF zTree AutoTargets: unable to parse view arch: %s', e)
        return arch

    changed = False
    for fname in field_names:
        try:
            nodes = doc.xpath("//field[@name='%s']" % fname)
        except Exception:
            nodes = []
        for node in nodes:
            if not node.get('widget'):
                node.set('widget', widget)
                changed = True

    if not changed:
        return arch

    try:
        new_arch = etree.tostring(doc, encoding='unicode')
    except Exception as e:
        _logger.warning('BF zTree AutoTargets: unable to serialize view arch: %s', e)
        return arch

    _logger.info('BF zTree AutoTargets: applied widget=%s to fields=%s', widget, ','.join(field_names))
    return new_arch


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    @api.model
    def fields_view_get(self, view_id=None, view_type='form', toolbar=False, submenu=False):
        res = super(ProductTemplate, self).fields_view_get(view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu)
        if view_type not in ('form', 'tree'):
            return res
        arch = res.get('arch')
        if not arch:
            return res
        res['arch'] = _bf_apply_ztree_widget(arch, ['categ_id'])
        return res



class ProductProduct(models.Model):
    _inherit = 'product.product'

    @api.model
    def fields_view_get(self, view_id=None, view_type='form', toolbar=False, submenu=False):
        res = super(ProductProduct, self).fields_view_get(view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu)
        if view_type not in ('form', 'tree'):
            return res
        arch = res.get('arch')
        if not arch:
            return res
        res['arch'] = _bf_apply_ztree_widget(arch, ['categ_id'])
        return res

