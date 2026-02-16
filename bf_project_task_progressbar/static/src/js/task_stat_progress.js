console.info('BF bf_project_task_progressbar 15.0.1.1.27 loaded (task_stat_progress.js)');
console.info('BF bf_project_task_progressbar 14.0.1.1.27 loaded (task_stat_progress.js)');
console.info('BF bf_project_task_progressbar 13.0.1.1.26 loaded (task_stat_progress.js)');
odoo.define('bf_project_task_progressbar.task_stat_progress', function (require) {
    'use strict';

    var core = require('web.core');
    var fieldRegistry = require('web.field_registry');
    var AbstractField = require('web.AbstractField');

    var QWeb = core.qweb;
    var _t = core._t;

    var BfStatProgress = AbstractField.extend({
        template: 'bf_project_task_progressbar.BfStatProgress',
        supportedFieldTypes: ['float', 'integer'],

        init: function () {
            this._super.apply(this, arguments);
            this._opts = this.nodeOptions || {};
        },

        _render: function () {
            var totalField = this._opts.total_field || 'bf_task_total_count';
            var doneField = this._opts.done_field || 'bf_task_done_count';

            var total = Number(this.recordData && this.recordData[totalField]) || 0;
            var done = Number(this.recordData && this.recordData[doneField]) || 0;

            if (total < 0) total = 0;
            if (done < 0) done = 0;
            if (done > total) done = total;

            var pct = (total > 0) ? ((done * 100.0) / total) : 0.0;

            var pctVal = (typeof this.value === 'number' && !isNaN(this.value)) ? this.value : pct;
            pctVal = Math.max(0, Math.min(100, pctVal));

            var label = this.string || _t('Tasks');

            this.$el.html(QWeb.render(this.template, {
                pct: pctVal,
                done: done,
                total: total,
                label: label
            }));
        },
    });

    fieldRegistry.add('bf_stat_progress', BfStatProgress);

    console.info('BF bf_project_task_progressbar 12.0.1.0.0 loaded (task_stat_progress.js)');
});
