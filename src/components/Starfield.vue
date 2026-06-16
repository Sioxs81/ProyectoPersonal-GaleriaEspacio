<script setup>
/* Starfield.vue
   Campo de estrellas animado dibujado en un <canvas>.
   - Usa una REF al elemento canvas del DOM y dibuja desde el ciclo de vida.
   - Las estrellas titilan y derivan lentamente (efecto de profundidad / parallax).
   - Respeta "prefers-reduced-motion": si esta activo, dibuja un cielo fijo.
*/
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let raf = 0
let estrellas = []
let ancho = 0
let alto = 0
let animar = true
let ultimo = 0

const INTERVALO = 1000 / 30   // limitar a ~30 FPS para no recargar la CPU
const COLORES = ['#ffffff', '#ffffff', '#ffffff', '#cfe1ff', '#ffe6bd']

function dimensionar() {
  const c = canvas.value
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  ancho = window.innerWidth
  alto = window.innerHeight
  c.width = ancho * dpr
  c.height = alto * dpr
  c.style.width = ancho + 'px'
  c.style.height = alto + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  crearEstrellas()
}

function crearEstrellas() {
  const cantidad = Math.round((ancho * alto) / 14000)
  estrellas = []
  for (let i = 0; i < cantidad; i++) {
    const capa = Math.random() // 0 (lejos) .. 1 (cerca)
    estrellas.push({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      r: 0.4 + capa * 1.4,
      base: 0.22 + Math.random() * 0.6,
      vel: 0.015 + capa * 0.07,             // deriva: las cercanas se mueven mas
      fase: Math.random() * Math.PI * 2,
      brillo: 0.6 + Math.random() * 1.6,    // velocidad de titileo
      color: COLORES[Math.floor(Math.random() * COLORES.length)]
    })
  }
}

function pintar(t) {
  // Con animacion: re-agendar y saltar el cuadro si no paso el intervalo (30 FPS).
  // Sin animacion (reduce-motion): se dibuja una sola vez, sin limite.
  if (animar) {
    raf = requestAnimationFrame(pintar)
    if (t - ultimo < INTERVALO) return
    ultimo = t
  }
  ctx.clearRect(0, 0, ancho, alto)
  for (const e of estrellas) {
    const tw = animar ? 0.6 + 0.4 * Math.sin(t * 0.001 * e.brillo + e.fase) : 1
    ctx.globalAlpha = e.base * tw
    ctx.fillStyle = e.color
    ctx.beginPath()
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
    ctx.fill()
    if (animar) {
      e.y += e.vel
      if (e.y > alto + 2) {
        e.y = -2
        e.x = Math.random() * ancho
      }
    }
  }
  ctx.globalAlpha = 1
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  animar = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  dimensionar()
  window.addEventListener('resize', dimensionar)
  if (animar) raf = requestAnimationFrame(pintar)
  else pintar(0)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', dimensionar)
})
</script>

<template>
  <canvas ref="canvas" class="starfield" aria-hidden="true"></canvas>
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
