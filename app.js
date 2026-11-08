/**
 * ==========================================================================
 * TALLER PRÁCTICO 2 / 3: ECOMARKET
 * app.js - Lógica principal (Landing Page + Dashboard Administrativo)
 * 
 * Funciones clave requeridas:
 * 1. cargarProductos()
 * 2. guardarProductos()
 * 3. renderizarProductos(lista)
 * 4. filtrarProductos()
 * 5. abrirModal(id)
 * 6. guardarProducto()
 * 7. eliminarProducto(id)
 * 8. actualizarKPIs()
 * 9. actualizarGrafico()
 * ==========================================================================
 */

const LOCAL_STORAGE_KEY = "ecomarket_productos_v3";

// Diccionario de imágenes específicas y acordes a cada producto (1 al 35)
const MAPA_IMAGENES_PRODUCTOS = {
  1: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80",  // Miel de abejas pura 500 g
  2: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",  // Café especial orgánico molido 340 g
  3: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80",  // Jabón artesanal de caléndula y avena
  4: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",  // Canasta familiar de verduras agroecológicas
  5: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",  // Bolsa ecológica de compras reutilizable
  6: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",  // Aguacate Hass orgánico x 1 kg
  7: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",  // Bebida vegetal de avena orgánica 1 L
  8: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80",  // Champú sólido de romero y menta 90 g
  9: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",  // Cepillo dental de bambú biodegradable
  10: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",  // Fresas silvestres orgánicas 500 g
  11: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",  // Aceite de oliva virgen extra 500 ml
  12: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",  // Desodorante natural libre de aluminio 60 g
  13: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",  // Botella térmica de acero inoxidable 750 ml
  14: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=600&q=80",  // Mora de castilla agroecológica 1 kg
  15: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",  // Quinua perlada orgánica 500 g
  16: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",  // Crema facial hidratante de aloe vera 50 ml
  17: "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?auto=format&fit=crop&w=600&q=80",  // Tabla de madera artesanal para cocina
  18: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80",  // Mix de lechugas hidropónicas gourmet 300 g
  19: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",  // Harina de almendras pura 400 g
  20: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",  // Protector solar mineral biodegradable FPS 50 100 ml
  21: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80",  // Limpiador multiusos ecológico en spray 500 ml
  22: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",  // Tomate chonto agroecológico 1 kg
  23: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",  // Especias y condimentos orgánicos surtidos 150 g
  24: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",  // Aceite esencial de eucalipto orgánico 15 ml
  25: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80",  // Olla de cerámica ecológica para cocina
  26: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=600&q=80",  // Zanahorias baby orgánicas 500 g
  27: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",  // Cacao ceremonial orgánico al 100% 250 g
  28: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=80",  // Bálsamo labial de manteca de cacao y karité
  29: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",  // Vela de cera de soya aromatizada con lavanda
  30: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",  // Plátano hartón agroecológico x racimo 3 kg
  31: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",  // Té verde orgánico en hebras 100 g
  32: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80",  // Aceite de coco virgen prensado en frío 250 ml
  33: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",  // Planta de aloe vera en maceta de cerámica
  34: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",  // Espinaca criolla fresca y limpia 400 g
  35: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",  // Semillas de chía orgánica 300 g
};

// Estado global de la aplicación
const AppState = {
  productos: [],          // Colección maestra original de productos
  productosFiltrados: [], // Subconjunto resultante tras aplicar filtros
  idEnEdicion: null,      // ID numérico si se edita, o null si es nuevo
  idParaEliminar: null,   // ID pendiente de confirmación de eliminación
  vistaCatalogo: "cards", // "cards" | "tabla"
  chartInstance: null     // Instancia de Chart.js
};

// Formateador de moneda colombiana
const formateadorCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

// Cache de elementos del DOM
const DOM = {
  // Selector global de vistas (Landing / Dashboard)
  btnSwitchLanding: document.getElementById("btnSwitchLanding"),
  btnSwitchDashboard: document.getElementById("btnSwitchDashboard"),
  vistaLanding: document.getElementById("vistaLanding"),
  vistaDashboard: document.getElementById("vistaDashboard"),
  btnNavIrDashboard: document.getElementById("btnNavIrDashboard"),
  btnHeroIrDashboard: document.getElementById("btnHeroIrDashboard"),
  btnExplorar35: document.getElementById("btnExplorar35"),

  // Navegación Landing móvil
  landingNavToggle: document.getElementById("landingNavToggle"),
  landingNavMenu: document.getElementById("landingNavMenu"),
  formSuscripcion: document.getElementById("formSuscripcion"),

  // Sidebar y controles responsive del Dashboard
  hamburgerBtn: document.getElementById("hamburgerBtn"),
  hamburgerIcon: document.getElementById("hamburgerIcon"),
  dashboardSidebar: document.getElementById("dashboardSidebar"),
  sidebarBackdrop: document.getElementById("sidebarBackdrop"),
  sidebarCloseBtn: document.getElementById("sidebarCloseBtn"),
  sidebarLinks: document.querySelectorAll(".sidebar-link"),

  // KPIs
  kpiTotalProductos: document.getElementById("kpiTotalProductos"),
  kpiInventarioBajo: document.getElementById("kpiInventarioBajo"),
  kpiValorInventario: document.getElementById("kpiValorInventario"),

  // Filtros y búsquedas
  inputBusqueda: document.getElementById("inputBusqueda"),
  btnClearSearch: document.getElementById("btnClearSearch"),
  selectCategoria: document.getElementById("selectCategoria"),
  selectCiudad: document.getElementById("selectCiudad"),
  selectEstado: document.getElementById("selectEstado"),
  btnLimpiarFiltros: document.getElementById("btnLimpiarFiltros"),
  contadorResultados: document.getElementById("contadorResultados"),
  btnRestaurarDesdeVacio: document.getElementById("btnRestaurarDesdeVacio"),

  // Contenedores del catálogo
  btnVistaCards: document.getElementById("btnVistaCards"),
  btnVistaTabla: document.getElementById("btnVistaTabla"),
  contenedorCards: document.getElementById("contenedorCards"),
  contenedorTabla: document.getElementById("contenedorTabla"),
  tablaBodyProductos: document.getElementById("tablaBodyProductos"),
  emptyState: document.getElementById("emptyState"),

  // Modal CRUD Producto
  modalProductoBackdrop: document.getElementById("modalProductoBackdrop"),
  modalTitulo: document.getElementById("modalTitulo"),
  modalBtnCerrar: document.getElementById("modalBtnCerrar"),
  modalBtnCancelar: document.getElementById("modalBtnCancelar"),
  btnAbrirModalNuevo: document.getElementById("btnAbrirModalNuevo"),
  formProducto: document.getElementById("formProducto"),
  productoId: document.getElementById("productoId"),
  prodNombre: document.getElementById("prodNombre"),
  prodCategoria: document.getElementById("prodCategoria"),
  prodCiudad: document.getElementById("prodCiudad"),
  prodProductor: document.getElementById("prodProductor"),
  prodPrecio: document.getElementById("prodPrecio"),
  prodStock: document.getElementById("prodStock"),
  prodStockMinimo: document.getElementById("prodStockMinimo"),
  prodOrganico: document.getElementById("prodOrganico"),
  prodActivo: document.getElementById("prodActivo"),

  // Errores del formulario
  errProdNombre: document.getElementById("errProdNombre"),
  errProdCategoria: document.getElementById("errProdCategoria"),
  errProdCiudad: document.getElementById("errProdCiudad"),
  errProdProductor: document.getElementById("errProdProductor"),
  errProdPrecio: document.getElementById("errProdPrecio"),
  errProdStock: document.getElementById("errProdStock"),
  errProdStockMinimo: document.getElementById("errProdStockMinimo"),

  // Modal Confirmar Eliminar
  modalEliminarBackdrop: document.getElementById("modalEliminarBackdrop"),
  modalEliminarBtnCerrar: document.getElementById("modalEliminarBtnCerrar"),
  modalEliminarBtnCancelar: document.getElementById("modalEliminarBtnCancelar"),
  modalEliminarBtnConfirmar: document.getElementById("modalEliminarBtnConfirmar"),
  nombreProductoEliminar: document.getElementById("nombreProductoEliminar"),

  // Globales
  btnRestablecerDataset: document.getElementById("btnRestablecerDataset"),
  toastContainer: document.getElementById("toastContainer"),
  graficoCategoriasCanvas: document.getElementById("graficoCategorias")
};

