# Plano de Execução — bf_web_ztree_website_sale (Odoo 12 CE)

## Objetivo
Aplicar o widget **zTree** para seleção hierárquica (multi-seleção) de **Categorias Públicas do Produto** (Website Sale) no backend.

## Escopo
- Widget JS `ztree_m2m_select` para campos **many2many**.
- Injeção *runtime* em `fields_view_get` (sem herança de views por XPath), visando estabilidade.
- Toggle em Configurações Gerais para habilitar/desabilitar.

## Testes mínimos
1. Instalar `bf_web_ztree` (baseline) e este módulo.
2. Ir em **Configurações → Configurações Gerais** e habilitar a opção.
3. Abrir um **Produto** e editar **Categorias Públicas**.
4. Confirmar:
   - Abre o dialog com árvore.
   - Mantém seleção atual marcada.
   - Aplicar grava e atualiza tags.

## Pós-instalação
- Reiniciar o serviço do Odoo.
- Limpar caches (navegador/CDN/asset bundles) e usar `?debug=assets` se necessário.
