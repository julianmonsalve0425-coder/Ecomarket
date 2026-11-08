/**
 * TALLER PRÁCTICO 2 / 3 - ECOMARKET
 * FASE 4: Validación programática del dataset de productos
 * 
 * Reglas de validación:
 * - id: Entero único, mayor que 0.
 * - nombre: Texto obligatorio, longitud entre 3 y 80 caracteres.
 * - categoria: Categórico dentro de: "Frutas y verduras", "Despensa", "Cuidado personal", "Hogar sostenible".
 * - precio: Numérico entero positivo mayor a 0 (en COP).
 * - stock: Entero mayor o igual a 0.
 * - stockMinimo: Entero mayor o igual a 0.
 * - productor: Texto obligatorio, longitud entre 3 y 80 caracteres.
 * - ciudad: Categórico dentro de: "Bucaramanga", "Floridablanca", "Girón", "Bogotá", "Medellín", "Cali", "Tunja", "Cúcuta".
 * - organico: Booleano estricto (true o false).
 * - fechaRegistro: Fecha válida con formato YYYY-MM-DD, entre 2026-01-01 y 2026-11-03.
 * - activo: Booleano estricto (true o false).
 */

const CATEGORIAS_VALIDAS = [
  "Frutas y verduras",
  "Despensa",
  "Cuidado personal",
  "Hogar sostenible"
];

const CIUDADES_VALIDAS = [
  "Bucaramanga",
  "Floridablanca",
  "Girón",
  "Bogotá",
  "Medellín",
  "Cali",
  "Tunja",
  "Cúcuta"
];

const FECHA_MIN = new Date("2026-01-01T00:00:00");
const FECHA_MAX = new Date("2026-11-03T23:59:59");

/**
 * Valida un arreglo de productos según las reglas de negocio de EcoMarket.
 * @param {Array<Object>} lista - Arreglo de objetos producto.
 * @returns {Array<Object>} Arreglo con los errores encontrados.
 */
function validarProductos(lista) {
  const errores = [];

  if (!Array.isArray(lista)) {
    errores.push({
      id: "N/A",
      indice: -1,
      campo: "lista",
      error: "El parámetro proporcionado no es un arreglo válido."
    });
    return errores;
  }

  const idsVistos = new Set();

  lista.forEach((producto, indice) => {
    const idProd = producto && producto.id !== undefined ? producto.id : `Índice ${indice}`;

    if (!producto || typeof producto !== "object") {
      errores.push({
        id: idProd,
        indice,
        campo: "producto",
        error: "El registro no es un objeto válido."
      });
      return;
    }

    // 1. Validación de ID (entero, > 0, único)
    if (
      producto.id === undefined ||
      producto.id === null ||
      typeof producto.id !== "number" ||
      !Number.isInteger(producto.id) ||
      producto.id <= 0
    ) {
      errores.push({
        id: idProd,
        indice,
        campo: "id",
        error: `El ID debe ser un número entero mayor que 0. Valor recibido: ${producto.id}`
      });
    } else if (idsVistos.has(producto.id)) {
      errores.push({
        id: idProd,
        indice,
        campo: "id",
        error: `El ID ${producto.id} se encuentra duplicado en el dataset.`
      });
    } else {
      idsVistos.add(producto.id);
    }

    // 2. Validación de Nombre (string, 3 a 80 caracteres)
    if (typeof producto.nombre !== "string") {
      errores.push({
        id: idProd,
        indice,
        campo: "nombre",
        error: "El nombre debe ser una cadena de texto."
      });
    } else {
      const long = producto.nombre.trim().length;
      if (long < 3 || long > 80) {
        errores.push({
          id: idProd,
          indice,
          campo: "nombre",
          error: `El nombre debe tener entre 3 y 80 caracteres. Longitud actual: ${long} ('${producto.nombre}')`
        });
      }
    }

    // 3. Validación de Categoría
    if (!CATEGORIAS_VALIDAS.includes(producto.categoria)) {
      errores.push({
        id: idProd,
        indice,
        campo: "categoria",
        error: `Categoría inválida: '${producto.categoria}'. Permitidas: ${CATEGORIAS_VALIDAS.join(", ")}`
      });
    }

    // 4. Validación de Precio (entero positivo)
    if (
      typeof producto.precio !== "number" ||
      !Number.isInteger(producto.precio) ||
      producto.precio <= 0
    ) {
      errores.push({
        id: idProd,
        indice,
        campo: "precio",
        error: `El precio debe ser un número entero positivo en COP. Valor recibido: ${producto.precio}`
      });
    }

    // 5. Validación de Stock (entero >= 0)
    if (
      typeof producto.stock !== "number" ||
      !Number.isInteger(producto.stock) ||
      producto.stock < 0
    ) {
      errores.push({
        id: idProd,
        indice,
        campo: "stock",
        error: `El stock debe ser un número entero mayor o igual a 0. Valor recibido: ${producto.stock}`
      });
    }

    // 6. Validación de Stock Mínimo (entero >= 0)
    if (
      typeof producto.stockMinimo !== "number" ||
      !Number.isInteger(producto.stockMinimo) ||
      producto.stockMinimo < 0
    ) {
      errores.push({
        id: idProd,
        indice,
        campo: "stockMinimo",
        error: `El stockMinimo debe ser un número entero mayor o igual a 0. Valor recibido: ${producto.stockMinimo}`
      });
    }

    // 7. Validación de Productor (string, 3 a 80 caracteres)
    if (typeof producto.productor !== "string") {
      errores.push({
        id: idProd,
        indice,
        campo: "productor",
        error: "El productor debe ser una cadena de texto."
      });
    } else {
      const long = producto.productor.trim().length;
      if (long < 3 || long > 80) {
        errores.push({
          id: idProd,
          indice,
          campo: "productor",
          error: `El productor debe tener entre 3 y 80 caracteres. Longitud actual: ${long} ('${producto.productor}')`
        });
      }
    }

    // 8. Validación de Ciudad
    if (!CIUDADES_VALIDAS.includes(producto.ciudad)) {
      errores.push({
        id: idProd,
        indice,
        campo: "ciudad",
        error: `Ciudad no permitida: '${producto.ciudad}'. Válidas: ${CIUDADES_VALIDAS.join(", ")}`
      });
    }

    // 9. Validación de Booleano: organico
    if (typeof producto.organico !== "boolean") {
      errores.push({
        id: idProd,
        indice,
        campo: "organico",
        error: `El campo 'organico' debe ser booleano (true o false). Recibido: ${typeof producto.organico} (${producto.organico})`
      });
    }

    // 10. Validación de Booleano: activo
    if (typeof producto.activo !== "boolean") {
      errores.push({
        id: idProd,
        indice,
        campo: "activo",
        error: `El campo 'activo' debe ser booleano (true o false). Recibido: ${typeof producto.activo} (${producto.activo})`
      });
    }

    // 11. Validación de fechaRegistro (formato YYYY-MM-DD y rango 2026-01-01 a 2026-11-03)
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof producto.fechaRegistro !== "string" || !regexFecha.test(producto.fechaRegistro)) {
      errores.push({
        id: idProd,
        indice,
        campo: "fechaRegistro",
        error: `La fecha debe tener formato estricto YYYY-MM-DD. Recibido: '${producto.fechaRegistro}'`
      });
    } else {
      const fecha = new Date(`${producto.fechaRegistro}T00:00:00`);
      if (isNaN(fecha.getTime())) {
        errores.push({
          id: idProd,
          indice,
          campo: "fechaRegistro",
          error: `La fecha '${producto.fechaRegistro}' no es una fecha válida en el calendario.`
        });
      } else if (fecha < FECHA_MIN || fecha > FECHA_MAX) {
        errores.push({
          id: idProd,
          indice,
          campo: "fechaRegistro",
          error: `La fecha '${producto.fechaRegistro}' está fuera del rango permitido (2026-01-01 a 2026-11-03).`
        });
      }
    }
  });

  return errores;
}