/* ==========================================================================
   1. FUNCIÓN: cargarProductos() (Fase 5, Paso 5)
   ========================================================================== */
/**
 * Consulta si existen datos en localStorage. Si existen, los usa; si no,
 * realiza fetch de productos.json o utiliza el dataset embebido de respaldo.
 */
async function cargarProductos() {
  try {
    localStorage.removeItem("ecomarket_productos_v1");
    localStorage.removeItem("ecomarket_productos_v2");
  } catch (e) {}

  const datosGuardados = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (datosGuardados) {
    try {
      const parseados = JSON.parse(datosGuardados);
      if (Array.isArray(parseados) && parseados.length > 0) {
        AppState.productos = parseados.map((prod) => {
          const imgAccorde = MAPA_IMAGENES_PRODUCTOS[prod.id] || prod.imagen || obtenerImagenProducto(prod);
          return {
            ...prod,
            imagen: imgAccorde
          };
        });
        guardarProductos();
        inicializarInterfaz();
        return;
      }
    } catch (e) {
      console.warn("Error leyendo localStorage. Se recargará productos.json", e);
    }
  }

  try {
    const res = await fetch("productos.json");
    if (!res.ok) throw new Error(HTTP );
    const data = await res.json();
    AppState.productos = data.map((prod) => ({
      ...prod,
      imagen: MAPA_IMAGENES_PRODUCTOS[prod.id] || prod.imagen || obtenerImagenProducto(prod)
    }));
    guardarProductos();
  } catch (error) {
    console.warn("Fetch local bloqueado por CORS (modo archivo directo). Cargando dataset semilla integrado.", error);
    AppState.productos = obtenerDatasetRespaldo().map((prod) => ({
      ...prod,
      imagen: MAPA_IMAGENES_PRODUCTOS[prod.id] || prod.imagen || obtenerImagenProducto(prod)
    }));
    guardarProductos();
  }

  inicializarInterfaz();
}

function inicializarInterfaz() {
  AppState.productosFiltrados = [...AppState.productos];
  renderizarProductos(AppState.productosFiltrados);
  actualizarKPIs();
  actualizarGrafico();
}

/* ==========================================================================
   2. FUNCIÓN: guardarProductos() (Fase 5, Paso 5)
   ========================================================================== */
/**
 * Serializa el arreglo a JSON y lo guarda en localStorage.
 */
function guardarProductos() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(AppState.productos));
  } catch (err) {
    console.error("Error al persistir en localStorage:", err);
    mostrarToast("No se pudo guardar la información en localStorage.", "error");
  }
}

/* ==========================================================================
   3. FUNCIÓN: renderizarProductos(lista) (Fase 5, Paso 2 y Fase 2, Paso 3)
   ========================================================================== */
/**
 * Renderiza los productos en Cards Grid o Tabla Responsive.
 * @param {Array<Object>} lista - Productos a renderizar.
 */
function renderizarProductos(lista) {
  const total = AppState.productos.length;
  const visibles = lista.length;
  DOM.contadorResultados.textContent = `Mostrando ${visibles} de ${total} referencias registradas`;

  if (lista.length === 0) {
    DOM.contenedorCards.innerHTML = "";
    DOM.tablaBodyProductos.innerHTML = "";
    DOM.contenedorCards.style.display = "none";
    DOM.contenedorTabla.style.display = "none";
    DOM.emptyState.style.display = "block";
    return;
  }

  DOM.emptyState.style.display = "none";

  if (AppState.vistaCatalogo === "cards") {
    DOM.contenedorCards.style.display = "grid";
    DOM.contenedorTabla.style.display = "none";
    renderizarCards(lista);
  } else {
    DOM.contenedorCards.style.display = "none";
    DOM.contenedorTabla.style.display = "block";
    renderizarTabla(lista);
  }
}

/**
 * Helper: Obtiene la imagen adecuada para el producto o un fallback temático
 */
