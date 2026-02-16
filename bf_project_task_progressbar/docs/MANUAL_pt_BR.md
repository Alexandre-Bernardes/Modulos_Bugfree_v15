# Bugfree Project Task Progress Bar

**Visibilidade imediata por projeto: barra de progresso nos cards do Kanban e smart button de Tarefas com PercentPie.**

Times de projeto perdem tempo abrindo registros apenas para entender “como está o andamento”. Este módulo adiciona um indicador visual limpo e leve no app de Projetos para você enxergar risco e progresso em segundos.

## Principais benefícios

- Veja o progresso diretamente em cada card do Kanban de Projetos (percentual + concluídas/total).
- Mantém o comportamento padrão do smart button de Tarefas (clique abre as tarefas do projeto).
- Indicador PercentPie dentro do smart button de Tarefas com contador Abertas/Total e tooltip.
- Sem dependências externas; herança de views mínima e segura.
- Ideal para PMO, agências, TI interno e equipes que acompanham entregas.

## Funcionalidades

- Barra de progresso no Kanban renderizada dentro do card do Projeto (campos calculados).
- Smart button de Tarefas aprimorado com o widget nativo percentpie do Odoo.
- Contador Abertas/Total exibido abaixo do pie (layout otimizado para espaço).
- Tooltip no smart button: Tarefas (ou label traduzida).
- Apenas assets de backend; sem impacto no website.

## Como funciona

1. Instale o módulo e faça upgrade após atualizações.
2. Acesse Projetos → Kanban: cada card exibirá a barra de progresso.
3. Abra um Projeto: o smart button de Tarefas mostrará o PercentPie com Abertas/Total.

## Compatibilidade

- Odoo 12 Community/Enterprise (requer o app Projeto).
- Testado com as views padrão do project; não substitui ações nativas.

## Checklist pós‑instalação / upgrade

- Reinicie o serviço do Odoo após instalar/atualizar.
- Limpe cache do navegador e bundles de assets; se usar CDN/Cloudflare, limpe o cache de assets.
- Dica dev: use ?debug=assets para forçar recarregamento.

## Suporte

Suporte Bugfree do Brasil. Ajustes sob medida (labels, layout, KPIs extras) podem ser entregues como serviço PRO, quando necessário.
