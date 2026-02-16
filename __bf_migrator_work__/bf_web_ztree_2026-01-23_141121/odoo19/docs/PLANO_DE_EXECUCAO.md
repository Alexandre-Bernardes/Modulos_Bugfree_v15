# Plano de Execucao - bf_web_ztree

## Escopo
- Fornecer assets (CSS/JS) e registrar o widget `ztree_select` para Odoo 12.
- Permitir selecao de Many2one via arvore (parent/children).

## Entregaveis
- Modulo Odoo 12 `bf_web_ztree` com:
  - `views/assets.xml` carregando CSS/JS.
  - `static/src/js/ztree_select.js` com widget.
  - `static/lib/ztree/...` (implementacao leve compativel com o widget).
  - Documentacao em `docs/`.

## Testes
- Instalar o modulo.
- Em um campo Many2one com `widget="ztree_select"`, confirmar:
  - Botao com icone de arvore aparece ao lado do campo.
  - Dialogo abre e carrega nos.
  - Clique em um no seleciona e salva o valor.
  - Busca filtra resultados.

## Riscos
- Modelos muito grandes podem exigir aumento de `limit` ou otimizacao via endpoints dedicados.