function obtenerImagenProducto(p) {
  if (!p) return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80";

  // Prioridad 1: Si el producto tiene un ID del catálogo 1-35, usar SIEMPRE su foto específica y fidedigna
  if (p.id && MAPA_IMAGENES_PRODUCTOS[p.id]) {
    return MAPA_IMAGENES_PRODUCTOS[p.id];
  }

  // Prioridad 2: Si tiene una imagen personalizada asignada que no sea el fallback genérico
  if (p.imagen && typeof p.imagen === "string" && p.imagen.trim().length > 0 && !p.imagen.includes("photo-1610832958506") && !p.imagen.includes("photo-1542838132")) {
    return p.imagen;
  }

  // Prioridad 3: Fallbacks temáticos acordes por categoría
  const fallbacks = {
    "Frutas y verduras": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "Despensa": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80",
    "Cuidado personal": "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80",
    "Hogar sostenible": "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=600&q=80"
  };
  return fallbacks[p.categoria] || fallbacks["Frutas y verduras"];
}

/**
 * Renderizado de Cards
 */
function renderizarCards(lista) {
  DOM.contenedorCards.innerHTML = "";
  const fragment = document.createDocumentFragment();

  lista.forEach((p) => {
    const estado = calcularEstado(p.stock, p.stockMinimo);
    const codigo = `ECO${String(p.id).padStart(3, "0")}`;
    const imgUrl = obtenerImagenProducto(p);

    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-id", p.id);

    card.innerHTML = `
      <div class="product-card-img-wrap">
        <img 
          src="${imgUrl}" 
          alt="${escaparHTML(p.nombre)}" 
          class="product-card-img" 
          loading="lazy"
          onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';"
        >
        <span class="status-badge ${estado.clase}">${estado.texto}</span>
      </div>

      <div class="card-top">
        <div class="card-category-city">
          <span class="product-code-tag">${codigo}</span>
          <span class="badge-category">${escaparHTML(p.categoria)}</span>
          <span class="badge-category">📍 ${escaparHTML(p.ciudad)}</span>
          ${p.organico ? '<span class="pill-badge pill-organic" style="font-size:0.65rem; padding: 0.15rem 0.4rem;">🌿 Orgánico</span>' : ''}
        </div>
      </div>

      <h3 class="product-title">${escaparHTML(p.nombre)}</h3>
      <p class="product-producer-text">Productor: <strong>${escaparHTML(p.productor)}</strong></p>

      <div class="card-details-box">
        <div class="detail-item">
          <span class="detail-label">Precio Unitario</span>
          <span class="detail-value price-value">${formateadorCOP.format(p.precio)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Stock / Mínimo</span>
          <span class="detail-value">${p.stock} / <span class="text-muted">${p.stockMinimo}</span></span>
        </div>
      </div>

      <div class="card-actions">
        <button type="button" class="btn btn-sm btn-card-edit" onclick="abrirModal(${p.id})">
          ✏️ Editar
        </button>
        <button type="button" class="btn btn-sm btn-card-delete" onclick="solicitarEliminacion(${p.id})">
          🗑️ Eliminar
        </button>
      </div>
    `;

    fragment.appendChild(card);
  });

  DOM.contenedorCards.appendChild(fragment);
}

/**
 * Renderizado de Tabla con Zebra Striping y Badges de Semáforo
 */
