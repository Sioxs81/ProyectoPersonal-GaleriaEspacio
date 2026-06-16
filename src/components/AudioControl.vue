<script setup>
/* AudioControl.vue
   Reproductor de audio ambiental.
   - Usa una REF (audioRef) para acceder directamente al elemento <audio> del DOM
     y controlar reproduccion y volumen.
   - Permite elegir entre las pistas y ajustar el volumen con un control deslizante.
*/
import { ref, computed } from 'vue'
import { urlAudio } from '../commons.js'

const props = defineProps({
  pistas: { type: Array, default: () => [] }
})

const audioRef = ref(null)        // referencia al <audio> del DOM
const reproduciendo = ref(false)
const volumen = ref(0.5)
const indicePista = ref(0)

const pistaActual = computed(() => props.pistas[indicePista.value] || null)

function alternar() {
  const el = audioRef.value
  if (!el) return
  if (el.paused) {
    el.play()
    reproduciendo.value = true
  } else {
    el.pause()
    reproduciendo.value = false
  }
}

function cambiarVolumen() {
  if (audioRef.value) audioRef.value.volume = volumen.value
}

function seleccionarPista(i) {
  indicePista.value = i
  reproduciendo.value = false
  requestAnimationFrame(() => {
    if (audioRef.value) audioRef.value.volume = volumen.value
  })
}
</script>

<template>
  <section class="consola" v-if="pistaActual">
    <header class="cabecera">
      <span class="punto" :class="{ vivo: reproduciendo }" aria-hidden="true"></span>
      <span class="eyebrow">Audio ambiental</span>
    </header>

    <!-- Elemento de audio controlado por referencia (ref) -->
    <audio
      ref="audioRef"
      :src="urlAudio(pistaActual.archivo)"
      loop
      preload="none"
      @ended="reproduciendo = false"
    ></audio>

    <div class="fila">
      <button class="play" type="button" @click="alternar" :aria-label="reproduciendo ? 'Pausar' : 'Reproducir'">
        <span v-if="!reproduciendo">▶</span>
        <span v-else>❚❚</span>
      </button>
      <p class="nombre">{{ pistaActual.nombre }}</p>
    </div>

    <label class="volumen">
      <span class="eyebrow">Volumen</span>
      <input type="range" min="0" max="1" step="0.01" v-model.number="volumen" @input="cambiarVolumen" />
    </label>

    <div class="pistas" v-if="pistas.length > 1">
      <button
        v-for="(p, i) in pistas"
        :key="p.id"
        type="button"
        class="mini"
        :class="{ activo: i === indicePista }"
        @click="seleccionarPista(i)"
      >
        {{ i + 1 }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.consola {
  position: fixed;
  bottom: 18px;
  right: 18px;
  z-index: 40;
  width: 230px;
  padding: 14px 16px;
  background: rgba(16, 23, 54, 0.96);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}
.cabecera { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.punto { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); }
.punto.vivo { background: var(--cyan); box-shadow: 0 0 8px var(--cyan); animation: latido 1.4s infinite; }
@keyframes latido { 50% { opacity: 0.4; } }

.fila { display: flex; align-items: center; gap: 10px; }
.play {
  flex: none;
  width: 38px; height: 38px;
  display: grid; place-items: center;
  font-size: 0.85rem;
  color: var(--bg);
  background: var(--amber);
  border: none; border-radius: 50%;
  cursor: pointer;
}
.play:hover { filter: brightness(1.08); }
.nombre { margin: 0; font-size: 0.85rem; line-height: 1.25; }

.volumen { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
.volumen input { width: 100%; accent-color: var(--cyan); cursor: pointer; }

.pistas { display: flex; gap: 6px; margin-top: 12px; }
.mini {
  width: 28px; height: 28px;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
}
.mini.activo { background: var(--cyan); border-color: var(--cyan); color: var(--bg); }

@media (max-width: 520px) {
  .consola { width: auto; left: 18px; right: 18px; }
}
</style>
