# -*- coding: utf-8 -*-
{
    'name': 'Bugfree Project Task Progress Bar',
    'summary': 'Project Kanban progress bar + PercentPie Tasks smart button (Open/Total)',
    'version': '15.0.1.1.28',
    'category': 'Project',
    'license': 'OPL-1',
    'author': 'Bugfree do Brasil/Centurion Info (Alexandre Bernardes, Arthur Bernardes)',
    'contributors': [
        'Alexandre Bernardes <centurion.bernardes@gmail.com>',
        'Arthur Bernardes <a.bernardes.domingues@gmail.com>',
    ],
    'website': 'https://bugfree.com.br',
    'price': 10.0,
    'currency': 'USD',
    'depends': ['web', 'project'],
    'data': [
        # NOTE: do NOT inherit web.assets_backend via XML (some builds don't expose it as an xmlid).
        'views/project_project_kanban_view.xml',
        'views/project_project_form_smartbutton.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'bf_project_task_progressbar/static/src/css/project_kanban_task_progress.css',
            'bf_project_task_progressbar/static/src/js/project_kanban_task_progress.js',
        ],
    },
    'images': [
        'static/description/banner.png',
        'static/description/screenshot_1.png',
        'static/description/screenshot_2.png',
        'static/description/icon.png',
    ],
    'installable': True,
    'application': False,
}
