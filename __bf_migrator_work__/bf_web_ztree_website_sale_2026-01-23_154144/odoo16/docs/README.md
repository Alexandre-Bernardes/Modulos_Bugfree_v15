# bf_web_ztree_website_sale (Odoo 12 CE)

Aplica o widget **zTree** (selecao em arvore) nas **Categorias Publicas do Produto** (campo `public_categ_ids`) ao editar produtos (Product Template).

## Dependencias

- `bf_web_ztree` (baseline)
- `website_sale` (porque fornece `product.public.category` e o campo `public_categ_ids`)

## Instalacao

1. Copie a pasta `bf_web_ztree_website_sale` para o seu addons_path.
2. Atualize a lista de Apps.
3. Instale o modulo **Bugfree zTree Website Sale**.

### Pos-instalacao (obrigatorio)

- Reinicie o servico do Odoo.
- Limpe caches:
  - Navegador: hard refresh (Ctrl+F5)
  - Se usar CDN/Cloudflare: limpe o cache / desative cache para `/web/content` se necessario
  - Se estiver em debug: use `?debug=assets` e faca upgrade do modulo.

## Configuracao

Em **Settings > General Settings** (ou **Configuracoes > Configuracoes Gerais**), procure por **Bugfree** e marque:

- **Enable zTree for Product Public Categories**

Por padrao, o recurso vem **ativado**.

## Uso

Ao editar um produto, no campo **Public Categories** (Categorias Publicas), o campo passa a oferecer:

- Botao **Tree** (abre um seletor em arvore)
- Busca rapida
- Selecao multipla (checkbox)

## Observacoes tecnicas

- O widget usa `product.public.category.parent_id` como chave de hierarquia.
- A gravacao e feita via comando M2M `[[6,0,ids]]` (replace).

## Troubleshooting

- Se o botao/estilo nao aparecer: reinicie o Odoo e limpe assets/caches.
- Se o campo nao existir: confirme se `website_sale` esta instalado.
- Se houver muitos registros, a primeira abertura pode demorar (carrega a arvore).