// Dataset de prueba con errores comunes generados por IA (para evidencia de Fase 4, Paso 2 y 3)
const datasetConErrores = [
  {
    id: 1,
    nombre: "Miel", // Error: menor a 3 caracteres si tuviese espacios o borde
    categoria: "Alimentos", // Error: categoría no válida
    precio: "28000", // Error: tipo string en vez de número
    stock: -2, // Error: stock negativo
    stockMinimo: 5,
    productor: "Apiario La Montaña",
    ciudad: "Bucaramanga",
    organico: "si", // Error: texto en lugar de booleano
    fechaRegistro: "2025-12-15", // Error: fecha antes de 2026-01-01
    activo: true
  },
  {
    id: 1, // Error: ID duplicado
    nombre: "Café orgánico especial de exportación",
    categoria: "Despensa",
    precio: 32000.50, // Error: no es entero
    stock: 5,
    stockMinimo: 5,
    productor: "PR", // Error: menos de 3 caracteres
    ciudad: "Cartagena", // Error: ciudad no autorizada
    organico: true,
    fechaRegistro: "2026-12-01", // Error: fecha posterior a 2026-11-03
    activo: 1 // Error: tipo número en lugar de booleano
  }
];

/**
 * Muestra el reporte de validación en consola con formato tabular.
 */
function reportarValidacion(dataset, titulo = "REPORTE DE VALIDACIÓN") {
  console.log(`\n======================================================`);
  console.log(`🔍 ${titulo}`);
  console.log(`======================================================`);
  const reporte = validarProductos(dataset);
  if (reporte.length === 0) {
    console.log(`✅ ¡Validación exitosa! No se detectaron errores en los ${dataset.length} registros analizados.`);
  } else {
    console.warn(`⚠️ Se encontraron ${reporte.length} error(es) en el dataset:`);
    console.table(reporte);
  }
  return reporte;
}

// Exportación para entornos Node.js / módulos y para navegador
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validarProductos,
    CATEGORIAS_VALIDAS,
    CIUDADES_VALIDAS,
    datasetConErrores,
    reportarValidacion
  };
}

if (typeof window !== "undefined") {
  window.validarProductos = validarProductos;
  window.CATEGORIAS_VALIDAS = CATEGORIAS_VALIDAS;
  window.CIUDADES_VALIDAS = CIUDADES_VALIDAS;
  window.datasetConErrores = datasetConErrores;
  window.reportarValidacion = reportarValidacion;
}
