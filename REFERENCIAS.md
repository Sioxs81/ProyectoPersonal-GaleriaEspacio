# REFERENCIAS

Proyecto Personal — IF7102 Multimedios (I Ciclo 2026)
Galería del Cosmos · Vue 3 · Opción 6

Este documento reúne la documentación consultada, las fuentes y licencias de todos los recursos multimedia, y la declaración del uso de inteligencia artificial.

---

## 1. Documentación y tutoriales consultados

- **Vue 3 — Guía oficial (Composition API, `<script setup>`, `ref`, `computed`, ciclo de vida):** https://vuejs.org/guide/introduction.html
- **Vite — Guía oficial (proyecto, build y despliegue estático):** https://vite.dev/guide/ y https://vite.dev/guide/static-deploy.html
- **MDN — Fetch API (carga del JSON):** https://developer.mozilla.org/es/docs/Web/API/Fetch_API
- **MDN — Propiedad CSS `filter` (escala de grises, sepia, contraste, saturación):** https://developer.mozilla.org/es/docs/Web/CSS/filter
- **MDN — Elemento `<audio>` (reproducción y volumen):** https://developer.mozilla.org/es/docs/Web/HTML/Element/audio
- **MDN — CSS Grid Layout (cuadrícula responsiva):** https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout
- **gh-pages (npm) — publicación en GitHub Pages:** https://www.npmjs.com/package/gh-pages

---

## 2. Recursos multimedia y sus licencias

Todas las imágenes y audios fueron tomados de **Wikimedia Commons**, donde están catalogados como creados por la **NASA** o por la colaboración **NASA/ESA**. Por la política de la NASA, su material no está protegido por derechos de autor salvo que se indique lo contrario, por lo que es de **dominio público**. Se conserva el crédito de cada autor por buenas prácticas.

Las imágenes se cargan en tiempo de ejecución desde Commons usando el punto de acceso estable `Special:FilePath/NOMBRE_DEL_ARCHIVO`, que redirige al archivo real. Los créditos y licencias también están incluidos dentro de `public/data/fotos.json`.

### Imágenes (12)

**Planetas**
1. *La Tierra (Blue Marble)* — Apollo 17, NASA. Dominio público.
   https://commons.wikimedia.org/wiki/File:The_Blue_Marble.jpg
2. *Júpiter* — Cassini, NASA/JPL/University of Arizona. Dominio público.
   https://commons.wikimedia.org/wiki/File:Jupiter_by_Cassini-Huygens.jpg
3. *Saturno y su gran tormenta* — Cassini, NASA/JPL-Caltech/SSI. Dominio público.
   https://commons.wikimedia.org/wiki/File:Saturn_Storm.jpg

**Galaxias**
4. *Galaxia del Remolino (M51)* — Hubble, NASA/ESA/STScI/Hubble Heritage Team. Dominio público (PD-Hubble).
   https://commons.wikimedia.org/wiki/File:Whirlpool_Galaxy.jpg
5. *Galaxia del Sombrero (M104)* — Hubble, NASA/ESA/Hubble Heritage Team (STScI/AURA). Dominio público (PD-Hubble).
   https://commons.wikimedia.org/wiki/File:M104_ngc4594_sombrero_galaxy_hi-res.jpg
6. *Galaxia de Andrómeda (M31)* — Hubble, NASA/ESA/STScI. Dominio público (PD-Hubble).
   https://commons.wikimedia.org/wiki/File:Hubble_Finds_Giant_Halo_Around_the_Andromeda_Galaxy.jpg

**Nebulosas**
7. *Pilares de la Creación* — James Webb (NIRCam), NASA/ESA/CSA/STScI. Dominio público (PD-Webb).
   https://commons.wikimedia.org/wiki/File:Pillars_of_Creation_(NIRCam_Image).jpg
8. *Nebulosa de Orión* — Hubble, NASA/ESA/M. Robberto y equipo HST Orion Treasury Project. Dominio público (PD-Hubble).
   https://commons.wikimedia.org/wiki/File:Orion_Nebula_(Hubble_Space_Telescope).jpg
9. *Nebulosa de Carina* — Hubble, NASA/ESA/N. Smith/Hubble Heritage Team. Dominio público (PD-Hubble).
   https://commons.wikimedia.org/wiki/File:Carina_Nebula_in_visible_light_(captured_by_the_Hubble_Space_Telescope).jpg

**Misiones**
10. *Buzz Aldrin en la Luna* — Apollo 11, NASA / Neil Armstrong. Dominio público.
    https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11_original.jpg
11. *Despegue del Apollo 11* — NASA, Centro Espacial Kennedy. Dominio público.
    https://commons.wikimedia.org/wiki/File:Apollo_11_launch.jpg
12. *Telescopio Espacial Hubble (STS-82)* — NASA. Dominio público.
    https://commons.wikimedia.org/wiki/File:Hubble_01.jpg

### Audio (2)

A. *Sonidos de Saturno* — Cassini, NASA/JPL/University of Iowa. Dominio público.
   https://commons.wikimedia.org/wiki/File:Saturn_sound.ogg
B. *Coro de ondas de radio en la atmósfera terrestre* — NASA. Dominio público.
   https://commons.wikimedia.org/wiki/File:Chorus_Radio_Waves_within_Earth%27s_Atmosphere.mp3

### Notas sobre licencias

- Política de uso de imágenes de la NASA (dominio público): https://www.nasa.gov/nasa-brand-center/images-and-media/
- Imágenes del Hubble/Webb acreditadas a la NASA y marcadas como **PD-Hubble / PD-Webb** en Wikimedia Commons se consideran de dominio público. En todos los casos se mantiene el crédito al autor.
- Tipografías: **Fraunces**, **Inter** e **IBM Plex Mono**, todas con licencia **SIL Open Font License**, servidas desde Google Fonts.

---

## 3. Declaración de uso de inteligencia artificial

Para este proyecto se utilizó el asistente de IA **Claude (Anthropic)** como apoyo en:

- la planificación de la arquitectura del proyecto (estructura de componentes y estado);
- la búsqueda y verificación de recursos multimedia de dominio público (NASA/ESA en Wikimedia Commons);
- la generación inicial del código de los componentes Vue 3, los estilos CSS y esta documentación.

Todo el código fue **revisado y comprendido** por el autor, quien puede explicar y defender su funcionamiento (estado reactivo con `ref`, propiedades `computed`, `props`/`emits`, ciclo de vida con `onMounted`/`onUnmounted`, carga de datos con `fetch`, filtros CSS y manejo del elemento `<audio>` mediante una referencia al DOM). Se realizaron ajustes propios sobre la propuesta inicial.

Este uso se declara conforme a la política del curso, que permite el uso de IA siempre que se documente y el estudiante entienda el código entregado.
