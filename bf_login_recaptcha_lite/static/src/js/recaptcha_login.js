odoo.define('bf_login_recaptcha_lite.recaptcha_login', function (require) {
    'use strict';
    var ajax = require('web.ajax');

    function ensureScriptLoaded() {
        if (window.__bfRecaptchaLoaded) { return; }
        window.__bfRecaptchaLoaded = true;
        var s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js';
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
    }

    function findLoginForm() {
        return document.querySelector('form#login_form, form.o_login_form, form[action*="/web/login"]');
    }

    function getAnchor(formEl) {
        var block = formEl.querySelector('.oe_login_buttons, .clearfix.oe_login_buttons');
        if (block) { return block; }
        return formEl.querySelector('button[type="submit"], input[type="submit"], .btn-primary[type="submit"]');
    }

    function ensureCaptchaContainer(formEl) {
        var anchor = getAnchor(formEl);
        var existing = formEl.querySelector('#bf_recaptcha_block');
        if (existing) {
            if (anchor && existing.nextElementSibling !== anchor) {
                if (anchor.parentNode) {
                    anchor.parentNode.insertBefore(existing, anchor);
                }
            }
            return existing;
        }
        var block = document.createElement('div');
        block.id = 'bf_recaptcha_block';
        block.style.margin = '10px 0';
        if (anchor && anchor.parentNode) {
            anchor.parentNode.insertBefore(block, anchor);
        } else {
            formEl.appendChild(block);
        }
        return block;
    }

    function insertWidget(siteKey) {
        var formEl = findLoginForm();
        if (!formEl) { return; }
        var container = ensureCaptchaContainer(formEl);
        if (container.querySelector('.g-recaptcha')) { return; }
        var recaptchaDiv = document.createElement('div');
        recaptchaDiv.className = 'g-recaptcha';
        recaptchaDiv.setAttribute('data-sitekey', siteKey);
        container.appendChild(recaptchaDiv);
        ensureScriptLoaded();
    }

    function hasLoginError() {
        return !!document.querySelector('.alert.alert-danger, .oe_login_error');
    }

    function checkAndRender() {
        ajax.jsonRpc('/bf_recaptcha/status', 'call', {}).then(function (data) {
            if (data && data.require && data.site_key) {
                insertWidget(data.site_key);
            }
        }).catch(function () {});
    }

    function mount() {
        var formEl = findLoginForm();
        if (!formEl) { return; }
        if (hasLoginError()) {
            ajax.jsonRpc('/bf_recaptcha/fail_bump', 'call', {})
                .then(function () { checkAndRender(); })
                .catch(function () { checkAndRender(); });
        } else {
            checkAndRender();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { try { mount(); } catch (e) {} });
    } else {
        try { mount(); } catch (e) {}
    }
});

