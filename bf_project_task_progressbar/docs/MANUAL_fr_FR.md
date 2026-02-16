# Bugfree Project Task Progress Bar

**Visibilité instantanée par projet : barre de progression sur les cartes Kanban et smart button Tâches en PercentPie.**

Les équipes perdent du temps à ouvrir des projets uniquement pour connaître l’avancement. Ce module ajoute un indicateur visuel propre et léger dans l’app Projets pour voir progrès et risques en un coup d’œil.

## Avantages clés

- Progression visible sur chaque carte Kanban (pourcentage + terminées/total).
- Conserve le comportement standard du smart button Tâches (clic ouvre les tâches).
- Indicateur PercentPie dans le smart button avec compteur Ouvertes/Total et infobulle.
- Aucune dépendance externe ; héritage de vues minimal et sûr.
- Idéal pour PMO, agences, IT interne et équipes de delivery.

## Fonctionnalités

- Barre de progression Kanban dans la carte Projet (champs calculés).
- Smart button Tâches amélioré avec le widget natif percentpie d’Odoo.
- Compteur Ouvertes/Total sous le pie (mise en page optimisée).
- Infobulle sur le bouton : Tâches (ou libellé traduit).
- Assets backend uniquement ; aucun impact site web.

## Comment ça marche

1. Installez le module et mettez-le à jour après modifications.
2. Ouvrez Projets → Kanban : chaque carte affiche la barre.
3. Ouvrez un projet : le smart button affiche PercentPie avec Ouvertes/Total.

## Compatibilité

- Odoo 12 Community/Enterprise (app Projets requise).
- Testé sur les vues standard project ; ne remplace pas les actions cœur.

## Checklist après installation / mise à jour

- Redémarrez le service Odoo après installation/mise à jour.
- Videz le cache navigateur et les bundles d’assets ; purgez CDN/Cloudflare si utilisé.
- Astuce dev : ajoutez ?debug=assets pour recharger les assets.

## Support

Support par Bugfree do Brasil. Ajustements sur mesure (libellés, layout, KPIs supplémentaires) disponibles en service PRO si nécessaire.
