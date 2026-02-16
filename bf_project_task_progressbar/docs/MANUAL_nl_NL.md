# Bugfree Project Task Progress Bar

**Direct inzicht per project: een voortgangsbalk op Kanban-kaarten en een PercentPie Taken-smartbutton.**

Teams verliezen tijd door projecten te openen alleen om te zien “hoe ver we zijn”. Deze module voegt een nette, lichte voortgangsindicator toe aan de Project-app zodat je voortgang en risico in één oogopslag ziet.

## Belangrijkste voordelen

- Voortgang zichtbaar op elke Project Kanban-kaart (percentage + gereed/totaal).
- Behoudt het standaard klikgedrag van de Taken-smartbutton (opent projecttaken).
- PercentPie in de smartbutton met Open/Totaal teller en tooltip.
- Geen externe afhankelijkheden; minimale en veilige view-inheritance.
- Geschikt voor PMO, bureaus, interne IT en delivery teams.

## Functies

- Kanban-voortgangsbalk binnen de projectkaart (berekende velden).
- Taken-smartbutton met Odoo’s ingebouwde percentpie-widget.
- Open/Totaal teller onder de pie (ruimtebesparend).
- Tooltip op de button: Taken (of vertaalde label).
- Alleen backend-assets; geen impact op website.

## Hoe het werkt

1. Installeer de module en upgrade na updates.
2. Open Project → Kanban: elke kaart toont de balk.
3. Open een projectformulier: de Taken-smartbutton toont PercentPie en Open/Totaal.

## Compatibiliteit

- Odoo 12 Community/Enterprise (Project-app vereist).
- Getest met standaard project-views; vervangt geen core-acties.

## Checklist na installatie / upgrade

- Herstart de Odoo-service na installatie/upgrade.
- Leeg browsercache en asset bundles; bij CDN/Cloudflare: purge assets.
- Dev-tip: voeg ?debug=assets toe om assets te herladen.

## Support

Ondersteuning door Bugfree do Brasil. Maatwerk (labels, layout, extra KPI’s) kan indien nodig als PRO-service geleverd worden.
