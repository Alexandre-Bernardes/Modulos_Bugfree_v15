
odoo.define('bf_login_recaptcha_lite.recaptcha_enforce', function (require) {
    'use strict';
    var ajax = require('web.ajax');

    function attachGuard(requireCaptcha) {
        if (!requireCaptcha) return;
        var form = document.querySelector('#login_form') || document.querySelector('form[action="/web/login"]');
        if (!form) return;

        if (form.__bfRecaptchaGuardAttached) return;
        form.__bfRecaptchaGuardAttached = true;

        form.addEventListener('submit', function (ev) {
            var token = (document.querySelector('textarea[name="g-recaptcha-response"]') || document.querySelector('input[name="g-recaptcha-response"]'));
            var val = token && token.value ? token.value.trim() : '';
            if (!val) {
                ev.preventDefault();
                ev.stopPropagation();
                // Simple visual cue
                var msg = document.querySelector('#bf-recaptcha-error');
                if (!msg) {
                    msg = document.createElement('div');
                    msg.id = 'bf-recaptcha-error';
                    msg.style.marginTop = '8px';
                    msg.style.color = 'red';
                    msg.textContent = 'Please complete the reCAPTCHA verification.';
                    (form.querySelector('.oe_login_form') || form).appendChild(msg);
                }
                return false;
            }
        }, true);
    }

    function init() {
        ajax.jsonRpc('/bf_recaptcha/status', 'call', {}).then(function (res) {
            attachGuard(!!(res && res.require));
        }).catch(function () { /* ignore */ });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
});
