# PATCH NOTES — bf_project_task_progressbar v13.0.1.1.27 (Odoo 13 CE)

## 2026-01-23 — Correção de instalação (traduções)
- **Correção crítica:** arquivos `.po` em `i18n/` agora incluem a tag `#. module: bf_project_task_progressbar` em cada entrada, evitando erro na carga de traduções durante a instalação (`AttributeError: 'NoneType' object has no attribute 'groups'`).
- Atualizado `Project-Id-Version` para `Odoo 13.0` nos `.po`.
- Removido diretório `__pycache__/` do pacote.

## Objetivo
- Substituir o smart button padrão de **Tarefas** (Project form) por **percentpie** (widget nativo) + texto **Tarefas** + **x/y** (abertas/total),
  mantendo o clique com o comportamento padrão do Odoo (abre o kanban de tarefas do projeto).

## O que mudou
- **Views**
  - Substituição do smart button de tarefas no `button_box` por um botão `type="object" name="action_view_tasks"` contendo:
    - `field bf_task_progress` com `widget="percentpie"`
    - `field bf_task_xy_display` exibindo `abertas/total`
- **Model**
  - Novo campo calculado: `bf_task_open_count`
  - `bf_task_xy_display` agora é `abertas/total` (antes era `concluídas/total`)

## Arquivos alterados
- bf_project_task_progressbar/__manifest__.py
- bf_project_task_progressbar/models/project_project.py
- bf_project_task_progressbar/views/project_project_view.xml
- bf_project_task_progressbar/views/assets.xml
- bf_project_task_progressbar/static/src/css/project_task_smartbutton_pie.css
- bf_project_task_progressbar/docs/WORKLOG.md

## Pós-instalação (obrigatório)
1. Atualize o módulo (Apps → Upgrade) ou `-u bf_project_task_progressbar`.
2. Reinicie o serviço do Odoo.
3. Limpe caches (hard refresh no browser) e, se necessário, use `?debug=assets`.

## Estimativa de horas
- Neste build: ~0.8h
- Acumulado: ver docs/WORKLOG.md
