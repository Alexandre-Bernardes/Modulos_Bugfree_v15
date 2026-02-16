# Plano de Execucao — Bugfree zTree Widget - Product

## Escopo
- Injetar widget=ztree_select em campos selecionados, somente nas telas backend (form/tree).
- Garantir estabilidade (sem heranca XML com XPath).
- Permitir habilitar/desabilitar via Settings.

## Testes
1. Abrir uma tela do modelo alvo e verificar que o many2one abre com zTree.
2. Verificar que nao afeta campos com widget existente.
3. Desabilitar no Settings e confirmar que volta ao widget padrao.

## Pos-instalacao
- Reiniciar Odoo e limpar caches (browser/CDN/assets).
