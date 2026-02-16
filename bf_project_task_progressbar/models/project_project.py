# -*- coding: utf-8 -*-
import logging

from odoo import api, fields, models

_logger = logging.getLogger(__name__)


class ProjectProject(models.Model):
    _inherit = 'project.project'

    bf_task_total_count = fields.Integer(
        string='Total Tasks',
        compute='_compute_bf_task_counts',
    )
    bf_task_done_count = fields.Integer(
        string='Done Tasks',
        compute='_compute_bf_task_counts',
    )
    bf_task_open_count = fields.Integer(
        string='Open Tasks',
        compute='_compute_bf_task_counts',
        help='Open tasks are those whose stage is not folded (fold=False).',
    )
    bf_task_progress = fields.Float(
        string='Task Progress',
        compute='_compute_bf_task_counts',
        digits=(16, 2),
        help='Percent of done tasks over total tasks (0-100).',
    )
    bf_task_xy_display = fields.Char(
        string='Open/Total',
        compute='_compute_bf_task_counts',
        help='Display helper for smart button: open/total (e.g., 5/10).',
    )


    @api.depends('task_ids', 'task_ids.stage_id', 'task_ids.stage_id.fold')
    def _compute_bf_task_counts(self):
        # Done tasks are those whose stage is folded (fold=True), which is the
        # standard Odoo convention for "closed" stages in Project.
        if not self.ids:
            return

        Task = self.env['project.task']

        total_group = Task.read_group(
            [('project_id', 'in', self.ids)],
            ['project_id'],
            ['project_id'],
            lazy=False,
        )
        total_map = {
            g['project_id'][0]: g.get('project_id_count', g.get('__count', 0))
            for g in total_group
            if g.get('project_id')
        }

        done_group = Task.read_group(
            [('project_id', 'in', self.ids), ('stage_id.fold', '=', True)],
            ['project_id'],
            ['project_id'],
            lazy=False,
        )
        done_map = {
            g['project_id'][0]: g.get('project_id_count', g.get('__count', 0))
            for g in done_group
            if g.get('project_id')
        }

        _logger.debug('BF bf_project_task_progressbar 12.0.1.1.20 computing task progress for %s project(s)', len(self))

        for project in self:
            total = int(total_map.get(project.id, 0) or 0)
            done = int(done_map.get(project.id, 0) or 0)
            if done > total:
                done = total

            open_count = total - done
            if open_count < 0:
                open_count = 0

            project.bf_task_total_count = total
            project.bf_task_done_count = done
            project.bf_task_open_count = open_count
            project.bf_task_xy_display = '%s/%s' % (open_count, total)
            project.bf_task_progress = (done * 100.0 / total) if total else 0.0


    def action_view_task(self):
        """Open Tasks kanban/tree/form filtered by this project (compat helper)."""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Tasks',
            'res_model': 'project.task',
            'view_mode': 'kanban,tree,form',
            'views': [(False, 'kanban'), (False, 'tree'), (False, 'form')],
            'target': 'current',
            'domain': [('project_id', '=', self.id)],
            'context': {
                'default_project_id': self.id,
                'search_default_project_id': self.id,
            },
        }

    def action_view_tasks(self):
        """Alias for compatibility."""
        self.ensure_one()
        return self.action_view_task()
