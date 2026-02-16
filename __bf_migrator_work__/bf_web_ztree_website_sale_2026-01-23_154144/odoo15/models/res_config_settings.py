import logging

from odoo import api, fields, models

_logger = logging.getLogger(__name__)


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    bf_ztree_public_category_enabled = fields.Boolean(
        string='Enable zTree for Product Public Categories',
        help='When enabled, product.template public categories will use the zTree multi-select widget.'
    )

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        icp = self.env['ir.config_parameter'].sudo()
        v = icp.get_param('bf_web_ztree_website_sale.public_category_enabled', default='1')
        res.update(
            bf_ztree_public_category_enabled=str(v).lower() in ('1', 'true', 'yes', 'y', 'on'),
        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        icp = self.env['ir.config_parameter'].sudo()
        icp.set_param(
            'bf_web_ztree_website_sale.public_category_enabled',
            '1' if self.bf_ztree_public_category_enabled else '0'
        )
        _logger.info(
            'BF bf_web_ztree_website_sale settings saved: public_category_enabled=%s',
            self.bf_ztree_public_category_enabled,
        )
