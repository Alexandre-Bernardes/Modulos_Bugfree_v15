# Worklog - bf_project_task_progressbar

- Total acumulado (estimado): 5.4h
- Neste build (estimado): 0.2h

## Mudanças (vs 12.0.1.0.0)
- Moveu a barra do smart button para o **kanban de Projetos** (cards).
- Substitui o link de tarefas (action_view_task) no card por barra + x/y.
- Simplificação: sem widget custom no form; somente kanban + assets CSS/JS.

- Fix: XPath mais tolerante (`task_count`, `tasks_count`, `task_ids_count`) para cobrir variações de templates.

- Fix: read_group pode retornar '__count' (em vez de project_id_count); agora tratamos ambos.

- Fix: removido uso de __('Tasks') no QWeb do kanban (JS QWeb não possui __; causava dict.__ is not a function).

- Fix: action_view_task/action_view_tasks estavam fora da classe (indentação), causando AttributeError ao clicar; agora estão dentro de project.project.

- Melhoria: clique na barra/label abre tarefas diretamente na visualização Kanban (view_mode kanban,tree,form).

## 12.0.1.1.13
- Ajuste do smart button padrão de Tarefas para exibir em **uma linha**: `Tarefas abertas/total` ao lado do `percentpie`.
- Removidos comentários do XML e simplificada a estrutura para evitar clipping do texto.
- 2026-01-22 06:21 -0300 — v12.0.1.1.17: Smart button Tasks percentpie: display as counter only (open/total) without truncation; add bf_task_xy_display helper field. (this build: 0.3h; cumulative: 2.6h)
## 12.0.1.1.20 (2026-01-22 14:52:36 -0300)
- Smart button Tasks: show percentpie + compact 5/10 text without ellipsis; add tooltip 'Tarefas'.


## 12.0.1.1.21 - 2026-01-22 15:32:15 -0300
- Smart button Tasks: add 2-line label (Tarefas + open/total) next to percentpie without truncation/overlap.
