# Recovery / Restart Doc - bf_project_task_progressbar

## Objetivo
Permitir recriar o módulo do zero com segurança.

## Estrutura mínima
- bf_project_task_progressbar/__manifest__.py
- bf_project_task_progressbar/requirements.txt
- bf_project_task_progressbar/__init__.py
- bf_project_task_progressbar/models/__init__.py
- bf_project_task_progressbar/models/project_project.py
- bf_project_task_progressbar/views/assets.xml
- bf_project_task_progressbar/views/project_project_kanban_view.xml
- bf_project_task_progressbar/static/src/js/project_kanban_task_progress.js
- bf_project_task_progressbar/static/src/css/project_kanban_task_progress.css
- Docs em docs/

## Pontos-chave de implementação
1. Campos computados no project.project calculando total/concluídas/progresso via read_group.
2. Critério de "concluída": project.task.stage_id.fold = True.
3. View herdada: project.view_project_kanban
   - Inserir campos no kanban (antes de templates)
   - Substituir o link a[@name='action_view_task'] por bloco com barra e x/y
4. CSS deixa o bloco compacto; JS apenas loga versão.

## Rebuild rápido
1. Criar estrutura acima.
2. Reiniciar Odoo e atualizar lista de Apps.
3. Instalar o módulo e validar no kanban de Projetos.
