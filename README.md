# 🌿 EcoMarket: Plataforma Web para Comercio Sostenible
### Actividad Integradora: HTML • CSS • JavaScript • Prompt Engineering • JSON • DOM • localStorage • Chart.js
**Programa de Formación:** Análisis y Desarrollo de Software (ADSO)  
**Institución / Centro:** SENA / Campus  
**Fecha:** 2026-11-08  

---

## 📁 1. Estructura Oficial del Proyecto

```text
ecomarket-proyecto/
├── 📄 index.html          # HTML principal: Landing page y contenedor del dashboard
├── 🎨 styles.css          # Estilos CSS externos (diseño responsive, UI, tarjetas, modal)
├── 📜 app.js              # Lógica principal (carga de datos, renderizado DOM, CRUD, filtros, KPIs y localStorage)
├── 📜 validacion.js       # Función validarProductos() y lógica de validación de datos
├── 📊 productos.json      # Dataset inicial con 35 registros (5 manuales + 30 generados con IA)
├── 📝 README.md           # Documento con los prompts utilizados, técnicas de Prompt Engineering y explicaciones
└── 📁 capturas/           # Evidencia visual requerida
    ├── landing-page.png   # Captura de la landing page
    ├── dashboard.png      # Captura del dashboard administrativo
    ├── filtros.png        # Captura del funcionamiento de búsqueda/filtros
    ├── modal-crud.png     # Captura del modal para crear/editar productos
    └── grafico.png        # Captura del gráfico estadístico (Chart.js)
```

---

## 🚀 2. Caso de Negocio y Alcance del MVP

**EcoMarket** es una startup colombiana creada para conectar a pequeños productores locales campesinos y emprendedores ecológicos (de Boyacá, Santander, Cundinamarca, Antioquia y Valle del Cauca) con consumidores responsables interesados en alimentación sana y artículos sostenibles.

### Funcionalidades del Prototipo:
1. **Landing Page Pública (`index.html`):**
   - Propuesta de valor, métricas de impacto (+150 familias, 100% orgánico, 0% intermediarios abusivos).
   - 4 categorías temáticas: *Frutas y verduras*, *Despensa*, *Cuidado personal* y *Hogar sostenible*.
   - Productos destacados con precios en COP, origen municipal y badges de stock.
   - Bloque de impacto local (*"Compra local, genera impacto"*).
   - Testimonios reales de campesinos y artesanos aliados.
   - Formulario de suscripción comunitaria con validación accesible.
2. **Dashboard Administrativo de Inventario (`index.html` / vista `#dashboard`):**
   - Sidebar interactivo con navegación a KPIs, catálogo, gráfico y enlace a la tienda.
   - Menú móvil hamburguesa accesible con transición de 0.3s y alternancia de íconos `☰` / `✕`.
   - 3 tarjetas KPI calculadas en tiempo real:
     * *Productos registrados:* Total de referencias activas en catálogo.
     * *Inventario bajo:* Cantidad de productos con existencia menor o igual al stock mínimo.
     * *Valor del inventario:* Sumatoria de `precio * stock`, expresada en pesos colombianos (`$ COP`).
   - Motor de búsqueda en tiempo real por nombre de producto o productor aliado.
   - Filtros combinados simultáneos por categoría, ciudad y estado de inventario (*Disponible*, *Stock bajo*, *Agotado*).
   - Selector de vista: **Vista Cuadrícula (Cards)** o **Vista Tabla** con 7 columnas, filas alternadas (*zebra striping*) y badges de estado.
   - Operaciones CRUD completas con modales accesibles (Crear, Editar y Eliminar con confirmación).
   - Persistencia reactiva en `localStorage`.
   - Gráfico de barras por categoría con Chart.js sincronizado reactivamente.

---

## 🧠 3. Técnicas de Prompt Engineering y Registro de Prompts

### 3.1. Fase 1: Priming Inicial y Meta-Prompting

#### Técnica: Priming (Contextualización del Rol)
Establece la identidad, experiencia y contexto del modelo antes de solicitar código para evitar suposiciones no alineadas al contexto de negocio:

```text
Actúa como un desarrollador frontend senior especializado en comercio electrónico, marketplaces y diseño UX/UI. Vas a participar en el desarrollo de EcoMarket, una startup colombiana que conecta productores locales de alimentos orgánicos y productos sostenibles con consumidores.
Tu responsabilidad es ayudarme a diseñar y construir una landing page accesible, responsive y visualmente coherente. Antes de comenzar, confirma que comprendes tu rol y el contexto. Luego pregúntame qué información adicional necesitas para realizar el trabajo de la mejor manera posible.
No generes código todavía.
```

#### Técnica: Meta-Prompting (Auditoría de Requerimientos)
Orienta a la IA a reflexionar sobre sus propios vacíos de información técnica y de negocio:

```text
Antes de continuar, evalúa qué información te hace falta para realizar correctamente este proyecto. Formula preguntas concretas sobre público objetivo, propuesta de valor, contenido, identidad visual, funcionalidades y restricciones técnicas. No supongas información que no haya sido definida.
```

---

### 3.2. Fase 1: Chain of Thought para Diseño UX/UI

#### Técnica: Chain of Thought (Cadena de Razonamiento)
Descompone el diseño en 6 dimensiones consecutivas previas a la generación de código:

```text
Actúa como diseñador UX/UI. Analiza el contexto de EcoMarket y presenta una propuesta de diseño para su landing page.
Organiza tu respuesta en estos puntos:
1. ¿Qué secciones debe tener la página y cuál es el objetivo de cada una?
2. ¿Qué jerarquía visual y orden de lectura propones?
3. ¿Qué paleta de colores comunica sostenibilidad, confianza y comercio local?
4. ¿Qué tipografías y tamaños recomiendas?
5. ¿Qué componentes visuales se requieren?
6. ¿Qué recursos de accesibilidad y diseño responsive deben considerarse?
Explica brevemente las decisiones de diseño. No generes código.
```

**Decisiones de Diseño adoptadas:**
- **Paleta Sostenible:** Verde bosque (`#2e7d32` / `#1b5e20`), tonos tierra cacao (`#795548`), naranja cálido (`#f57c00`) y neutro orgánico (`#f7f9f6`).
- **Tipografía:** `Outfit` (Google Fonts) por su geometría circular moderna y alta legibilidad en interfaces e-commerce.
- **Jerarquía:** Patrón en Z en el Hero y patrón en F en la grilla de productos destacados.
- **Accesibilidad:** Contraste WCAG AA/AAA, estados `:focus-visible`, textos alternativos en imágenes y atributos semánticos ARIA.

---

### 3.3. Fase 2: Role Prompting para el Dashboard

#### Técnica: Role Prompting (Diseñador UX/UI de Dashboards E-commerce)
Define la arquitectura de información del panel de control de inventario:

```text
Eres un diseñador UX/UI con experiencia en dashboards administrativos de comercio electrónico. Diseña la estructura visual de un panel de administración para EcoMarket.
El dashboard debe incluir:
- Sidebar a la izquierda con logotipo y navegación.
- Área principal con título, bienvenida y acciones rápidas.
- Diseño responsive: en pantallas pequeñas el menú debe convertirse en menú hamburguesa.
- Estilo coherente con la landing page de EcoMarket.
Primero describe la distribución, jerarquía, colores, tipografía e iconografía. No generes código todavía.
```

---

### 3.4. Fase 3: Few-Shot Prompting para el Dataset de Productos

#### Técnica: Few-Shot Prompting (Aprendizaje con Ejemplos Múltiples)
Se proporcionan 5 objetos manuales reales (IDs 1 al 5) para que el modelo replique con exactitud los tipos primitivos (booleanos y enteros reales), formatos de fecha y restricciones geográficas:

```text
Actúa como especialista en generación de datos de prueba. Genera 30 objetos adicionales para el catálogo de EcoMarket, respetando exactamente la estructura de los cinco ejemplos que te proporcionaré.
Reglas:
1. Los IDs deben ser únicos y consecutivos del 6 al 35.
2. Los nombres deben ser variados y corresponder a productos comercializables.
3. La categoría debe pertenecer exclusivamente a la lista válida (Frutas y verduras, Despensa, Cuidado personal, Hogar sostenible).
4. El precio debe ser un número entero positivo en pesos colombianos (COP).
5. El stock y stockMinimo deben ser enteros mayores o iguales a cero.
6. Las ciudades deben pertenecer a la lista permitida (Bucaramanga, Floridablanca, Girón, Bogotá, Medellín, Cali, Tunja, Cúcuta).
7. Los campos organico y activo deben ser booleanos reales, no textos.
8. Las fechas deben estar entre 2026-01-01 y 2026-11-03.
9. Distribuye los productos entre las categorías y ciudades de forma realista.
10. Si stock es cero, el producto puede estar agotado; no inventes un campo estado, pues se calculará en la aplicación.
Devuelve únicamente un arreglo JSON válido, sin explicaciones ni bloques Markdown.
[EJEMPLOS MANUALES ID 1 AL 5 PROPORCIONADOS]
```

---

## 🔍 4. Validación Programática y Auditoría de Datos (Fase 4)

