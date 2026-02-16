# RECOVERY / RESTART DOC — bf_web_ztree_website_sale

## Como recriar este módulo do zero
1. Criar pasta `bf_web_ztree_website_sale`.
2. Implementar `__manifest__.py` com dependências: `web`, `product`, `website_sale`, `bf_web_ztree`.
3. Criar `views/assets.xml` adicionando `static/src/js/ztree_m2m_select.js` em `web.assets_backend`.
4. Criar `models/res_config_settings.py` (toggle via ir.config_parameter).
5. Criar `models/ztree_website_sale.py` injetando `widget="ztree_m2m_select"` em `public_categ_ids` via `fields_view_get`.
6. Criar widget JS multi-seleção usando zTree com checkbox, aplicando comando M2M `[[6,0,ids]]` via evento `field_changed`.

## Pontos críticos
- **Não** usar herança de views por XPath para evitar quebras quando módulos alteram views.
- Garantir que `bf_web_ztree` esteja instalado para prover zTree e CSS base.
- Após update: reiniciar Odoo e limpar caches.
