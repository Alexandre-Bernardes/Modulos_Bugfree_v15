# Bugfree Project Task Progress Bar

**Natychmiastowa widoczność projektu: pasek postępu na kartach Kanban i inteligentny przycisk Zadań z PercentPie.**

Zespoły tracą czas, otwierając projekty tylko po to, aby sprawdzić postęp. Ten moduł dodaje czytelny i lekki wskaźnik postępu w aplikacji Projekty, aby szybko ocenić sytuację i ryzyko.

## Kluczowe korzyści

- Postęp widoczny na każdej karcie Kanban (procent + wykonane/razem).
- Zachowane standardowe działanie przycisku Zadań (klik otwiera zadania projektu).
- PercentPie w przycisku z licznikiem Otwarte/Razem i podpowiedzią.
- Brak zewnętrznych zależności; minimalne i bezpieczne dziedziczenie widoków.
- Idealne dla PMO, agencji, wewnętrznego IT i zespołów delivery.

## Funkcje

- Pasek postępu w Kanban wewnątrz karty projektu (pola wyliczane).
- Przycisk Zadań z natywnym widgetem Odoo percentpie.
- Licznik Otwarte/Razem pod wykresem (oszczędność miejsca).
- Tooltip na przycisku: Zadania (lub przetłumaczona etykieta).
- Tylko zasoby backend; bez wpływu na stronę.

## Jak to działa

1. Zainstaluj moduł i wykonuj aktualizację po zmianach.
2. Otwórz Projekty → Kanban: każda karta pokaże pasek.
3. Otwórz projekt: przycisk Zadań pokaże PercentPie i Otwarte/Razem.

## Zgodność

- Odoo 12 Community/Enterprise (wymagana aplikacja Projekty).
- Testowane na standardowych widokach project; nie zastępuje akcji core.

## Lista kontrolna po instalacji / aktualizacji

- Po instalacji/aktualizacji zrestartuj usługę Odoo.
- Wyczyść cache przeglądarki i bundlery zasobów; przy CDN/Cloudflare wykonaj purge.
- Wskazówka dev: dodaj ?debug=assets, aby wymusić przeładowanie.

## Wsparcie

Wsparcie Bugfree do Brasil. Dostosowania (etykiety, layout, dodatkowe KPI) dostępne jako usługa PRO w razie potrzeby.
