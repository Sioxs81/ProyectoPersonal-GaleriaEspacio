<script setup>
/* FilterBar.vue
   Barra de control con DOS tipos de filtro:
   1. Categoria (filtra QUE fotos se muestran -> se procesa con un computed en el padre).
   2. Filtro visual CSS (cambia COMO se ven: B/N, sepia, contraste, saturacion).
   Cada categoria tiene su color y muestra cuantas fotos contiene.
*/
import { colorCategoria } from '../categorias.js'

const props = defineProps({
  categorias: { type: Array, required: true },
  categoriaActiva: { type: String, required: true },
  filtrosVisuales: { type: Array, required: true },
  filtroVisualActivo: { type: String, required: true },
  conteos: { type: Object, default: () => ({}) },
  total: { type: Number, default: 0 }
})

const emit = defineEmits(['cambiar-categoria', 'cambiar-filtro'])

function colorDe(cat) {
  return cat === 'Todas' ? 'var(--cyan)' : colorCategoria(cat)
}
function conteoDe(cat) {
  return cat === 'Todas' ? props.total : (props.conteos[cat] || 0)
}
function estiloActivo(cat) {
  const c = colorDe(cat)
  return { background: c, borderColor: c, color: 'var(--bg)' }
}
</script>

<template>
  <div class="barra">
    <div class="grupo">
      <span class="eyebrow rotulo">Categoria</span>
      <div class="botones">
        <button
          v-for="cat in categorias"
          :key="cat"
          type="button"
          class="chip"
          :class="{ activo: cat === categoriaActiva }"
          :style="cat === categoriaActiva ? estiloActivo(cat) : null"
          @click="emit('cambiar-categoria', cat)"
        >
          <span class="punto" :style="{ background: colorDe(cat) }" aria-hidden="true"></span>
          {{ cat }}
          <span class="conteo">{{ conteoDe(cat) }}</span>
        </button>
      </div>
    </div>

    <div class="grupo">
      <span class="eyebrow rotulo">Filtro visual</span>
      <div class="botones">
        <button
          v-for="f in filtrosVisuales"
          :key="f.id"
          type="button"
          class="chip chip--filtro"
          :class="{ activo: f.id === filtroVisualActivo }"
          @click="emit('cambiar-filtro', f.id)"
        >
          {{ f.etiqueta }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.barra {
  display: flex;
  flex-wrap: wrap;
  gap: 22px 44px;
  padding: 18px 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(16, 23, 54, 0.85);
}
.grupo { display: flex; flex-direction: column; gap: 10px; }
.rotulo { color: var(--amber); }
.botones { display: flex; flex-wrap: wrap; gap: 8px; }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sans);
  font-size: 0.86rem;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.chip:hover { border-color: var(--cyan); }
.punto { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.conteo {
  font-family: var(--mono);
  font-size: 0.7rem;
  opacity: 0.7;
}
.chip.activo .conteo { opacity: 0.85; }

/* Filtros visuales: estado activo en ambar (no llevan punto de color) */
.chip--filtro { gap: 0; }
.chip--filtro.activo {
  background: var(--amber);
  border-color: var(--amber);
  color: var(--bg);
  font-weight: 600;
}
</style>
