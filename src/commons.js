/* commons.js
   Funciones auxiliares para construir las URLs de los recursos alojados en
   Wikimedia Commons. "Special:FilePath" entrega el archivo real a partir de su
   nombre; con ?width pedimos un tamano adecuado. Se reutiliza en varias componentes.
*/
const COMMONS = 'https://commons.wikimedia.org/wiki/Special:FilePath/'

export function urlImagen(archivo, ancho = 800) {
  return `${COMMONS}${archivo}?width=${ancho}`
}

export function urlAudio(archivo) {
  return `${COMMONS}${archivo}`
}
