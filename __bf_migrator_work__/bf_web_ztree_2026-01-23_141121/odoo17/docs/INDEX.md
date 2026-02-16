# Bugfree zTree Assets (bf_web_ztree)

## Objetivo
Este módulo fornece um widget **`ztree_select`** para campos **Many2one** no backend do Odoo 12, permitindo selecionar registros hierárquicos (pai/filhos) em um **diálogo em forma de árvore**.

Ele foi projetado para ser um **módulo-base de dependência**: outros módulos podem usar `widget="ztree_select"` em views, sem precisar embutir bibliotecas JS/CSS.

## Instalação
1. Copie a pasta `bf_web_ztree` para o seu diretório de addons.
2. Reinicie o serviço do Odoo.
3. Atualize a lista de aplicativos.
4. Instale **Bugfree zTree Assets**.

## Uso
Em uma view, defina o widget no campo Many2one:

```xml
<field name="categ_id" widget="ztree_select" ztree_parent_key="parent_id" ztree_expend_level="2" order="name" limit="1000"/>
```

### Atributos suportados
- `ztree_parent_key` (default: `parent_id`): campo Many2one que aponta para o pai.
- `ztree_expend_level` (default: 2): nível inicial expandido.
- `order` (default: `name`): ordenação no `search_read`.
- `limit` (default: 1000): limite de registros para montar a árvore.

## Pós-instalação (obrigatório)
Após instalar/atualizar:
- Reinicie o serviço do Odoo.
- Limpe caches do navegador (hard refresh) e, se houver, CDN/Cloudflare.
- Se necessário, ative `?debug=assets` para validar o carregamento dos assets.

## Validação rápida
Abra o console do navegador no backend e confirme o log:
- `bf_web_ztree v12.0.1.0.0 loaded`
