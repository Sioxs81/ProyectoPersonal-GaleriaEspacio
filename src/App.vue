<script setup>
/* App.vue — componente raiz de la galeria.
   Concentra el estado y conecta las componentes reutilizables.

   Conceptos de Vue 3 usados:
   - Estado reactivo:        ref()  (fotos, categoria activa, filtro, indice del visor...)
   - Propiedades computadas: computed() (categorias, conteos, fotos filtradas, filtro CSS...)
   - Ciclo de vida:          onMounted() para cargar el JSON con fetch()
   - Props y eventos:        se pasan datos a las componentes y se escuchan sus emits
*/
import { ref, computed, onMounted } from 'vue'
import FilterBar from './components/FilterBar.vue'
import PhotoCard from './components/PhotoCard.vue'
import Lightbox from './components/Lightbox.vue'
import AudioControl from './components/AudioControl.vue'
import Starfield from './components/Starfield.vue'
import { urlImagen } from './commons.js'
import { colorCategoria } from './categorias.js'

/* ---------- Estado reactivo ---------- */
const fotos = ref([])
const pistas = ref([])
const cargando = ref(true)
const error = ref(null)

const categoriaActiva = ref('Todas')
const filtroVisual = ref('normal')
const indiceSeleccionado = ref(null)   // null = visor cerrado

/* Filtros visuales CSS (el id coincide con el mapa de abajo) */
const filtrosVisuales = [
  { id: 'normal',     etiqueta: 'Normal' },
  { id: 'grises',     etiqueta: 'B/N' },
  { id: 'sepia',      etiqueta: 'Sepia' },
  { id: 'contraste',  etiqueta: 'Contraste' },
  { id: 'saturacion', etiqueta: 'Saturacion' }
]
const mapaFiltros = {
  normal: 'none',
  grises: 'grayscale(1)',
  sepia: 'sepia(0.85)',
  contraste: 'contrast(1.6) saturate(1.1)',
  saturacion: 'saturate(2.2)'
}

const heroRota = ref(false)
const ID_DESTACADA = 7   // Pilares de la Creacion

/* ---------- Propiedades computadas ---------- */
const filtroCss = computed(() => mapaFiltros[filtroVisual.value] || 'none')

const categorias = computed(() => {
  const unicas = [...new Set(fotos.value.map((f) => f.categoria))]
  return ['Todas', ...unicas]
})

// Cantidad de fotos por categoria, para mostrarla en los controles.
const conteos = computed(() => {
  const mapa = {}
  for (const f of fotos.value) mapa[f.categoria] = (mapa[f.categoria] || 0) + 1
  return mapa
})

const fotosFiltradas = computed(() => {
  if (categoriaActiva.value === 'Todas') return fotos.value
  return fotos.value.filter((f) => f.categoria === categoriaActiva.value)
})

const fotoActual = computed(() =>
  indiceSeleccionado.value !== null ? fotosFiltradas.value[indiceSeleccionado.value] : null
)

const destacada = computed(
  () => fotos.value.find((f) => f.id === ID_DESTACADA) || fotos.value[0] || null
)

/* ---------- Carga de datos con fetch() ---------- */
onMounted(async () => {
  try {
    const respuesta = await fetch(`${import.meta.env.BASE_URL}data/fotos.json`)
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
    const datos = await respuesta.json()
    fotos.value = datos.fotos || []
    pistas.value = datos.audio || []
  } catch (e) {
    error.value = 'No se pudieron cargar los datos de la galeria.'
    console.error(e)
  } finally {
    cargando.value = false
  }
})

/* ---------- Acciones ---------- */
function cambiarCategoria(cat) {
  categoriaActiva.value = cat
  indiceSeleccionado.value = null
}
function cambiarFiltro(id) {
  filtroVisual.value = id
}
function abrir(foto) {
  indiceSeleccionado.value = fotosFiltradas.value.findIndex((f) => f.id === foto.id)
}
function abrirDestacada() {
  if (!destacada.value) return
  categoriaActiva.value = 'Todas'
  indiceSeleccionado.value = fotos.value.findIndex((f) => f.id === destacada.value.id)
}
function cerrar() {
  indiceSeleccionado.value = null
}
function siguiente() {
  const total = fotosFiltradas.value.length
  indiceSeleccionado.value = (indiceSeleccionado.value + 1) % total
}
function anterior() {
  const total = fotosFiltradas.value.length
  indiceSeleccionado.value = (indiceSeleccionado.value - 1 + total) % total
}
</script>

