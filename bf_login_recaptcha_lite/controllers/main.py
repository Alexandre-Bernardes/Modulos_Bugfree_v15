# -*- coding: utf-8 -*-
from odoo import http, _
from odoo.http import request

class BfReCaptchaController(http.Controller):

    @http.route('/bf_recaptcha/status', type='json', auth='public', csrf=False)
    def status(self):
        icp = request.env['ir.config_parameter'].sudo()
        site_key = icp.get_param('bf_login_recaptcha_lite.site_key') or ''
        try:
            threshold = int(icp.get_param('bf_login_recaptcha_lite.fail_threshold') or 0)
        except Exception:
            threshold = 0
        failures = int(request.session.get('bf_login_failures', 0) or 0)
        require = True if threshold == 0 else (failures >= threshold)
        return {"require": bool(require), "site_key": site_key}

    @http.route('/bf_recaptcha/fail_bump', type='json', auth='public', csrf=False)
    def fail_bump(self):
        failures = int(request.session.get('bf_login_failures', 0) or 0) + 1
        request.session['bf_login_failures'] = failures
        return {"failures": failures}


from odoo.addons.web.controllers.main import Home

class HomeRecaptcha(Home):
    @http.route('/web/login', type='http', auth='public', website=True, sitemap=False)
    def web_login(self, redirect=None, **kw):
        # Enforce reCAPTCHA only when threshold/failed-attempts require it
        if request.httprequest.method == 'POST':
            icp = request.env['ir.config_parameter'].sudo()
            try:
                threshold = int(icp.get_param('bf_login_recaptcha_lite.fail_threshold') or 0)
            except Exception:
                threshold = 0
            failures = int(request.session.get('bf_login_failures', 0) or 0)
            require = True if threshold == 0 else (failures >= threshold)

            if require:
                # Token can come via standard v2 field 'g-recaptcha-response'
                token = kw.get('g-recaptcha-response') or request.httprequest.form.get('g-recaptcha-response')
                if not token:
                    # Block login immediately if token missing
                    qcontext = {'error': _('Please complete the reCAPTCHA verification.')}
                    request.session['bf_login_failures'] = failures + 1
                    return request.render('web.login', qcontext)
                # If secret is configured, verify with Google
                secret = icp.get_param('bf_login_recaptcha_lite.secret_key') or ''
                if secret:
                    try:
                        import urllib.request, urllib.parse, json as _json
                        payload = urllib.parse.urlencode({
                            'secret': secret,
                            'response': token,
                            'remoteip': request.httprequest.remote_addr or ''
                        }).encode()
                        req = urllib.request.Request('https://www.google.com/recaptcha/api/siteverify', data=payload)
                        with urllib.request.urlopen(req, timeout=5) as resp:
                            result = _json.loads(resp.read().decode('utf-8'))
                        if not result.get('success'):
                            qcontext = {'error': _('reCAPTCHA verification failed. Please try again.')}
                            request.session['bf_login_failures'] = failures + 1
                            return request.render('web.login', qcontext)
                    except Exception:
                        qcontext = {'error': _('reCAPTCHA verification error. Please try again.')}
                        request.session['bf_login_failures'] = failures + 1
                        return request.render('web.login', qcontext)

        return super(HomeRecaptcha, self).web_login(redirect=redirect, **kw)
