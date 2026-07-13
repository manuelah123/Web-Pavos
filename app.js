const STORAGE_KEY = "granja-pavos-v1";

const schemas = {
  inseminacion: [
    ["fecha", "Fecha"],
    ["lote", "Lote"],
    ["horaInicio", "Inicio"],
    ["horaFinal", "Final"],
    ["semenGastado", "Semen gastado"],
    ["pavasCerradas", "Cerradas"],
    ["pavasMasa", "Con masa"],
    ["pavasViruela", "Viruela"],
    ["enfermeria", "Enfermeria"],
    ["recuperadas", "Recuperadas"],
    ["empajillo", "Empajillo"],
    ["colecto", "Colecto"],
    ["chupo", "Chupo"],
    ["abrio", "Abrio"],
    ["paso", "Paso"],
    ["observaciones", "Observaciones"]
  ],
  huevos: [
    ["fecha", "Fecha"],
    ["lote", "Lote"],
    ["edad", "Edad"],
    ["galpon", "Galpon"],
    ["totalFertil", "Total fertil"],
    ["totalComercial", "Total comercial"],
    ["totalProduccionDia", "Total dia"],
    ["fertilPequeno", "Fertil pequeno"],
    ["fertilMediano", "Fertil mediano"],
    ["fertilGrande", "Fertil grande"],
    ["comercialRoto", "Roto"],
    ["comercialSucio", "Sucio"],
    ["dobleYema", "Doble yema"],
    ["blanco", "Blanco"],
    ["comercialPequeno", "Comercial pequeno"],
    ["otrosCascaras", "Otros/cascaras"],
    ["enfermeria", "Enfermeria"],
    ["mortalidad", "Mortalidad"],
    ["recuperadasMananaA", "Recuperadas A"],
    ["recuperadasMananaB", "Recuperadas B"],
    ["pintadasMananaA", "Pintadas A"],
    ["pintadasMananaB", "Pintadas B"],
    ["castigadasTardeA", "Castigadas A"],
    ["castigadasTardeB", "Castigadas B"],
    ["saldoHembras", "Saldo hembras"],
    ["saldoMachos", "Saldo machos"],
    ["bultos", "Bultos"],
    ["agua", "Agua"],
    ["observaciones", "Observaciones"]
  ],
  colecta: [
    ["fecha", "Fecha"],
    ["sala", "Sala"],
    ["lote", "Lote"],
    ["concentracion", "Concentracion"],
    ["semenExtraido", "Semen extraido"],
    ["machosTrabajados", "Machos trabajados"],
    ["machosDieron", "Dieron"],
    ["machosNoDieron", "No dieron"],
    ["malaCalidad", "Mala calidad"],
    ["colector", "Colector"],
    ["observaciones", "Observaciones"]
  ],
  productos: [
    ["producto", "Producto"],
    ["unidad", "Unidad"],
    ["cantidad", "Cantidad actual"],
    ["minimo", "Minimo alerta"]
  ],
  salidas: [
    ["fecha", "Fecha"],
    ["numeroSalida", "Numero salida"],
    ["centroTrabajo", "Centro"],
    ["responsable", "Responsable"],
    ["productoNombre", "Producto"],
    ["saldoAnterior", "Saldo anterior"],
    ["entradas", "Entradas"],
    ["consumo", "Consumo"],
    ["salidaActividad", "Salida actividad"],
    ["traslado", "Traslado"],
    ["saldoFinal", "Saldo final"],
    ["lote", "Lote"],
    ["nivelNitrogeno", "Temp/nitrogeno"],
    ["fechaVencimiento", "Vencimiento"],
    ["stockPermitido", "Stock permitido"],
    ["firmaColaborador", "Firma"],
    ["observaciones", "Observaciones"]
  ]
};

const viewTitles = {
  dashboard: "Resumen general",
  inseminacion: "Modulo de inseminada",
  huevos: "Modulo diario de huevos",
  colecta: "Modulo de colecta",
  inventario: "Modulo de inventario"
};

const defaultState = {
  inseminacion: [],
  huevos: [],
  colecta: [],
  productos: [],
  salidas: []
};

let state = loadState();
let activeView = "dashboard";
let searchText = "";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active-view", section.id === view);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelector("#viewTitle").textContent = viewTitles[view];
}

function formToObject(form) {
  const data = new FormData(form);
  const record = { id: uid(), createdAt: new Date().toISOString() };
  for (const [key, value] of data.entries()) {
    record[key] = value.trim();
  }
  return record;
}

