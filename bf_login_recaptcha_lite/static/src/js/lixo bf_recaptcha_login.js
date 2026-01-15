odoo.define('bf_login_recaptcha_lite.mount', function (require) {
    'use strict';

    var ajax = require('web.ajax');

    function findLoginForm() {
        return document.querySelector(
            'form#login_form, form.o_login_form, form[action*="/web/login"]'
        );
    }

    function ensureCaptchaContainer(formEl) {
        var existing = formEl.querySelector('#bf_recaptcha_block');
        if (existing) { return existing; }
        var block = document.createElement('div');
        block.id = 'bf_recaptcha_block';
        block.className = 'form-group mt16';
        formEl.appendChild(block);
        return block;
    }

    function loadRecaptchaScript() {
        if (document.querySelector('script[src*="google.com/recaptcha/api.js"]')) return;
        var s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js';
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
    }

    function renderCaptcha(siteKey, container) {
        if (container.getAttribute('data-bf-rendered')) return;
        var g = document.createElement('div');
        g.className = 'g-recaptcha';
        g.setAttribute('data-sitekey', siteKey);
        container.appendChild(g);
        container.setAttribute('data-bf-rendered', '1');
        loadRecaptchaScript();
    }

    function bumpOn401() {
        // intercept submit to observar falha de login
        var form = findLoginForm();
        if (!form) return;
        form.addEventListener('submit', function () {
            // tentar detectar falha pelo fetch da própria página (não confiável).
            // Simplesmente agenda um bump por precaução.
            setTimeout(function () {
                ajax.jsonRpc('/bf_recaptcha/fail_bump', 'call', {}).then(function (){}).catch(function (){});
            }, 1200);
        }, { once: true });
    }

    function mount() {
        ajax.jsonRpc('/bf_recaptcha/status', 'call', {}).then(function (resp) {
            bumpOn401();
            var formEl = findLoginForm();
            if (!resp || !resp.site_key || !formEl) return;
            if (resp.required) {
                var container = ensureCaptchaContainer(formEl);
                renderCaptcha(resp.site_key, container);
            }
        }).catch(function (){});
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
});