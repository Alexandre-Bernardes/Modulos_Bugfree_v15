# Plano de Execução - bf_project_task_progressbar (Odoo 12 CE)

## Escopo
- Exibir barra de progresso no **kanban de Projetos**, substituindo o contador de tarefas.
- Mostrar x/y tarefas (concluídas/total).
- Clique abre a lista de tarefas do projeto (action_view_task).

## Regra de conclusão
- Concluída = tarefa em etapa com fold=True.

## Passos
1. Criar campos computados no project.project:
   - bf_task_total_count
   - bf_task_done_count
   - bf_task_progress
2. Herdar a view kanban do projeto (project.view_project_kanban):
   - Garantir os fields no kanban
   - Substituir o link de tarefas (action_view_task) pelo bloco com barra + x/y
3. Assets CSS/JS (JS apenas para log de versão).
4. Documentação e checklist.

## Checklist de Testes
- [ ] Projeto com 0 tarefas: barra 0% e 0/0.
- [ ] Projeto com 5 tarefas abertas: barra 0% e 0/5.
- [ ] Mover 2 tarefas para etapa fold=True: barra 40% e 2/5.
- [ ] Clique na barra/label: abre lista de tarefas filtrada no projeto.
- [ ] Hard refresh / upgrade do módulo: assets carregam e console mostra log BF.
