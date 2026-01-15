# -*- coding: utf-8 -*-
{
    "name": "Bugfree Login reCAPTCHA (Lite)",
    "summary": "Adds Google reCAPTCHA to Odoo login and shows it after N failed attempts.",
    "version": "15.0.1.0.2",
    "author": "Bugfree do Brasil",
    "website": "https://bugfree.com.br",
    "license": "OPL-1",
    "category": "Tools",
    "depends": ["base", "web"],
    'images': ['static/description/banner.png', 'static/description/icon.png'],
    "data": [
        "views/res_config_settings_views.xml",
    ],
    "qweb": [],
    "installable": True,
    'assets': {
        'web.assets_frontend': [
            'bf_login_recaptcha_lite/static/src/js/recaptcha_login.js',
            'bf_login_recaptcha_lite/static/src/js/recaptcha_enforce.js',
        ],
        'web.assets_backend': [
            'bf_login_recaptcha_lite/static/src/js/recaptcha_login.js',
            'bf_login_recaptcha_lite/static/src/js/recaptcha_enforce.js',
        ],
    },
    "application": False,
	"price": 8.0,
    "currency": "USD",
}
