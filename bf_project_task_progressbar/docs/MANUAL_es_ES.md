# Bugfree Project Task Progress Bar

**Visibilidad inmediata por proyecto: barra de progreso en tarjetas Kanban y botón inteligente de Tareas con PercentPie.**

Los equipos pierden tiempo abriendo proyectos solo para saber “cómo vamos”. Este módulo añade un indicador visual limpio y ligero en la app de Proyectos para ver avance y riesgo de un vistazo.

## Beneficios clave

- Progreso visible en cada tarjeta Kanban (porcentaje + hechas/total).
- Conserva el comportamiento estándar del botón de Tareas (clic abre las tareas del proyecto).
- Indicador PercentPie dentro del botón de Tareas con contador Abiertas/Total y tooltip.
- Sin dependencias externas; herencia mínima y segura de vistas.
- Ideal para PMO, agencias, TI interna y equipos de entrega.

## Funciones

- Barra de progreso Kanban dentro de la tarjeta del proyecto (campos calculados).
- Botón de Tareas mejorado con el widget nativo percentpie de Odoo.
- Contador Abiertas/Total debajo del pie (diseño optimizado).
- Tooltip en el botón: Tareas (o etiqueta traducida).
- Solo assets de backend; sin impacto en el sitio web.

## Cómo funciona

1. Instala el módulo y actualízalo tras cambios.
2. Abre Proyectos → Kanban: cada tarjeta muestra la barra.
3. Abre un proyecto: el botón de Tareas muestra PercentPie con Abiertas/Total.

## Compatibilidad

- Odoo 12 Community/Enterprise (requiere app Proyecto).
- Probado con vistas estándar de project; no reemplaza acciones nativas.

## Checklist post‑instalación / actualización

- Reinicia el servicio de Odoo después de instalar/actualizar.
- Limpia caché del navegador y bundles de assets; si usas CDN/Cloudflare, purga assets.
- Tip dev: añade ?debug=assets para recargar assets.

## Soporte

Soporte por Bugfree do Brasil. Ajustes personalizados (etiquetas, layout, KPIs extra) disponibles como servicio PRO si es necesario.