function setTodayDefaults() {
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    if (!input.value) input.valueAsDate = new Date();
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formName = form.dataset.form;
  const record = formToObject(form);

  if (formName === "huevos") {
    completeEggTotals(record);
  }

  if (formName === "salidas") {
    const product = state.productos.find((item) => item.id === record.productoId);
    if (!product) {
      showToast("Primero registra un producto.");
      return;
    }
    const hasMovement = num(record.entradas) + num(record.consumo) + num(record.salidaActividad) + num(record.traslado) + num(record.cantidad) > 0;
    if (!hasMovement) {
      showToast("Escribe al menos una entrada, consumo, salida o traslado.");
      return;
    }
    const balance = calculateMovementBalance(product, record);
    if (balance.final < 0) {
      showToast("La salida supera la cantidad disponible.");
      return;
    }
    record.saldoAnterior = String(balance.previous);
    record.saldoFinal = String(balance.final);
    record.productoNombre = product.producto;
    record.unidadMovimiento = record.unidadMovimiento || product.unidad || "";
    product.cantidad = String(balance.final);
  }

  state[formName].unshift(record);
  saveState();
  form.reset();
  setTodayDefaults();
  renderAll();
  showToast("Registro guardado.");
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function num(value) {
  return Number(value || 0);
}

function completeEggTotals(record) {
  const fertileTotal = num(record.fertilPequeno) + num(record.fertilMediano) + num(record.fertilGrande);
  const commercialTotal = num(record.comercialRoto) + num(record.comercialSucio) + num(record.dobleYema) + num(record.blanco) + num(record.comercialPequeno) + num(record.otrosCascaras);
  if (!record.totalFertil) record.totalFertil = String(fertileTotal);
  if (!record.totalComercial) record.totalComercial = String(commercialTotal);
  if (!record.totalProduccionDia) record.totalProduccionDia = String(num(record.totalFertil) + num(record.totalComercial));
}

function calculateMovementBalance(product, record) {
  const previous = round(num(product.cantidad));
  const incoming = num(record.entradas);
  const outgoing = num(record.consumo) + num(record.salidaActividad) + num(record.traslado) + num(record.cantidad);
  return {
    previous,
    final: round(previous + incoming - outgoing)
  };
}

function reverseMovement(record) {
  const product = state.productos.find((item) => item.id === record.productoId);
  if (!product) return;
  const incoming = num(record.entradas);
  const outgoing = num(record.consumo) + num(record.salidaActividad) + num(record.traslado) + num(record.cantidad);
  product.cantidad = String(round(num(product.cantidad) - incoming + outgoing));
}

function recordMatches(record) {
  if (!searchText) return true;
  return JSON.stringify(record).toLowerCase().includes(searchText);
}

function renderTable(name) {
  const table = document.querySelector(`#table-${name}`);
  const rows = state[name].filter(recordMatches);
  const headers = schemas[name];

  if (!rows.length) {
    table.innerHTML = `<tbody><tr><td>No hay registros para mostrar.</td></tr></tbody>`;
    return;
  }

  table.innerHTML = `
    <thead>
      <tr>
        ${headers.map(([, label]) => `<th>${label}</th>`).join("")}
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map((record) => renderRow(name, record, headers)).join("")}
    </tbody>
  `;
}

function renderRow(name, record, headers) {
  return `
    <tr>
      ${headers.map(([key]) => `<td>${formatCell(name, key, record[key], record)}</td>`).join("")}
      <td>
        <div class="row-actions">
          <button class="secondary-button" data-edit="${name}" data-id="${record.id}" type="button">Editar</button>
          <button class="secondary-button danger" data-delete="${name}" data-id="${record.id}" type="button">Eliminar</button>
        </div>
      </td>
    </tr>
  `;
}

function formatCell(name, key, value, record) {
  const safe = escapeHtml(value || "");
  if (name === "productos" && key === "cantidad") {
    const amount = Number(record.cantidad || 0);
    const minimum = Number(record.minimo || 0);
    const low = minimum > 0 && amount <= minimum;
    return `<span class="pill ${low ? "low-stock" : ""}">${safe}</span>`;
  }
  if (name === "salidas" && key === "entradas" && num(value) > 0) {
    return `<span class="pill movement-in">${safe}</span>`;
  }
  if (name === "salidas" && ["consumo", "salidaActividad", "traslado"].includes(key) && num(value) > 0) {
    return `<span class="pill movement-out">${safe}</span>`;
  }
  return safe;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function deleteRecord(name, id) {
  const record = state[name].find((item) => item.id === id);
  if (name === "salidas" && record) reverseMovement(record);
  state[name] = state[name].filter((record) => record.id !== id);
  saveState();
  renderAll();
  showToast("Registro eliminado.");
}

function editRecord(name, id) {
  const record = state[name].find((item) => item.id === id);
  const form = document.querySelector(`[data-form="${name}"]`);
  if (!record || !form) return;

  if (name === "salidas") reverseMovement(record);

  Object.entries(record).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
  state[name] = state[name].filter((item) => item.id !== id);
  saveState();
  renderAll();
  showToast("Registro cargado para editar. Guarda para actualizarlo.");
}

function renderProductOptions() {
  const select = document.querySelector('select[name="productoId"]');
  select.innerHTML = state.productos.length
    ? state.productos.map((item) => `<option value="${item.id}">${escapeHtml(item.producto)} (${escapeHtml(item.cantidad)} ${escapeHtml(item.unidad || "")})</option>`).join("")
    : `<option value="">Sin productos registrados</option>`;
  syncMovementUnit();
}

function syncMovementUnit() {
  const select = document.querySelector('select[name="productoId"]');
  const unitField = document.querySelector('input[name="unidadMovimiento"]');
  if (!select || !unitField || unitField.value) return;
  const product = state.productos.find((item) => item.id === select.value);
  if (product) unitField.value = product.unidad || "";
}

function renderDashboard() {
  document.querySelector("#metricInseminacion").textContent = state.inseminacion.length;
  document.querySelector("#metricHuevos").textContent = state.huevos.length;
  document.querySelector("#metricColecta").textContent = state.colecta.length;
  document.querySelector("#metricInventario").textContent = state.productos.length;

  const recent = [
    ...state.inseminacion.map((item) => ({ type: "Inseminada", title: item.lote, date: item.fecha, detail: item.observaciones })),
    ...state.huevos.map((item) => ({ type: "Huevos", title: item.lote, date: item.fecha, detail: `${item.totalFertil || item.huevoFertil || 0} fertiles` })),
    ...state.colecta.map((item) => ({ type: "Colecta", title: item.sala, date: item.fecha, detail: `${item.semenExtraido || 0} semen extraido` })),
    ...state.salidas.map((item) => ({ type: "Salida", title: item.productoNombre, date: item.fecha, detail: `Salida ${item.numeroSalida}` }))
  ].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 6);

  const recentNode = document.querySelector("#recentActivity");
  recentNode.classList.toggle("empty", recent.length === 0);
  recentNode.innerHTML = recent.length
    ? recent.map((item) => `<div class="activity-item"><strong>${escapeHtml(item.type)}: ${escapeHtml(item.title || "Sin dato")}</strong><span>${escapeHtml(item.date || "")} ${escapeHtml(item.detail || "")}</span></div>`).join("")
    : "No hay registros todavia.";

  const lowStock = state.productos.filter((item) => Number(item.minimo || 0) > 0 && Number(item.cantidad || 0) <= Number(item.minimo || 0));
  const stockNode = document.querySelector("#stockAlerts");
  stockNode.classList.toggle("empty", lowStock.length === 0);
  stockNode.innerHTML = lowStock.length
    ? lowStock.map((item) => `<div class="activity-item"><strong>${escapeHtml(item.producto)}</strong><span>${escapeHtml(item.cantidad)} ${escapeHtml(item.unidad || "")} disponibles. Minimo: ${escapeHtml(item.minimo)}</span></div>`).join("")
    : "Sin productos bajos.";
}

function renderAll() {
  renderProductOptions();
  Object.keys(schemas).forEach(renderTable);
  renderDashboard();
}

function toCsv(name) {
  const headers = schemas[name];
  const csvRows = [
    headers.map(([, label]) => label),
    ...state[name].map((record) => headers.map(([key]) => record[key] || ""))
  ];
  return csvRows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function csvEscape(value) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportBackup() {
  const stamp = new Date().toISOString().slice(0, 10);
  downloadFile(`respaldo-granja-pavos-${stamp}.json`, JSON.stringify(state, null, 2), "application/json");
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      state = { ...defaultState, ...incoming };
      saveState();
      renderAll();
      showToast("Respaldo importado.");
    } catch {
      showToast("No se pudo importar el archivo.");
    }
  };
  reader.readAsText(file);
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll(".data-form").forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});

document.body.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete]");
  const editButton = event.target.closest("[data-edit]");
  const downloadButton = event.target.closest("[data-download]");

  if (deleteButton) deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
  if (editButton) editRecord(editButton.dataset.edit, editButton.dataset.id);
  if (downloadButton) {
    const name = downloadButton.dataset.download;
    downloadFile(`${name}.csv`, toCsv(name), "text/csv;charset=utf-8");
  }
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  searchText = event.target.value.trim().toLowerCase();
  renderAll();
});

document.querySelector("#clearSearch").addEventListener("click", () => {
  document.querySelector("#globalSearch").value = "";
  searchText = "";
  renderAll();
});

document.querySelector('select[name="productoId"]').addEventListener("change", () => {
  const unitField = document.querySelector('input[name="unidadMovimiento"]');
  if (unitField) unitField.value = "";
  syncMovementUnit();
});

document.querySelector("#exportData").addEventListener("click", exportBackup);
document.querySelector("#importData").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importBackup(file);
  event.target.value = "";
});

setTodayDefaults();
renderAll();
