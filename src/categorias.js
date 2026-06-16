/* categorias.js
   Color de acento por categoria, como en un atlas catalogado por colores.
   Se usa para los puntos y los estados activos de la interfaz.
*/
export const COLORES_CATEGORIA = {
  Planetas: '#f4c77b',   // ambar (mundos calidos)
  Galaxias: '#b3a4ff',   // violeta
  Nebulosas: '#f4a6c4',  // rosa nebular
  Misiones: '#6fe3d9'    // cian (tecnologia)
}

export function colorCategoria(categoria) {
  return COLORES_CATEGORIA[categoria] || '#6fe3d9'
}