function renderizarTabla(lista) {
  DOM.tablaBodyProductos.innerHTML = "";
  const fragment = document.createDocumentFragment();

  lista.forEach((p) => {
    const estado = calcularEstado(p.stock, p.stockMinimo);
    const codigo = `ECO${String(p.id).padStart(3, "0")}`;
    const imgUrl = obtenerImagenProducto(p);

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="col-code">${codigo}</td>
      <td class="col-name">
        <div class="table-product-info">
          <img src="${imgUrl}" alt="${escaparHTML(p.nombre)}" class="table-product-thumb" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80';">
          <div>
            <strong>${escaparHTML(p.nombre)}</strong>
            ${p.organico ? '<small class="text-success" style="font-size:0.75rem;">🌿 100% Orgánico</small>' : ''}
          </div>
        </div>
      </td>
      <td><span class="badge-category">${escaparHTML(p.categoria)}</span></td>
      <td class="col-price">${formateadorCOP.format(p.precio)}</td>
      <td class="col-stock"><strong>${p.stock}</strong> <span class="text-muted">(mín: ${p.stockMinimo})</span></td>
      <td>${escaparHTML(p.productor)} <small class="d-block text-muted">📍 ${escaparHTML(p.ciudad)}</small></td>
      <td><span class="status-badge ${estado.clase}">${estado.texto}</span></td>
      <td class="text-center">
        <div class="table-actions">
          <button type="button" class="btn btn-outline btn-table-action" onclick="abrirModal(${p.id})" title="Editar producto">✏️</button>
          <button type="button" class="btn btn-danger btn-table-action" onclick="solicitarEliminacion(${p.id})" title="Eliminar producto">🗑️</button>
        </div>
      </td>
    `;

    fragment.appendChild(tr);
  });

  DOM.tablaBodyProductos.appendChild(fragment);
}

/**
 * Regla de cálculo de estado de inventario:
 * - Agotado si stock == 0
 * - Stock bajo si stock > 0 y stock <= stockMinimo
 * - Disponible si stock > stockMinimo
 */
function calcularEstado(stock, stockMinimo) {
  if (stock === 0) {
    return { texto: "Agotado", clase: "badge-danger" };
  } else if (stock > 0 && stock <= stockMinimo) {
    return { texto: "Stock bajo", clase: "badge-warning" };
  } else {
    return { texto: "Disponible", clase: "badge-success" };
  }
}

function normalizarTexto(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ==========================================================================
   4. FUNCIÓN: filtrarProductos() (Fase 5, Paso 3)
   ========================================================================== */
/**
 * Aplica búsqueda en tiempo real y filtros combinados simultáneos
 * sin alterar el dataset original. Búsqueda insensible a tildes y mayúsculas.
 */
function filtrarProductos() {
  const texto = DOM.inputBusqueda.value.trim();
  const textoNorm = normalizarTexto(texto);
  const categoria = DOM.selectCategoria.value;
  const ciudad = DOM.selectCiudad.value;
  const estado = DOM.selectEstado.value;

  DOM.btnClearSearch.style.display = texto.length > 0 ? "flex" : "none";

  AppState.productosFiltrados = AppState.productos.filter((prod) => {
    const matchTexto = !textoNorm ||
      normalizarTexto(prod.nombre).includes(textoNorm) ||
      normalizarTexto(prod.productor).includes(textoNorm);

    const matchCategoria = !categoria || prod.categoria === categoria;
    const matchCiudad = !ciudad || prod.ciudad === ciudad;

    let matchEstado = true;
    if (estado) {
      const estadoCalc = calcularEstado(prod.stock, prod.stockMinimo).texto;
      matchEstado = estadoCalc === estado;
    }

    return matchTexto && matchCategoria && matchCiudad && matchEstado;
  });

  renderizarProductos(AppState.productosFiltrados);
}

function limpiarFiltros() {
  DOM.inputBusqueda.value = "";
  DOM.btnClearSearch.style.display = "none";
  DOM.selectCategoria.value = "";
  DOM.selectCiudad.value = "";
  DOM.selectEstado.value = "";
  filtrarProductos();
  mostrarToast("Filtros restablecidos.", "warning");
}

/* ==========================================================================
   5. FUNCIÓN: abrirModal(id) (Fase 5, Paso 4)
   ========================================================================== */
function abrirModal(id = null) {
  limpiarErroresFormulario();
  DOM.formProducto.reset();

  if (id !== null && id !== undefined) {
    const p = AppState.productos.find((x) => x.id === Number(id));
    if (!p) {
      mostrarToast("Producto no encontrado para editar.", "error");
      return;
    }

    AppState.idEnEdicion = p.id;
    DOM.modalTitulo.textContent = `Editar producto (ECO${String(p.id).padStart(3, "0")})`;
    DOM.productoId.value = p.id;
    DOM.prodNombre.value = p.nombre;
    DOM.prodCategoria.value = p.categoria;
    DOM.prodCiudad.value = p.ciudad;
    DOM.prodProductor.value = p.productor;
    DOM.prodPrecio.value = p.precio;
    DOM.prodStock.value = p.stock;
    DOM.prodStockMinimo.value = p.stockMinimo;
    DOM.prodOrganico.checked = Boolean(p.organico);
    DOM.prodActivo.checked = Boolean(p.activo);
  } else {
    AppState.idEnEdicion = null;
    DOM.modalTitulo.textContent = "Agregar nuevo producto";
    DOM.productoId.value = "";
    DOM.prodOrganico.checked = true;
    DOM.prodActivo.checked = true;
  }

  DOM.modalProductoBackdrop.style.display = "flex";
  DOM.prodNombre.focus();
}

function cerrarModal() {
  DOM.modalProductoBackdrop.style.display = "none";
  AppState.idEnEdicion = null;
  DOM.formProducto.reset();
  limpiarErroresFormulario();
}

/* ==========================================================================
   6. FUNCIÓN: guardarProducto(evento) (Fase 5, Paso 4)
   ========================================================================== */
function guardarProducto(evento) {
  if (evento) evento.preventDefault();
  limpiarErroresFormulario();

  const nombre = DOM.prodNombre.value.trim();
  const categoria = DOM.prodCategoria.value;
  const ciudad = DOM.prodCiudad.value;
  const productor = DOM.prodProductor.value.trim();
  const precio = parseInt(DOM.prodPrecio.value, 10);
  const stock = parseInt(DOM.prodStock.value, 10);
  const stockMinimo = parseInt(DOM.prodStockMinimo.value, 10);
  const organico = DOM.prodOrganico.checked;
  const activo = DOM.prodActivo.checked;

  let hayErrores = false;

  if (!nombre || nombre.length < 3 || nombre.length > 80) {
    DOM.errProdNombre.textContent = "El nombre debe tener entre 3 y 80 caracteres.";
    hayErrores = true;
  }
  if (!categoria) {
    DOM.errProdCategoria.textContent = "Selecciona una categoría válida.";
    hayErrores = true;
  }
  if (!ciudad) {
    DOM.errProdCiudad.textContent = "Selecciona una ciudad válida.";
    hayErrores = true;
  }
  if (!productor || productor.length < 3 || productor.length > 80) {
    DOM.errProdProductor.textContent = "El productor debe tener entre 3 y 80 caracteres.";
    hayErrores = true;
  }
  if (isNaN(precio) || precio <= 0) {
    DOM.errProdPrecio.textContent = "Ingresa un precio entero positivo en COP.";
    hayErrores = true;
  }
  if (isNaN(stock) || stock < 0) {
    DOM.errProdStock.textContent = "El stock debe ser mayor o igual a 0.";
    hayErrores = true;
  }
  if (isNaN(stockMinimo) || stockMinimo < 0) {
    DOM.errProdStockMinimo.textContent = "El stock mínimo debe ser mayor o igual a 0.";
    hayErrores = true;
  }

  if (hayErrores) return;

  const fechaHoy = new Date().toISOString().split("T")[0];

  if (AppState.idEnEdicion) {
    const idx = AppState.productos.findIndex((p) => p.id === AppState.idEnEdicion);
    if (idx !== -1) {
      AppState.productos[idx] = {
        ...AppState.productos[idx],
        nombre,
        categoria,
        ciudad,
        productor,
        precio,
        stock,
        stockMinimo,
        organico,
        activo
      };
      mostrarToast(`"${nombre}" actualizado con éxito.`, "success");
    }
  } else {
    const maxId = AppState.productos.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const nuevoId = maxId + 1;

    AppState.productos.push({
      id: nuevoId,
      nombre,
      categoria,
      precio,
      stock,
      stockMinimo,
      productor,
      ciudad,
      organico,
      fechaRegistro: fechaHoy,
      activo
    });
    mostrarToast(`"${nombre}" agregado con código ECO${String(nuevoId).padStart(3, "0")}.`, "success");
  }

  guardarProductos();
  filtrarProductos();
  actualizarKPIs();
  actualizarGrafico();
  cerrarModal();
}

function limpiarErroresFormulario() {
  DOM.errProdNombre.textContent = "";
  DOM.errProdCategoria.textContent = "";
  DOM.errProdCiudad.textContent = "";
  DOM.errProdProductor.textContent = "";
  DOM.errProdPrecio.textContent = "";
  DOM.errProdStock.textContent = "";
  DOM.errProdStockMinimo.textContent = "";
}

/* ==========================================================================
   7. FUNCIÓN: eliminarProducto(id) (Fase 5, Paso 4)
   ========================================================================== */
function solicitarEliminacion(id) {
  const p = AppState.productos.find((x) => x.id === Number(id));
  if (!p) return;

  AppState.idParaEliminar = p.id;
  DOM.nombreProductoEliminar.textContent = `"${p.nombre}" (Código: ECO${String(p.id).padStart(3, "0")})`;
  DOM.modalEliminarBackdrop.style.display = "flex";
}

function cerrarModalEliminar() {
  DOM.modalEliminarBackdrop.style.display = "none";
  AppState.idParaEliminar = null;
}

function confirmarEliminacion() {
  if (!AppState.idParaEliminar) return;
  eliminarProducto(AppState.idParaEliminar);
  cerrarModalEliminar();
}

function eliminarProducto(id) {
  const p = AppState.productos.find((x) => x.id === id);
  const nombre = p ? p.nombre : `ID ${id}`;

  AppState.productos = AppState.productos.filter((x) => x.id !== id);

  guardarProductos();
  filtrarProductos();
  actualizarKPIs();
  actualizarGrafico();
  mostrarToast(`"${nombre}" eliminado del inventario.`, "error");
}

/* ==========================================================================
   8. FUNCIÓN: actualizarKPIs() (Fase 2, Paso 2)
   ========================================================================== */
function actualizarKPIs() {
  const activos = AppState.productos.filter((p) => p.activo !== false).length;
  const bajoStock = AppState.productos.filter((p) => p.stock <= p.stockMinimo).length;
  const valorTotal = AppState.productos.reduce((acum, p) => acum + (p.precio * p.stock), 0);

  DOM.kpiTotalProductos.textContent = activos;
  DOM.kpiInventarioBajo.textContent = bajoStock;
  DOM.kpiValorInventario.textContent = formateadorCOP.format(valorTotal);
}

/* ==========================================================================
   9. FUNCIÓN: actualizarGrafico() (Fase 5, Paso 6 Bonus)
   ========================================================================== */
function actualizarGrafico() {
  if (!DOM.graficoCategoriasCanvas || typeof Chart === "undefined") return;

  const categorias = [
    "Frutas y verduras",
    "Despensa",
    "Cuidado personal",
    "Hogar sostenible"
  ];

  const conteos = categorias.map((cat) => {
    return AppState.productos.filter((p) => p.categoria === cat).length;
  });

  const coloresFondo = [
    "rgba(76, 175, 80, 0.75)",
    "rgba(121, 85, 72, 0.75)",
    "rgba(38, 166, 154, 0.75)",
    "rgba(255, 152, 0, 0.75)"
  ];

  const coloresBorde = [
    "#2e7d32",
    "#5d4037",
    "#00695c",
    "#e65100"
  ];

  if (AppState.chartInstance) {
    AppState.chartInstance.data.datasets[0].data = conteos;
    AppState.chartInstance.update();
  } else {
    const ctx = DOM.graficoCategoriasCanvas.getContext("2d");
    AppState.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categorias,
        datasets: [{
          label: "Cantidad de Referencias",
          data: conteos,
          backgroundColor: coloresFondo,
          borderColor: coloresBorde,
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y} productos registrados`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 2, font: { family: "'Outfit', sans-serif" } },
            grid: { color: "#e0e5dd" }
          },
          x: {
            ticks: { font: { family: "'Outfit', sans-serif", weight: "bold" } },
            grid: { display: false }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   10. SELECTOR DE VISTAS (TIENDA LANDING / DASHBOARD)
   ========================================================================== */
function activarVista(vista = "landing") {
  if (vista === "dashboard") {
    DOM.vistaLanding.style.display = "none";
    DOM.vistaLanding.classList.remove("active");
    DOM.vistaDashboard.style.display = "block";
    DOM.vistaDashboard.classList.add("active");

    DOM.btnSwitchLanding.classList.remove("active");
    DOM.btnSwitchLanding.setAttribute("aria-selected", "false");
    DOM.btnSwitchDashboard.classList.add("active");
    DOM.btnSwitchDashboard.setAttribute("aria-selected", "true");

    // Redimensionar gráfico si es necesario
    if (AppState.chartInstance) {
      setTimeout(() => AppState.chartInstance.resize(), 50);
    }
  } else {
    DOM.vistaDashboard.style.display = "none";
    DOM.vistaDashboard.classList.remove("active");
    DOM.vistaLanding.style.display = "block";
    DOM.vistaLanding.classList.add("active");

    DOM.btnSwitchDashboard.classList.remove("active");
    DOM.btnSwitchDashboard.setAttribute("aria-selected", "false");
    DOM.btnSwitchLanding.classList.add("active");
    DOM.btnSwitchLanding.setAttribute("aria-selected", "true");
  }
}

function configurarSelectorDeVistas() {
  DOM.btnSwitchLanding.addEventListener("click", () => activarVista("landing"));
  DOM.btnSwitchDashboard.addEventListener("click", () => activarVista("dashboard"));

  if (DOM.btnNavIrDashboard) DOM.btnNavIrDashboard.addEventListener("click", () => activarVista("dashboard"));
  if (DOM.btnHeroIrDashboard) DOM.btnHeroIrDashboard.addEventListener("click", () => activarVista("dashboard"));
  if (DOM.btnExplorar35) DOM.btnExplorar35.addEventListener("click", () => activarVista("dashboard"));

  document.querySelectorAll(".btn-link-dashboard").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activarVista("dashboard");
      const cat = btn.getAttribute("data-cat");
      if (cat) {
        DOM.selectCategoria.value = cat;
        filtrarProductos();
      }
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".btn-link-landing").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activarVista("landing");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Hash inicial
  if (window.location.hash.includes("dashboard") || window.location.hash.includes("filtros") || window.location.hash.includes("modal") || window.location.hash.includes("grafico")) {
    activarVista("dashboard");
    if (window.location.hash.includes("filtros")) {
      setTimeout(() => {
        DOM.inputBusqueda.value = "Café";
        DOM.selectCategoria.value = "Despensa";
        filtrarProductos();
      }, 200);
    } else if (window.location.hash.includes("modal")) {
      setTimeout(() => {
        abrirModal(2); // Precarga el producto 2 en el modal
      }, 200);
    } else if (window.location.hash.includes("grafico")) {
      setTimeout(() => {
        const estSec = document.getElementById("estadisticas");
        if (estSec) estSec.scrollIntoView();
      }, 200);
    }
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash.includes("dashboard")) {
      activarVista("dashboard");
    } else if (window.location.hash.includes("inicio") || window.location.hash.includes("landing")) {
      activarVista("landing");
    }
  });
}