La función `validarProductos(lista)` en [`validacion.js`](file:///c:/Users/david/Downloads/taller%20campus/ecomarket-proyecto/validacion.js) audita 11 reglas de integridad:
1. `id`: Entero, mayor que 0, único y sin duplicados.
2. `nombre`: Texto obligatorio entre 3 y 80 caracteres.
3. `categoria`: Debe existir en la lista oficial de 4 categorías.
4. `precio`: Entero positivo en COP mayor a 0.
5. `stock`: Entero mayor o igual a 0.
6. `stockMinimo`: Entero mayor o igual a 0.
7. `productor`: Texto obligatorio entre 3 y 80 caracteres.
8. `ciudad`: Debe pertenecer a las 8 ciudades colombianas autorizadas.
9. `organico`: Tipo booleano estricto (`true` o `false`).
10. `activo`: Tipo booleano estricto (`true` o `false`).
11. `fechaRegistro`: Formato `YYYY-MM-DD` y rango entre `2026-01-01` y `2026-11-03`.

### Tabla de Auditoría: Hallazgos Previos y Correcciones Aplicadas

| Error Encontrado | Registro(s) Afectado(s) | Causa Probable | Corrección Aplicada |
| :--- | :--- | :--- | :--- |
| **ID Duplicado** | ID 1 (Café) | Concatenación manual de lotes generados con IA | Se reasignó secuencia autoincremental única del 1 al 35 |
| **Precio como String** | ID 3 (`"14000"`) | Formateo entrecomillado erróneo por inferencia de texto | Se parseó a número entero `14000` con `parseInt(valor, 10)` |
| **Precio con Decimales** | ID 2 (`32000.50`) | Inferencia de divisas extranjeras con centavos | Se normalizó a entero COP (`32000`) |
| **Stock Negativo** | ID 3 (`stock: -4`) | Falta de restricción lógica en el generador matemático | Se aplicó cota mínima `>= 0` |
| **Categoría Invalida** | ID 3 (`"Cosméticos"`) | Uso de sinónimos semánticos por la IA | Se homologó a `"Cuidado personal"` |
| **Ciudad No Permitida** | ID 3 (`"Cartagena"`) | Alucinación geográfica fuera de las 8 ciudades | Se asignó `"Girón"` (Santander) |
| **Booleano como String o Número** | ID 2 (`"true"`) e ID 3 (`activo: 1`)| Confusión de tipos de datos en la salida del LLM | Se convirtieron a booleanos puros `true` / `false` |
| **Fecha Fuera de Rango** | ID 3 (2025) e ID 4 (diciembre 2026) | Falta de filtro temporal estricto en el prompt | Se ajustaron al intervalo permitido de 2026 |

**Resultado:** Tras la corrección, [`productos.json`](file:///c:/Users/david/Downloads/taller%20campus/ecomarket-proyecto/productos.json) superó la suite con **0 errores en los 35 productos**.

---

## 💡 5. Respuestas a las Preguntas de Reflexión (ADSO)

### 1. ¿Qué diferencias encontraste entre utilizar zero-shot, one-shot y few-shot prompting?
- **Zero-shot prompting:** Consiste en solicitar una tarea directamente al modelo de lenguaje sin proporcionarle ejemplos previos (por ejemplo, solicitar la estructura del `index.html`). Es altamente eficiente para tareas estandarizadas o convencionales de maquetación, pero suele generar variaciones en nombres de clases, propiedades o estructuras complejas.
- **One-shot prompting:** Se le entrega un único ejemplo de referencia antes de solicitar el resultado. Ayuda a definir el tono y la estructura básica, pero el modelo puede sobreajustar sus respuestas imitando en exceso los valores de ese único caso.
- **Few-shot prompting:** Se suministra un conjunto de 3 a 5 ejemplos consistentes y exhaustivos (como los 5 productos manuales ID 1 al 5). Es la técnica superior para la generación de datasets y estructuras JSON complejas, ya que el modelo asimila con exactitud los tipos de datos (evitando entrecomillar booleanos o números), el formato de fechas, el rango de precios en moneda local y las convenciones de nomenclatura, reduciendo drásticamente las alucinaciones.

### 2. ¿Por qué es importante definir la estructura y las reglas del dataset antes de generarlo con IA?
Definir un diccionario de datos formal antes de interactuar con la IA es el equivalente a diseñar el esquema de una base de datos relacional (DDL) en ingeniería de software. Si no se especifican reglas cuantitativas (longitud mínima/máxima de cadenas, si los precios son enteros, formato ISO de fechas, listas cerradas de categorías y municipios autorizados):
1. La IA tiende a inventar categorías afines pero inexistentes en el modelo de negocio (ej. usar `"Cosméticos"` en lugar de `"Cuidado personal"`).
2. Genera tipos de datos inconsistentes (números como texto, booleanos como cadenas `"true"` o `"si"`).
3. Provoca errores en tiempo de ejecución en el frontend al intentar aplicar métodos como `.toLowerCase()`, operaciones matemáticas de sumatoria en KPIs (`precio * stock`), o formateadores de fecha.  
La definición previa de reglas actúa como el contrato de interfaz indispensable para la interoperabilidad del sistema.

### 3. ¿Qué errores detectó la validación programática que no habías identificado manualmente?
Durante la inspección visual manual de grandes arreglos JSON, el cerebro humano tiende a pasar por alto detalles sutiles pero críticos para el código:
- Fechas que parecían válidas a simple vista pero caían fuera de la ventana de tiempo del año fiscal o proyecto (por ejemplo, una fecha de diciembre de 2026 cuando el tope era el 3 de noviembre).
- Claves numéricas formateadas como strings (`"28000"` en vez de `28000`), lo cual en JavaScript produce concatenaciones erróneas al sumar valores en lugar de realizar una suma aritmética (`"28000" + "14000" = "2800014000"`).
- IDs duplicados cuando se combinan múltiples tandas de generación de datos con IA.
- Valores flotantes o con centavos en precios colombianos (`32000.50`), los cuales no tienen curso legal en efectivo en Colombia.  
La función `validarProductos()` automatiza la detección de estos casos borde de manera determinista e infalible.

### 4. ¿Qué ventajas ofrece separar los datos, la lógica JavaScript y la presentación HTML/CSS?
Esta separación materializa el principio arquitectónico de **Separación de Responsabilidades (SoC - Separation of Concerns)**:
1. **Mantenibilidad:** Se puede rediseñar por completo la interfaz visual en `styles.css` o modificar la disposición en `index.html` sin alterar una sola línea de la lógica de negocio en `app.js` ni comprometer los datos de `productos.json`.
2. **Reutilización:** La misma función de validación (`validacion.js`) o el mismo dataset (`productos.json`) pueden consumirse desde una aplicación web móvil, una API REST futura o un entorno de pruebas unitarias sin depender del navegador.
3. **Escalabilidad y Trabajo en Equipo:** En entornos reales de desarrollo (como células de trabajo Scrum), los diseñadores UI/UX pueden maquetar y estilizar mientras los desarrolladores frontend programan la reactividad del DOM y los ingenieros backend refinan los servicios de datos sin generar conflictos de fusión (*merge conflicts*) en Git.

### 5. ¿Qué limitaciones tiene `localStorage` frente a una base de datos real?
Aunque `localStorage` es ideal para prototipado rápido y persistencia del lado del cliente en MVPs, presenta limitaciones estructurales para producción:
- **Almacenamiento síncrono y bloqueante:** Todas las operaciones de lectura/escritura en `localStorage` se ejecutan en el hilo principal (*main thread*) de JavaScript. Si el dataset creciera a miles de registros, congelaría la interfaz visual.
- **Límite de capacidad:** Está restringido típicamente a 5 MB por origen/dominio, insuficiente para catálogos masivos o almacenamiento multimedia.
- **Inseguridad y falta de privacidad:** Los datos se almacenan en texto plano y son accesibles mediante cualquier script inyectado en el cliente (vulnerable a ataques XSS). No soporta autenticación, cifrado nativo ni roles de usuario.
- **Aislamiento por cliente/navegador:** Los cambios que realiza un administrador en su equipo no se replican a otros usuarios ni a un servidor central; no existe concurrencia ni transaccionalidad ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad).
- **Sin lenguaje de consulta estructurado:** No permite realizar consultas indexadas eficientes (como SQL o agregaciones NoSQL), obligando a traer todo el arreglo a memoria y filtrarlo con bucles en JavaScript.

### 6. ¿Qué cambios realizarías para convertir el prototipo en una aplicación lista para producción?
Para evolucionar este MVP a una solución empresarial robusta en el ecosistema productivo colombiano, implementaría:
1. **Arquitectura Backend y API REST / GraphQL:** Desarrollar un backend con Node.js (Express/NestJS) o Python (FastAPI) conectado a una base de datos relacional robusta (PostgreSQL) para gestionar transacciones atómicas de compra y control de inventario concurrente.
2. **Autenticación y Control de Acceso Basado en Roles (RBAC):** Implementar JWT (JSON Web Tokens) o OAuth2 con roles diferenciados: Administrador general, Productor campesino (que solo gestiona sus propios productos) y Consumidor final.
3. **Optimización Multimedia en la Nube:** Almacenamiento de fotografías reales de los productos en servicios tipo AWS S3 o Cloudinary, con optimización automática de formatos WebP/AVIF y compresión adaptativa.
4. **Pasarela de Pagos Local:** Integración con plataformas de pago colombianas como Wompi, ePayco o PSE para liquidación instantánea en moneda nacional.
5. **Pruebas Automatizadas y CI/CD:** Implementar suites de pruebas unitarias y de integración (Jest / Vitest / Playwright) y un pipeline de integración continua con GitHub Actions desplegando en plataformas como Vercel o Railway.
6. **Internacionalización y PWA (Progressive Web App):** Habilitar capacidades offline con Service Workers para que los campesinos en zonas rurales con conectividad intermitente puedan registrar sus cosechas y sincronizarlas automáticamente al recuperar señal.

---

## 🛠️ 6. Cómo Ejecutar y Probar el Proyecto

1. **Abrir en Visual Studio Code:**
   - Abre la carpeta `ecomarket-proyecto/`.
   - Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"** (o ábrelo directamente en Chrome, Edge o Firefox).
2. **Alternar Vistas:**
   - En la parte superior encontrarás el selector: **🌱 Tienda (Landing Page)** y **📊 Panel Administrativo (Dashboard)**.
   - También puedes entrar directamente al panel mediante la URL: `index.html#dashboard`.
3. **Probar el CRUD:**
   - Haz clic en **"➕ Agregar producto"** para crear una nueva referencia.
   - Modifica cualquier producto existente con el botón **"✏️ Editar"**.
   - Prueba eliminar referencias con confirmación mediante **"🗑️ Eliminar"**.
   - Observa cómo los 3 KPIs numéricos y el gráfico de Chart.js se recalculan automáticamente en tiempo real.
4. **Probar Búsqueda y Filtros Combinados:**
   - Escribe en el buscador (ej. *"Café"* o *"Apiario"*).
   - Combina con los filtros de ciudad, categoría y estado de inventario.
   - Haz clic en **"🧹 Limpiar filtros"** para volver a mostrar las 35 referencias.

---