<template>
  <Starfield />

  <div class="lienzo">
    <!-- ===== HERO: lamina del atlas ===== -->
    <header class="hero">
      <div class="hero__texto">
        <span class="eyebrow">Atlas fotografico · {{ fotos.length || 12 }} objetos · NASA / ESA</span>
        <h1 class="titulo">Galeria<br />del Cosmos</h1>
        <p class="intro">
          Un recorrido por planetas, galaxias, nebulosas y misiones espaciales.
          Filtra por categoria, aplica filtros visuales y abre cada imagen para ver su ficha de catalogo.
        </p>
        <dl class="coordenadas">
          <div><dt>Fuente</dt><dd>NASA · ESA</dd></div>
          <div><dt>Licencia</dt><dd>Dominio publico</dd></div>
          <div><dt>Objetos</dt><dd>{{ fotos.length || 12 }}</dd></div>
        </dl>
      </div>

      <figure
        v-if="destacada"
        class="plate"
        :style="{ '--c': colorCategoria(destacada.categoria) }"
      >
        <button class="plate__btn" type="button" @click="abrirDestacada" aria-label="Abrir imagen destacada en el visor">
          <img
            v-if="!heroRota"
            :src="urlImagen(destacada.archivo, 900)"
            :alt="destacada.nombre"
            fetchpriority="high"
            decoding="async"
            @error="heroRota = true"
          />
          <span v-else class="plate__fallback"></span>
          <span class="plate__etq eyebrow">Lamina 01 · {{ destacada.catalogo }}</span>
          <figcaption class="plate__cap">
            <span class="eyebrow">Imagen destacada</span>
            <strong>{{ destacada.nombre }}</strong>
            <span class="plate__ver">Abrir en el visor →</span>
          </figcaption>
        </button>
      </figure>
    </header>

    <!-- ===== Controles ===== -->
    <FilterBar
      :categorias="categorias"
      :categoria-activa="categoriaActiva"
      :filtros-visuales="filtrosVisuales"
      :filtro-visual-activo="filtroVisual"
      :conteos="conteos"
      :total="fotos.length"
      @cambiar-categoria="cambiarCategoria"
      @cambiar-filtro="cambiarFiltro"
    />

    <!-- ===== Estados de carga / error ===== -->
    <div v-if="cargando" class="cargador">
      <span class="orbita" aria-hidden="true"></span>
      <span class="eyebrow">Cargando galeria…</span>
    </div>
    <p v-else-if="error" class="aviso aviso--error">{{ error }}</p>

    <!-- ===== Cuadricula de fotos ===== -->
    <main v-else class="galeria">
      <PhotoCard
        v-for="(foto, i) in fotosFiltradas"
        :key="foto.id"
        :foto="foto"
        :filtro-css="filtroCss"
        class="entra"
        :style="{ animationDelay: i * 45 + 'ms' }"
        @abrir="abrir"
      />
    </main>

    <footer class="pie-pagina">
      <span class="eyebrow">Imagenes en dominio publico · NASA / ESA · vease REFERENCIAS.md</span>
    </footer>

    <!-- ===== Visor ampliado ===== -->
    <Lightbox
      v-if="fotoActual"
      :foto="fotoActual"
      :filtro-css="filtroCss"
      :posicion="indiceSeleccionado + 1"
      :total="fotosFiltradas.length"
      @cerrar="cerrar"
      @anterior="anterior"
      @siguiente="siguiente"
    />

    <!-- ===== Audio ambiental ===== -->
    <AudioControl :pistas="pistas" />
  </div>
</template>

<style scoped>
.lienzo {
  position: relative;
  z-index: 1;            /* por encima del campo de estrellas */
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 22px 96px;
}

/* ---------- Hero ---------- */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 44px;
}
.titulo {
  font-size: clamp(3rem, 7vw, 5.4rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.01em;
  margin: 14px 0 18px;
  background: linear-gradient(118deg, var(--ink) 28%, var(--amber));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.intro { max-width: 46ch; color: var(--muted); line-height: 1.6; margin: 0 0 26px; }

.coordenadas { display: flex; gap: 28px; margin: 0; flex-wrap: wrap; }
.coordenadas dt {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.coordenadas dd { margin: 4px 0 0; font-family: var(--serif); font-size: 1.05rem; color: var(--ink); }

/* Lamina destacada con marco de carta astronomica */
.plate {
  margin: 0;
  position: relative;
  border-radius: 16px;
  padding: 10px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0)),
    var(--panel);
  border: 1px solid var(--line);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}
/* esquinas tipo ticks de coordenadas */
.plate::before, .plate::after {
  content: "";
  position: absolute;
  width: 18px; height: 18px;
  border: 1px solid var(--c, var(--cyan));
  opacity: 0.7;
}
.plate::before { top: 14px; left: 14px; border-right: none; border-bottom: none; }
.plate::after { bottom: 14px; right: 14px; border-left: none; border-top: none; }

.plate__btn {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
.plate__btn img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.plate__btn:hover img { transform: scale(1.04); }
.plate__fallback {
  display: block; width: 100%; aspect-ratio: 4 / 3;
  background: radial-gradient(circle at 60% 30%, var(--c, var(--cyan)), transparent 60%), #0a0f26;
}
.plate__etq {
  position: absolute;
  top: 12px; left: 14px;
  color: var(--ink);
  background: rgba(9, 13, 34, 0.82);
  padding: 4px 10px;
  border-radius: 999px;
}
.plate__cap {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  padding: 40px 18px 16px;
  background: linear-gradient(180deg, transparent, rgba(6, 9, 24, 0.92));
}
.plate__cap strong { font-family: var(--serif); font-size: 1.5rem; font-weight: 600; }
.plate__ver { font-size: 0.85rem; color: var(--c, var(--cyan)); margin-top: 4px; }

/* ---------- Galeria ---------- */
.galeria {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* ---------- Cargador ---------- */
.cargador { display: flex; align-items: center; gap: 14px; margin-top: 48px; }
.orbita {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 2px solid var(--line);
  border-top-color: var(--cyan);
  animation: girar 0.8s linear infinite;
}
@keyframes girar { to { transform: rotate(360deg); } }

.aviso { margin-top: 40px; color: var(--muted); font-family: var(--mono); }
.aviso--error { color: #ff9aa0; }

.pie-pagina { margin-top: 52px; padding-top: 22px; border-top: 1px solid var(--line); }

/* Aparicion progresiva de las tarjetas */
.entra { animation: subir 0.5s ease both; }
@keyframes subir {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- Responsivo ---------- */
@media (max-width: 880px) {
  .hero { grid-template-columns: 1fr; gap: 28px; }
  .plate { max-width: 520px; }
}
@media (max-width: 560px) {
  .lienzo { padding: 44px 16px 96px; }
  .galeria { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
}
</style>
