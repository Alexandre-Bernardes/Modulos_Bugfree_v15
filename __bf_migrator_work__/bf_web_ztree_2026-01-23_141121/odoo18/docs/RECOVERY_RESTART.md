# Recovery / Restart Doc - bf_web_ztree

## O que este modulo faz
- Registra um widget Many2one chamado `ztree_select` no backend do Odoo 12.
- Fornece um dialogo de selecao por arvore para modelos hierarquicos (pai/filhos).

## Ponto critico de compatibilidade
- O modulo foi pensado para Odoo 12 (web client legado).
- O carregamento de assets ocorre via heranca de `web.assets_backend` em XML.

## Arquivos-chave
- `views/assets.xml`: injeta CSS/JS no backend.
- `static/src/js/ztree_select.js`: widget Odoo (FieldMany2One extend).
- `static/lib/ztree/js/jquery.ztree.core.js`: core leve (subset) compativel com o widget.

## Como recriar do zero
1. Criar pasta `bf_web_ztree` com estrutura padrao Odoo.
2. Implementar `__manifest__.py` com depends `web`.
3. Criar `views/assets.xml` herdando `web.assets_backend` e incluindo:
   - zTreeStyle.css
   - ztree_select.css
   - jquery.ztree.core.js
   - ztree_select.js
4. Implementar `static/src/js/ztree_select.js`:
   - Registrar no `field_registry` com chave `ztree_select`.
   - Buscar nos via `search_read` e montar dialogo.
5. Validar via console log e testes funcionais.

## Como validar em producao
- Instalar/atualizar modulo, reiniciar Odoo e limpar caches.
- Abrir tela com campo configurado e confirmar abertura do dialogo.
- Conferir no console: `bf_web_ztree v12.0.1.0.0 loaded`.