/* ==========================================================================
   11. MENÚ HAMBURGUESA Y COMPONENTES
   ========================================================================== */
function configurarMenuHamburguesa() {
  const toggleSidebar = (abrir) => {
    const abierto = DOM.dashboardSidebar.classList.contains("sidebar-open");
    const nuevo = abrir !== undefined ? abrir : !abierto;

    if (nuevo) {
      DOM.dashboardSidebar.classList.add("sidebar-open");
      DOM.sidebarBackdrop.classList.add("active");
      DOM.hamburgerBtn.setAttribute("aria-expanded", "true");
      DOM.hamburgerIcon.textContent = "✕";
    } else {
      DOM.dashboardSidebar.classList.remove("sidebar-open");
      DOM.sidebarBackdrop.classList.remove("active");
      DOM.hamburgerBtn.setAttribute("aria-expanded", "false");
      DOM.hamburgerIcon.textContent = "☰";
    }
  };

  if (DOM.hamburgerBtn) DOM.hamburgerBtn.addEventListener("click", () => toggleSidebar());
  if (DOM.sidebarCloseBtn) DOM.sidebarCloseBtn.addEventListener("click", () => toggleSidebar(false));
  if (DOM.sidebarBackdrop) DOM.sidebarBackdrop.addEventListener("click", () => toggleSidebar(false));

  DOM.sidebarLinks.forEach((l) => {
    l.addEventListener("click", () => {
      if (window.innerWidth < 1024) toggleSidebar(false);
      DOM.sidebarLinks.forEach((x) => x.classList.remove("active"));
      l.classList.add("active");
    });
  });

  // Menú móvil Landing
  if (DOM.landingNavToggle && DOM.landingNavMenu) {
    DOM.landingNavToggle.addEventListener("click", () => {
      const open = DOM.landingNavMenu.classList.toggle("nav-open");
      DOM.landingNavToggle.setAttribute("aria-expanded", open);
      DOM.landingNavToggle.querySelector(".toggle-icon").textContent = open ? "✕" : "☰";
    });
    DOM.landingNavMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        DOM.landingNavMenu.classList.remove("nav-open");
        DOM.landingNavToggle.setAttribute("aria-expanded", "false");
        DOM.landingNavToggle.querySelector(".toggle-icon").textContent = "☰";
      });
    });
  }

  // Formulario Suscripción Landing
  if (DOM.formSuscripcion) {
    DOM.formSuscripcion.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = document.getElementById("nombreSuscriptor");
      const mail = document.getElementById("correoSuscriptor");
      const errNom = document.getElementById("errorNombreSuscriptor");
      const errMail = document.getElementById("errorCorreoSuscriptor");
      const fb = document.getElementById("feedbackSuscripcion");

      errNom.textContent = "";
      errMail.textContent = "";
      fb.textContent = "";
      fb.className = "form-feedback";

      let ok = true;
      if (!nom.value.trim() || nom.value.trim().length < 3) {
        errNom.textContent = "Ingresa tu nombre (mínimo 3 caracteres).";
        ok = false;
      }
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!mail.value.trim() || !re.test(mail.value.trim())) {
        errMail.textContent = "Ingresa un correo electrónico válido.";
        ok = false;
      }

      if (ok) {
        fb.textContent = `¡Gracias ${nom.value.trim()}! Hemos enviado tu bono de descuento al correo ${mail.value.trim()}.`;
        fb.classList.add("feedback-success");
        DOM.formSuscripcion.reset();
        mostrarToast("Suscripción confirmada.", "success");
      }
    });
  }
}

