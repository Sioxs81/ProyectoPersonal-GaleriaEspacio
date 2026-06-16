<script setup>
/* Lightbox.vue
   Visor ampliado, construido SIN librerias externas de UI.
   - Recibe la foto activa, su filtro y la posicion (n / total) por props.
   - Maneja el teclado (Esc = cerrar, flechas = navegar) registrando y quitando
     el listener en los hooks del ciclo de vida (onMounted / onUnmounted).
*/
import { onMounted, onUnmounted } from 'vue'
import { urlImagen } from '../commons.js'
import { colorCategoria } from '../categorias.js'

defineProps({
  foto: { type: Object, required: true },
  filtroCss: { type: String, default: 'none' },
  posicion: { type: Number, default: 1 },
  total: { type: Number, default: 1 }
})

const emit = defineEmits(['cerrar', 'anterior', 'siguiente'])

const dosDigitos = (n) => String(n).padStart(2, '0')

function manejarTecla(e) {
  if (e.key === 'Escape') emit('cerrar')
  else if (e.key === 'ArrowLeft') emit('anterior')
  else if (e.key === 'ArrowRight') emit('siguiente')
}

onMounted(() => {
  window.addEventListener('keydown', manejarTecla)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  window.removeEventListener('keydown', manejarTecla)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="fondo" @click="emit('cerrar')">
    <button class="cerrar" type="button" @click="emit('cerrar')" aria-label="Cerrar">×</button>

    <button class="nav nav--izq" type="button" @click.stop="emit('anterior')" aria-label="Anterior">‹</button>

    <div class="contenido" :style="{ '--c': colorCategoria(foto.categoria) }" @click.stop>
      <figure class="imagen-zona">
        <img :src="urlImagen(foto.archivo, 1600)" :alt="foto.nombre" :style="{ filter: filtroCss }" />
        <span class="contador">{{ dosDigitos(posicion) }} <i>/</i> {{ dosDigitos(total) }}</span>
      </figure>

      <aside class="datos">
        <span class="barra-cat" aria-hidden="true"></span>
        <span class="eyebrow">{{ foto.catalogo }}</span>
        <h2>{{ foto.nombre }}</h2>
        <p class="fuente">{{ foto.fuente }}</p>
        <p class="desc">{{ foto.descripcion }}</p>
        <dl class="ficha">
          <div><dt>Categoria</dt><dd>{{ foto.categoria }}</dd></div>
          <div><dt>Credito</dt><dd>{{ foto.credito }}</dd></div>
          <div><dt>Licencia</dt><dd>{{ foto.licencia }}</dd></div>
        </dl>
        <p class="atajos eyebrow">Esc cerrar · ← → navegar</p>
      </aside>
    </div>

    <button class="nav nav--der" type="button" @click.stop="emit('siguiente')" aria-label="Siguiente">›</button>
  </div>
</template>

<style scoped>
.fondo {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: rgba(3, 5, 14, 0.95);
  animation: aparecer 0.22s ease;
}
@keyframes aparecer { from { opacity: 0; } to { opacity: 1; } }

.contenido {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(270px, 0.9fr);
  gap: 18px;
  max-width: 1120px;
  max-height: 88vh;
  margin: 0 auto;
  width: 100%;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  animation: surgir 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes surgir {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.imagen-zona { margin: 0; position: relative; background: #05070f; display: grid; place-items: center; }
.imagen-zona img {
  width: 100%;
  height: 100%;
  max-height: 88vh;
  object-fit: contain;
  display: block;
  transition: filter 0.3s ease;
}
.contador {
  position: absolute;
  top: 14px; left: 16px;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: rgba(3, 5, 14, 0.66);
  padding: 4px 10px;
  border-radius: 999px;
}
.contador i { color: var(--muted); font-style: normal; }

.datos { position: relative; padding: 28px 24px; overflow-y: auto; }
.barra-cat {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--c, var(--cyan));
}
.datos h2 { font-size: 1.7rem; margin: 8px 0 4px; }
.fuente { font-family: var(--mono); font-size: 0.78rem; color: var(--c, var(--cyan)); margin: 0 0 16px; }
.desc { color: var(--ink); line-height: 1.55; margin: 0 0 22px; }

.ficha { display: flex; flex-direction: column; gap: 12px; margin: 0 0 20px; }
.ficha dt {
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.ficha dd { margin: 2px 0 0; font-size: 0.92rem; }
.atajos { color: var(--muted); }

.cerrar {
  position: absolute;
  top: 18px; right: 22px;
  width: 42px; height: 42px;
  font-size: 1.6rem; line-height: 1;
  color: var(--ink);
  background: rgba(18, 26, 60, 0.8);
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
}
.cerrar:hover { border-color: var(--amber); color: var(--amber); }

.nav {
  width: 50px; height: 50px;
  font-size: 2rem; line-height: 1;
  color: var(--ink);
  background: rgba(18, 26, 60, 0.7);
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.18s ease;
}
.nav:hover { border-color: var(--cyan); color: var(--cyan); }

@media (max-width: 760px) {
  .contenido { grid-template-columns: 1fr; grid-template-rows: auto auto; max-height: 90vh; overflow-y: auto; }
  .imagen-zona img { max-height: 52vh; }
  .nav { position: fixed; bottom: 24px; }
  .nav--izq { left: 24px; }
  .nav--der { right: 24px; }
}
</style>
