# Bugfree Project Task Progress Bar

**Sofortige Transparenz pro Projekt: Fortschrittsbalken auf Kanban-Karten und PercentPie-Tasks-Smart-Button.**

Teams verschwenden Zeit, Projekte zu öffnen, nur um den Status zu sehen. Dieses Modul ergänzt die Projekt-App um eine saubere, leichte Fortschrittsanzeige, damit Sie Risiken und Fortschritt sofort erkennen.

## Wichtige Vorteile

- Fortschritt direkt auf jeder Projekt-Kanban-Karte (Prozent + erledigt/gesamt).
- Standard-Klickverhalten des Tasks-Smart-Buttons bleibt erhalten (öffnet Aufgaben).
- PercentPie im Tasks-Smart-Button mit Offen/Gesamt und Tooltip.
- Keine externen Abhängigkeiten; minimale, sichere View-Vererbung.
- Geeignet für PMO, Agenturen, interne IT und Delivery-Teams.

## Funktionen

- Kanban-Fortschrittsbalken innerhalb der Projektkarte (berechnete Felder).
- Tasks-Smart-Button mit Odoo-eigenem percentpie-Widget.
- Offen/Gesamt-Zähler unter dem Pie (platzsparendes Layout).
- Tooltip am Smart-Button: Aufgaben (oder übersetztes Label).
- Nur Backend-Assets; keine Website-Auswirkungen.

## So funktioniert es

1. Modul installieren und nach Updates aktualisieren.
2. Projekte → Kanban öffnen: jede Karte zeigt den Balken.
3. Projektformular öffnen: Tasks-Smart-Button zeigt PercentPie mit Offen/Gesamt.

## Kompatibilität

- Odoo 12 Community/Enterprise (Projekt-App erforderlich).
- Getestet mit Standard-project-Views; ersetzt keine Core-Aktionen.

## Checkliste nach Installation / Upgrade

- Odoo-Dienst nach Installation/Upgrade neu starten.
- Browser-Cache und Asset-Bundles leeren; bei CDN/Cloudflare Assets purgen.
- Dev-Tipp: ?debug=assets anhängen, um Assets neu zu laden.

## Support

Support durch Bugfree do Brasil. Individuelle Anpassungen (Labels, Layout, zusätzliche KPIs) sind bei Bedarf als PRO-Service möglich.
