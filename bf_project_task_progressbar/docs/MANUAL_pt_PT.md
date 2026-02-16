# Bugfree Project Task Progress Bar

**Visibilidade imediata por projeto: barra de progresso nos cartões Kanban e smart button de Tarefas com PercentPie.**

As equipas perdem tempo a abrir projetos apenas para perceber “como está o andamento”. Este módulo adiciona um indicador visual limpo e leve na app de Projetos para ver progresso e risco de relance.

## Principais benefícios

- Progresso em cada cartão Kanban (percentagem + concluídas/total).
- Mantém o comportamento padrão do botão de Tarefas (clique abre as tarefas).
- PercentPie no botão com contador Abertas/Total e tooltip.
- Sem dependências externas; herança de vistas mínima e segura.
- Ideal para PMO, agências, TI interna e equipas de delivery.

## Funcionalidades

- Barra de progresso no Kanban dentro do cartão do Projeto (campos calculados).
- Botão de Tarefas com widget nativo percentpie do Odoo.
- Contador Abertas/Total sob o pie (layout otimizado).
- Tooltip no botão: Tarefas (ou etiqueta traduzida).
- Apenas assets de backend; sem impacto no website.

## Como funciona

1. Instale o módulo e faça upgrade após alterações.
2. Projetos → Kanban: cada cartão mostra a barra.
3. Formulário do projeto: o botão de Tarefas mostra PercentPie com Abertas/Total.

## Compatibilidade

- Odoo 12 Community/Enterprise (requer app Projeto).
- Testado com vistas padrão de project; não substitui ações core.

## Checklist pós‑instalação / upgrade

- Reinicie o serviço do Odoo após instalar/atualizar.
- Limpe cache do browser e bundles de assets; se usar CDN/Cloudflare, faça purge.
- Dica dev: use ?debug=assets para recarregar assets.

## Suporte

Suporte Bugfree do Brasil. Ajustes personalizados (etiquetas, layout, KPIs extra) disponíveis como serviço PRO quando necessário.
