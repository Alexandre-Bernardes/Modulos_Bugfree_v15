{
    'name': 'Bugfree zTree Website Sale',
    'version': '15.0.1.0.5',
    'summary': 'Apply zTree widgets to Website Sale fields (public categories) in Odoo 15.',
    'description': """
Bugfree zTree Website Sale
=========================

Adds a zTree multi-select widget for Product Public Categories (website_sale) and injects it automatically
into existing views when the related field is present.

Notes
-----
- Requires bf_web_ztree (base zTree widget and assets).
- After install/upgrade: restart Odoo and clear caches (browser/CDN/asset bundles).
""",
    'author': 'Bugfree do Brasil/Centurion Info (Alexandre Bernardes, Arthur Bernardes)',
    'contributors': 'Alexandre Bernardes <centurion.bernardes@gmail.com>, Arthur Bernardes <a.bernardes.domingues@gmail.com>',
    'website': 'https://bugfree.com.br',
    'license': 'OPL-1',
    'price': 10.0,
    'currency': 'USD',
    'category': 'Web',
    'depends': ['web', 'product', 'website_sale', 'bf_web_ztree', 'bf_web_ztree_m2m'],
    'data': [
        'views/res_config_settings_views.xml',
    ],
    'installable': True,
    'application': False,
}