/* ==========================================================================
   12. LISTENERS Y UTILIDADES
   ========================================================================== */
function registrarEventListeners() {
  DOM.inputBusqueda.addEventListener("input", filtrarProductos);
  DOM.selectCategoria.addEventListener("change", filtrarProductos);
  DOM.selectCiudad.addEventListener("change", filtrarProductos);
  DOM.selectEstado.addEventListener("change", filtrarProductos);
  DOM.btnLimpiarFiltros.addEventListener("click", limpiarFiltros);
  DOM.btnRestaurarDesdeVacio.addEventListener("click", limpiarFiltros);

  DOM.btnClearSearch.addEventListener("click", () => {
    DOM.inputBusqueda.value = "";
    DOM.inputBusqueda.focus();
    filtrarProductos();
  });

  DOM.btnVistaCards.addEventListener("click", () => {
    AppState.vistaCatalogo = "cards";
    DOM.btnVistaCards.classList.add("active");
    DOM.btnVistaCards.setAttribute("aria-pressed", "true");
    DOM.btnVistaTabla.classList.remove("active");
    DOM.btnVistaTabla.setAttribute("aria-pressed", "false");
    renderizarProductos(AppState.productosFiltrados);
  });

  DOM.btnVistaTabla.addEventListener("click", () => {
    AppState.vistaCatalogo = "tabla";
    DOM.btnVistaTabla.classList.add("active");
    DOM.btnVistaTabla.setAttribute("aria-pressed", "true");
    DOM.btnVistaCards.classList.remove("active");
    DOM.btnVistaCards.setAttribute("aria-pressed", "false");
    renderizarProductos(AppState.productosFiltrados);
  });

  DOM.btnAbrirModalNuevo.addEventListener("click", () => abrirModal(null));
  DOM.modalBtnCerrar.addEventListener("click", cerrarModal);
  DOM.modalBtnCancelar.addEventListener("click", cerrarModal);
  DOM.formProducto.addEventListener("submit", guardarProducto);

  DOM.modalProductoBackdrop.addEventListener("click", (e) => {
    if (e.target === DOM.modalProductoBackdrop) cerrarModal();
  });

  DOM.modalEliminarBtnCerrar.addEventListener("click", cerrarModalEliminar);
  DOM.modalEliminarBtnCancelar.addEventListener("click", cerrarModalEliminar);
  DOM.modalEliminarBtnConfirmar.addEventListener("click", confirmarEliminacion);
  DOM.modalEliminarBackdrop.addEventListener("click", (e) => {
    if (e.target === DOM.modalEliminarBackdrop) cerrarModalEliminar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModal();
      cerrarModalEliminar();
    }
  });

  if (DOM.btnRestablecerDataset) {
    DOM.btnRestablecerDataset.addEventListener("click", () => {
      if (confirm("¿Restablecer el inventario original de fábrica?")) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        cargarProductos();
        mostrarToast("Dataset restablecido a los 35 registros.", "success");
      }
    });
  }
}

