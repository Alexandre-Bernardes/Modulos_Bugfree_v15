# -*- coding: utf-8 -*-
from odoo import api, fields, models


class ProjectTask(models.Model):
    _inherit = 'project.task'

    bf_progress_state = fields.Selection(
        selection=[
            ('open', 'Open'),
            ('done', 'Done'),
        ],
        string='Progress State',
        compute='_compute_bf_progress_state',
        store=True,
        help="Derived progress state for reporting: Done when the stage is folded in kanban (stage_id.fold=True).",
    )

    @api.depends('stage_id', 'stage_id.fold')
    def _compute_bf_progress_state(self):
        for task in self:
            task.bf_progress_state = 'done' if (task.stage_id and task.stage_id.fold) else 'open'
