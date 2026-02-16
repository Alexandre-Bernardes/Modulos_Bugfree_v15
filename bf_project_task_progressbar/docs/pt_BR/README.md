# Bugfree Project Task Progress Bar

## Visão geral
Adiciona uma **barra de progresso** em cada card do **kanban de Projetos**, exibindo:
- **tarefas concluídas/total (x/y)**
- **percentual** calculado por *concluídas ÷ total*
- Clique na barra/label para abrir as tarefas do projeto diretamente em **Kanban**

## Como identifica “Concluída”
Uma tarefa é considerada concluída quando a etapa possui **Dobrado no Kanban** habilitado (`stage_id.fold = True`).

## Instalação
1. Copie a pasta do módulo `bf_project_task_progressbar` para o seu `addons_path`.
2. Reinicie o serviço do Odoo.
3. Apps → Atualizar lista de Apps → Instale o módulo.
4. Limpe cache do navegador (Ctrl+F5). Se necessário: `?debug=assets`.

## Uso
Acesse **Projetos** (kanban). Cada card exibirá a barra de progresso.
Clique na barra/label para abrir as tarefas filtradas pelo projeto (em Kanban).

## Suporte
Site: https://bugfree.com.br

## Smart button no Projeto
Um smart button é adicionado no formulário do Projeto mostrando **x/y** e abrindo o gráfico **Progresso das Tarefas** (Graph primeiro).