function mostrarToast(mensaje, tipo = "info") {
  if (!DOM.toastContainer) return;
  const t = document.createElement("div");
  t.className = `toast toast-${tipo}`;
  let icono = "ℹ️";
  if (tipo === "success") icono = "✅";
  if (tipo === "error") icono = "❌";
  if (tipo === "warning") icono = "⚠️";

  t.innerHTML = `<span aria-hidden="true">${icono}</span> <span>${escaparHTML(mensaje)}</span>`;
  DOM.toastContainer.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateY(15px)";
    t.style.transition = "all 0.3s ease";
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

function escaparHTML(texto) {
  if (texto === null || texto === undefined) return "";
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function obtenerDatasetRespaldo() {
  return [
    {
        "id":  1,
        "nombre":  "Miel de abejas pura 500 g",
        "categoria":  "Despensa",
        "precio":  28000,
        "stock":  18,
        "stockMinimo":  5,
        "productor":  "Apiario La Montaña",
        "ciudad":  "Bucaramanga",
        "organico":  true,
        "fechaRegistro":  "2026-10-15",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  2,
        "nombre":  "Café especial orgánico molido 340 g",
        "categoria":  "Despensa",
        "precio":  24500,
        "stock":  25,
        "stockMinimo":  8,
        "productor":  "Café de la Sierra",
        "ciudad":  "Cali",
        "organico":  true,
        "fechaRegistro":  "2026-09-20",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  3,
        "nombre":  "Jabón artesanal de caléndula y avena",
        "categoria":  "Cuidado personal",
        "precio":  12000,
        "stock":  4,
        "stockMinimo":  10,
        "productor":  "Botánica Natural",
        "ciudad":  "Medellín",
        "organico":  false,
        "fechaRegistro":  "2026-10-02",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  4,
        "nombre":  "Canasta familiar de verduras agroecológicas",
        "categoria":  "Frutas y verduras",
        "precio":  35000,
        "stock":  0,
        "stockMinimo":  6,
        "productor":  "Huerta Viva",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-11-01",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  5,
        "nombre":  "Bolsa ecológica de compras reutilizable",
        "categoria":  "Hogar sostenible",
        "precio":  15000,
        "stock":  50,
        "stockMinimo":  15,
        "productor":  "EcoTextil Colombia",
        "ciudad":  "Bogotá",
        "organico":  false,
        "fechaRegistro":  "2026-08-14",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  6,
        "nombre":  "Aguacate Hass orgánico x 1 kg",
        "categoria":  "Frutas y verduras",
        "precio":  11000,
        "stock":  35,
        "stockMinimo":  10,
        "productor":  "AgroSostenible del Oriente",
        "ciudad":  "Bucaramanga",
        "organico":  true,
        "fechaRegistro":  "2026-10-28",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  7,
        "nombre":  "Bebida vegetal de avena orgánica 1 L",
        "categoria":  "Despensa",
        "precio":  9500,
        "stock":  42,
        "stockMinimo":  12,
        "productor":  "Trapiche Verde",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-09-11",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  8,
        "nombre":  "Champú sólido de romero y menta 90 g",
        "categoria":  "Cuidado personal",
        "precio":  22000,
        "stock":  16,
        "stockMinimo":  8,
        "productor":  "Raíces Ancestrales",
        "ciudad":  "Medellín",
        "organico":  true,
        "fechaRegistro":  "2026-07-19",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  9,
        "nombre":  "Cepillo dental de bambú biodegradable",
        "categoria":  "Cuidado personal",
        "precio":  8000,
        "stock":  65,
        "stockMinimo":  20,
        "productor":  "Bambú Vital",
        "ciudad":  "Bogotá",
        "organico":  false,
        "fechaRegistro":  "2026-08-30",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  10,
        "nombre":  "Fresas silvestres orgánicas 500 g",
        "categoria":  "Frutas y verduras",
        "precio":  13000,
        "stock":  15,
        "stockMinimo":  5,
        "productor":  "Frutos del Páramo",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-10-31",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  11,
        "nombre":  "Aceite de oliva virgen extra 500 ml",
        "categoria":  "Despensa",
        "precio":  45000,
        "stock":  12,
        "stockMinimo":  6,
        "productor":  "Olivares del Valle",
        "ciudad":  "Cali",
        "organico":  true,
        "fechaRegistro":  "2026-06-25",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  12,
        "nombre":  "Desodorante natural libre de aluminio 60 g",
        "categoria":  "Cuidado personal",
        "precio":  18000,
        "stock":  3,
        "stockMinimo":  8,
        "productor":  "Piel Limpia",
        "ciudad":  "Bucaramanga",
        "organico":  true,
        "fechaRegistro":  "2026-09-04",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  13,
        "nombre":  "Botella térmica de acero inoxidable 750 ml",
        "categoria":  "Hogar sostenible",
        "precio":  38000,
        "stock":  38,
        "stockMinimo":  10,
        "productor":  "EcoTextil Colombia",
        "ciudad":  "Bogotá",
        "organico":  false,
        "fechaRegistro":  "2026-05-18",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  14,
        "nombre":  "Mora de castilla agroecológica 1 kg",
        "categoria":  "Frutas y verduras",
        "precio":  9000,
        "stock":  8,
        "stockMinimo":  8,
        "productor":  "Cultivos La Esperanza",
        "ciudad":  "Floridablanca",
        "organico":  true,
        "fechaRegistro":  "2026-10-29",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  15,
        "nombre":  "Quinua perlada orgánica 500 g",
        "categoria":  "Despensa",
        "precio":  14000,
        "stock":  29,
        "stockMinimo":  10,
        "productor":  "Granos Dorados",
        "ciudad":  "Cali",
        "organico":  true,
        "fechaRegistro":  "2026-08-05",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  16,
        "nombre":  "Crema facial hidratante de aloe vera 50 ml",
        "categoria":  "Cuidado personal",
        "precio":  32000,
        "stock":  11,
        "stockMinimo":  5,
        "productor":  "Sábila \u0026 Vida",
        "ciudad":  "Cali",
        "organico":  true,
        "fechaRegistro":  "2026-09-17",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  17,
        "nombre":  "Tabla de madera artesanal para cocina",
        "categoria":  "Hogar sostenible",
        "precio":  28000,
        "stock":  22,
        "stockMinimo":  8,
        "productor":  "Apiario La Montaña",
        "ciudad":  "Bucaramanga",
        "organico":  false,
        "fechaRegistro":  "2026-04-12",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  18,
        "nombre":  "Mix de lechugas hidropónicas gourmet 300 g",
        "categoria":  "Frutas y verduras",
        "precio":  8500,
        "stock":  0,
        "stockMinimo":  10,
        "productor":  "HidroCultivos del Bosque",
        "ciudad":  "Medellín",
        "organico":  false,
        "fechaRegistro":  "2026-11-02",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  19,
        "nombre":  "Harina de almendras pura 400 g",
        "categoria":  "Despensa",
        "precio":  31000,
        "stock":  14,
        "stockMinimo":  6,
        "productor":  "NutriSemillas",
        "ciudad":  "Bogotá",
        "organico":  true,
        "fechaRegistro":  "2026-07-28",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  20,
        "nombre":  "Protector solar mineral biodegradable FPS 50 100 ml",
        "categoria":  "Cuidado personal",
        "precio":  48000,
        "stock":  9,
        "stockMinimo":  6,
        "productor":  "EcoSun Colombia",
        "ciudad":  "Cúcuta",
        "organico":  true,
        "fechaRegistro":  "2026-10-09",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  21,
        "nombre":  "Limpiador multiusos ecológico en spray 500 ml",
        "categoria":  "Hogar sostenible",
        "precio":  21000,
        "stock":  31,
        "stockMinimo":  10,
        "productor":  "BioLimpio",
        "ciudad":  "Medellín",
        "organico":  false,
        "fechaRegistro":  "2026-06-30",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  22,
        "nombre":  "Tomate chonto agroecológico 1 kg",
        "categoria":  "Frutas y verduras",
        "precio":  6500,
        "stock":  40,
        "stockMinimo":  15,
        "productor":  "Huerta Viva",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-11-03",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  23,
        "nombre":  "Especias y condimentos orgánicos surtidos 150 g",
        "categoria":  "Despensa",
        "precio":  19500,
        "stock":  2,
        "stockMinimo":  8,
        "productor":  "NutriSemillas",
        "ciudad":  "Bogotá",
        "organico":  true,
        "fechaRegistro":  "2026-08-11",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  24,
        "nombre":  "Aceite esencial de eucalipto orgánico 15 ml",
        "categoria":  "Cuidado personal",
        "precio":  25000,
        "stock":  19,
        "stockMinimo":  6,
        "productor":  "Botánica Natural",
        "ciudad":  "Medellín",
        "organico":  true,
        "fechaRegistro":  "2026-09-24",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  25,
        "nombre":  "Olla de cerámica ecológica para cocina",
        "categoria":  "Hogar sostenible",
        "precio":  55000,
        "stock":  15,
        "stockMinimo":  5,
        "productor":  "BioLimpio",
        "ciudad":  "Medellín",
        "organico":  false,
        "fechaRegistro":  "2026-05-03",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  26,
        "nombre":  "Zanahorias baby orgánicas 500 g",
        "categoria":  "Frutas y verduras",
        "precio":  7800,
        "stock":  24,
        "stockMinimo":  10,
        "productor":  "AgroSostenible del Oriente",
        "ciudad":  "Bucaramanga",
        "organico":  true,
        "fechaRegistro":  "2026-10-25",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  27,
        "nombre":  "Cacao ceremonial orgánico al 100% 250 g",
        "categoria":  "Despensa",
        "precio":  36000,
        "stock":  17,
        "stockMinimo":  5,
        "productor":  "Cacao de la Montaña",
        "ciudad":  "Girón",
        "organico":  true,
        "fechaRegistro":  "2026-08-19",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  28,
        "nombre":  "Bálsamo labial de manteca de cacao y karité",
        "categoria":  "Cuidado personal",
        "precio":  9000,
        "stock":  45,
        "stockMinimo":  15,
        "productor":  "Raíces Ancestrales",
        "ciudad":  "Medellín",
        "organico":  true,
        "fechaRegistro":  "2026-07-08",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  29,
        "nombre":  "Vela de cera de soya aromatizada con lavanda",
        "categoria":  "Hogar sostenible",
        "precio":  26000,
        "stock":  13,
        "stockMinimo":  7,
        "productor":  "Luz Natural",
        "ciudad":  "Medellín",
        "organico":  false,
        "fechaRegistro":  "2026-04-22",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  30,
        "nombre":  "Plátano hartón agroecológico x racimo 3 kg",
        "categoria":  "Frutas y verduras",
        "precio":  12500,
        "stock":  0,
        "stockMinimo":  6,
        "productor":  "Cultivos La Esperanza",
        "ciudad":  "Floridablanca",
        "organico":  true,
        "fechaRegistro":  "2026-10-27",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  31,
        "nombre":  "Té verde orgánico en hebras 100 g",
        "categoria":  "Despensa",
        "precio":  17000,
        "stock":  21,
        "stockMinimo":  8,
        "productor":  "Hojas del Valle",
        "ciudad":  "Cali",
        "organico":  true,
        "fechaRegistro":  "2026-09-02",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  32,
        "nombre":  "Aceite de coco virgen prensado en frío 250 ml",
        "categoria":  "Cuidado personal",
        "precio":  22000,
        "stock":  27,
        "stockMinimo":  10,
        "productor":  "Piel Limpia",
        "ciudad":  "Bucaramanga",
        "organico":  true,
        "fechaRegistro":  "2026-09-14",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  33,
        "nombre":  "Planta de aloe vera en maceta de cerámica",
        "categoria":  "Hogar sostenible",
        "precio":  28000,
        "stock":  12,
        "stockMinimo":  4,
        "productor":  "Ciclo Verde",
        "ciudad":  "Bogotá",
        "organico":  false,
        "fechaRegistro":  "2026-06-12",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  34,
        "nombre":  "Espinaca criolla fresca y limpia 400 g",
        "categoria":  "Frutas y verduras",
        "precio":  5200,
        "stock":  20,
        "stockMinimo":  8,
        "productor":  "Huerta Viva",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-10-22",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    },
    {
        "id":  35,
        "nombre":  "Semillas de chía orgánica 300 g",
        "categoria":  "Despensa",
        "precio":  16000,
        "stock":  15,
        "stockMinimo":  5,
        "productor":  "Trapiche Verde",
        "ciudad":  "Tunja",
        "organico":  true,
        "fechaRegistro":  "2026-09-29",
        "activo":  true,
        "imagen":  "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format\u0026fit=crop\u0026w=600\u0026q=80"
    }
];
}

window.abrirModal = abrirModal;
window.solicitarEliminacion = solicitarEliminacion;

document.addEventListener("DOMContentLoaded", () => {
  configurarSelectorDeVistas();
  configurarMenuHamburguesa();
  registrarEventListeners();
  cargarProductos();
});