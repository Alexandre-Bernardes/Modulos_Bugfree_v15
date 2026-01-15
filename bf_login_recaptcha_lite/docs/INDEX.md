# Bugfree Login reCAPTCHA Lite

Protects the Odoo login with Google reCAPTCHA. Show the captcha only after N consecutive failures (threshold), similar to large sites (Amazon/Google/Microsoft/GitHub/Reddit) that present challenges only after suspicious behavior.

## How to get your own keys
1. Go to https://www.google.com/recaptcha/admin
2. Create a site using **reCAPTCHA v2 → "I'm not a robot" Checkbox**
3. Add your domains (e.g., `example.com`, `www.example.com`) and `localhost` for development
4. Copy the **Site key** and **Secret key**
5. Paste in **Settings → Login reCAPTCHA**, then set your fail threshold (e.g., 2–3)

## Testing (Sandbox) Keys (development only; work on any domain, including `localhost`)
```
Site key:   6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

## Pós-instalação (pt_BR)
- Reinicie o Odoo
- Limpe caches do navegador/CDN
- Acesse com `?debug=assets` e faça hard refresh