# BF Odoo Module Migrator — Relatório de Migração

## Execução

- Data/hora: `2026-01-23_053351`
- Origem: `E:\Odoo\Modulos_Bugfree_v12\bf_project_task_progressbar` (Odoo (auto pelo manifesto))
- Destinos solicitados: `13, 14, 15, 16, 17, 18, 19`

### Opções

- Gradual: **sim**
- Fail-fast: **sim**
- Manter intermediários: **sim**
- Gerar relatórios: **sim**
- Gerar requirements.txt: **sim**
- Permitir downgrade (cópia): **não**

## Módulos

### bf_project_task_progressbar

- Caminho de origem: `E:\Odoo\Modulos_Bugfree_v12\bf_project_task_progressbar`
- Versão de origem detectada: **Odoo 12**
- Pasta base de saída: `E:\Odoo\Modulos_Bugfree_v13`

#### Destinos gerados

- Odoo 13: `E:\Odoo\Modulos_Bugfree_v13\bf_project_task_progressbar`

#### Etapas

- 12 → 13: **OK**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
- 13 → 14: **OK**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
- 14 → 15: **OK**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
- 15 → 16: **OK**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
- 16 → 17: **WARN**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
  - Avisos:
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.
- 17 → 18: **WARN**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
  - Avisos:
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.
- 18 → 19: **WARN**
  - Arquivos alterados (total): `3`
  - Manifest alterado: `True`
  - Python alterado: `0`
  - XML alterado: `0`
  - JS alterado: `2`
  - Avisos:
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.
    - ⚠ Contém padrão AMD (odoo.define). No Odoo 17+ o recomendado é ES modules; pode exigir modernização manual.

#### requirements.txt

- Arquivo: `E:\Odoo\Modulos_Bugfree_v12\__bf_migrator_work__\bf_project_task_progressbar_2026-01-23_053351\odoo19\requirements.txt`
- Adicionados: (nenhum)
- Removidos: (nenhum)

## Compatibilidade de Ambiente (lembrete)

| Odoo | Python (mín.) | PostgreSQL (mín.) | Observações |
|---:|---|---|---|
| 13 | 3.6+ | 10.0+ | Confirm on your distro; Odoo 13 docs are harder to access consistently. |
| 14 | 3.7+ | 12.0+ |  |
| 15 | 3.7+ | 12.0+ |  |
| 16 | 3.7+ | 12.0+ |  |
| 17 | 3.10+ | 12.0+ |  |
| 18 | 3.10+ | 12.0+ |  |
| 19 | 3.10+ | 13.0+ | Docs note PostgreSQL min bumped in 19. |

### Links de evidência

- Odoo 13:
  - https://www.odoo.com/documentation/13.0/fr/administration/deployment/install.html
- Odoo 14:
  - https://www.odoo.com/documentation/14.0/fr/administration/install/source.html
- Odoo 15:
  - https://www.odoo.com/documentation/15.0/pt_BR/administration/install/source.html
- Odoo 16:
  - https://www.odoo.com/documentation/16.0/pt_BR/administration/on_premise/source.html
- Odoo 17:
  - https://www.odoo.com/documentation/17.0/pt_BR/administration/on_premise/source.html
- Odoo 18:
  - https://www.odoo.com/documentation/18.0/pt_BR/administration/on_premise/source.html
- Odoo 19:
  - https://www.odoo.com/documentation/19.0/administration/on_premise/source.html
