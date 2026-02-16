# Bugfree Project Task Progress Bar

**Visibilità immediata per progetto: barra di avanzamento nelle card Kanban e smart button Attività con PercentPie.**

I team perdono tempo ad aprire i progetti solo per capire “a che punto siamo”. Questo modulo aggiunge un indicatore visivo pulito e leggero nell’app Progetti per vedere avanzamento e rischio a colpo d’occhio.

## Vantaggi principali

- Avanzamento visibile su ogni card Kanban (percentuale + completate/totale).
- Mantiene il comportamento standard del pulsante Attività (clic apre le attività).
- Indicatore PercentPie nel pulsante con contatore Aperte/Totale e tooltip.
- Nessuna dipendenza esterna; ereditarietà viste minima e sicura.
- Perfetto per PMO, agenzie, IT interno e team di delivery.

## Funzionalità

- Barra di avanzamento Kanban dentro la card Progetto (campi calcolati).
- Smart button Attività con widget nativo percentpie di Odoo.
- Contatore Aperte/Totale sotto il pie (layout ottimizzato).
- Tooltip sul pulsante: Attività (o etichetta tradotta).
- Solo asset backend; nessun impatto sul sito web.

## Come funziona

1. Installa il modulo e aggiornalo dopo le modifiche.
2. Apri Progetti → Kanban: ogni card mostra la barra.
3. Apri un progetto: il pulsante Attività mostra PercentPie con Aperte/Totale.

## Compatibilità

- Odoo 12 Community/Enterprise (richiede app Progetti).
- Testato con viste standard project; non sostituisce azioni core.

## Checklist post‑installazione / upgrade

- Riavvia il servizio Odoo dopo installazione/upgrade.
- Svuota cache browser e bundle di asset; se usi CDN/Cloudflare, esegui purge.
- Suggerimento dev: aggiungi ?debug=assets per ricaricare gli asset.

## Supporto

Supporto Bugfree do Brasil. Personalizzazioni (etichette, layout, KPI extra) disponibili come servizio PRO se necessario.
