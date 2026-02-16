# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    bf_ztree_product_enabled = fields.Boolean(string="Enable zTree on targeted fields")

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        icp = self.env['ir.config_parameter'].sudo()
        val = icp.get_param('bf_web_ztree_product.enabled', default='1')
        res.update({
            'bf_ztree_product_enabled': (val not in ('0', 'false', 'False', False, None, '')),
        })
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        icp = self.env['ir.config_parameter'].sudo()
        icp.set_param('bf_web_ztree_product.enabled', '1' if getattr(self, 'bf_ztree_product_enabled') else '0')
