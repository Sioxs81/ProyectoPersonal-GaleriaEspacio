<script setup>
/* PhotoCard.vue
   Tarjeta reutilizable de una fotografia.
   - Recibe la metadata de la foto y el filtro CSS activo mediante PROPS.
   - Emite el evento "abrir" cuando se hace clic, para que el padre abra el lightbox.
   - Cada tarjeta toma el color de acento de su categoria.
*/
import { ref } from 'vue'
import { urlImagen } from '../commons.js'
import { colorCategoria } from '../categorias.js'

const props = defineProps({
  foto: { type: Object, required: true },
  filtroCss: { type: String, default: 'none' }
})

const emit = defineEmits(['abrir'])

// Si una imagen remota no carga, mostramos un marcador en vez de romper la galeria.
const imagenRota = ref(false)
</script>

<template>
  <button
    class="tarjeta"
    type="button"
    :style="{ '--c': colorCategoria(foto.categoria) }"
    @click="emit('abrir', foto)"
    :aria-label="`Ampliar: ${foto.nombre}`"
  >
    <div class="marco">
      <img
        v-if="!imagenRota"
        class="imagen"
        :src="urlImagen(foto.archivo, 600)"
        :alt="foto.nombre"
        :style="{ filter: filtroCss }"
        loading="lazy"
        decoding="async"
        @error="imagenRota = true"
      />
      <div v-else class="marcador">
        <span class="eyebrow">imagen no disponible</span>
      </div>

      <span class="lupa" aria-hidden="true">+</span>
    </div>

    <div class="pie">
      <span class="eyebrow">{{ foto.catalogo }}</span>
      <h3 class="titulo">{{ foto.nombre }}</h3>
      <span class="tag">
        <span class="punto" aria-hidden="true"></span>
        {{ foto.categoria }}
      </span>
    </div>
  </button>
</template>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.tarjeta:hover {
  transform: translateY(-4px);
  border-color: var(--c, var(--cyan));
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45),
              0 0 0 1px color-mix(in srgb, var(--c, var(--cyan)) 30%, transparent);
}

.marco {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #060a1c;
}
.imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease, transform 0.45s ease;
}
.tarjeta:hover .imagen { transform: scale(1.06); }

.marcador { display: grid; place-items: center; width: 100%; height: 100%; }

.lupa {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--bg);
  background: var(--c, var(--amber));
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tarjeta:hover .lupa { opacity: 1; transform: scale(1); }

.pie { padding: 14px 16px 16px; }
.titulo { font-size: 1.12rem; margin: 6px 0 10px; line-height: 1.2; }
.tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 3px 11px;
}
.punto { width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--cyan)); }
</style>
