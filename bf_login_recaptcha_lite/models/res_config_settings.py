# -*- coding: utf-8 -*-
from odoo import api, fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    bf_recaptcha_site_key = fields.Char(string="reCAPTCHA Site Key")
    bf_recaptcha_secret_key = fields.Char(string="reCAPTCHA Secret Key")
    bf_recaptcha_fail_threshold = fields.Integer(string="Falhas antes de exigir reCAPTCHA", default=0)

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        icp = self.env['ir.config_parameter'].sudo()
        icp.set_param('bf_login_recaptcha_lite.site_key', self.bf_recaptcha_site_key or '')
        icp.set_param('bf_login_recaptcha_lite.secret_key', self.bf_recaptcha_secret_key or '')
        icp.set_param('bf_login_recaptcha_lite.fail_threshold', str(self.bf_recaptcha_fail_threshold or 0))

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        icp = self.env['ir.config_parameter'].sudo()
        res.update(
            bf_recaptcha_site_key=icp.get_param('bf_login_recaptcha_lite.site_key', default=''),
            bf_recaptcha_secret_key=icp.get_param('bf_login_recaptcha_lite.secret_key', default=''),
            bf_recaptcha_fail_threshold=int(icp.get_param('bf_login_recaptcha_lite.fail_threshold', default='0') or 0),
        )
        return res