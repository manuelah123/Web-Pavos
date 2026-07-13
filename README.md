# Turkey Farm Management System

![Status](https://img.shields.io/badge/status-incomplete%20prototype-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/tech-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)

Local web application for managing operational records in a turkey farm, including artificial insemination, semen collection, egg production and inventory movements.

> **Project status:** incomplete prototype / work in progress.  
> This repository contains an early version of the system. It is useful as a base prototype, but it still needs a real database, authentication, stronger validations, reports and production-ready improvements.

## Languages

- [English](#english)
- [Español](#español)

---

## English

### Overview

This project is a static web page designed to help digitize daily records in a turkey farm. The main goal is to replace or complement paper forms used for inventory, egg production, artificial insemination and male semen collection.

The current version stores data locally in the browser using `localStorage`, so it can work without a backend during the prototype stage.

### Main Modules

- **Dashboard:** shows general counters and recent activity.
- **Artificial Insemination:** records date, lot, start/end time, semen used, bird conditions, responsible staff and observations.
- **Egg Production:** records daily egg production by lot, including fertile eggs, commercial eggs, broken eggs, dirty eggs, double-yolk eggs, shells, mortality, infirmary birds, recovered birds, feed, water and observations.
- **Semen Collection:** records collection room, lot, concentration, semen extracted, males worked, males that produced semen, males that did not produce semen and poor-quality samples.
- **Inventory:** records products, entries, consumption, activity outputs, transfers, previous balance, final balance, lot where the product was used, responsible person and observations.

### Technologies Used

- **HTML5:** page structure and forms.
- **CSS3:** layout, responsive design and visual styling.
- **JavaScript:** application logic, data handling, calculations, table rendering, search, editing and deletion.
- **LocalStorage:** browser-based local persistence.
- **CSV export:** allows exporting module tables.
- **JSON backup:** allows exporting and importing full local backups.

### Main Logic and Algorithms

The application uses simple client-side algorithms:

- Converts form data into JavaScript objects.
- Stores records in arrays grouped by module.
- Saves and loads data using `localStorage`.
- Dynamically renders tables from stored records.
- Filters records using text search across all fields.
- Calculates egg production totals:
  - fertile egg total
  - commercial egg total
  - daily production total
- Calculates inventory balances:

```text
final balance = previous balance + entries - consumption - activity output - transfer
```

- Shows low-stock visual alerts when a product reaches or drops below its minimum value.
- Supports record editing and deletion.
- Supports JSON backup import/export and CSV table export.

### Current Limitations

This project is not finished yet. Current limitations include:

- Data is stored only in the browser with `localStorage`.
- No user accounts or login system.
- No roles or permissions.
- No external database.
- No synchronization between devices.
- No advanced reports, charts or PDFs.
- Some field validations are still basic.
- The final design and form structure may need changes based on real farm workflows.

### Future Improvements

- Add a real database.
- Add authentication and user roles.
- Add reports by date, lot, room and product.
- Add production, mortality and inventory charts.
- Export reports to PDF and Excel.
- Add automatic backups.
- Improve mobile and tablet experience.
- Add change history by user.
- Add stronger validation rules.

### How to Use

Open the main HTML file in a browser, or serve the project folder with a local static server.

Example:

```bash
python -m http.server 8765
```

Then open:

```text
http://localhost:8765
```

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Español

### Descripcion

Este proyecto es una pagina web estatica creada para apoyar la digitalizacion de registros diarios en una granja de pavos. Su objetivo principal es reemplazar o complementar formatos fisicos usados para inventario, produccion de huevos, inseminacion artificial y colecta de semen de machos.

La version actual guarda la informacion localmente en el navegador usando `localStorage`, por lo que puede funcionar sin backend durante la etapa de prototipo.

### Modulos principales

- **Resumen general:** muestra conteos generales y actividad reciente.
- **Inseminada:** registra fecha, lote, hora de inicio y final, semen usado, estado de las pavas, personal encargado y observaciones.
- **Produccion de huevos:** registra produccion diaria por lote, incluyendo huevo fertil, huevo comercial, huevo roto, huevo sucio, doble yema, cascaras, mortalidad, enfermeria, aves recuperadas, alimento, agua y observaciones.
- **Colecta de semen:** registra sala, lote, concentracion, semen extraido, machos trabajados, machos que dieron semen, machos que no dieron y muestras de mala calidad.
- **Inventario:** registra productos, entradas, consumo, salidas por actividad, traslados, saldo anterior, saldo final, lote donde se gasto el producto, responsable y observaciones.

### Tecnologias usadas

- **HTML5:** estructura de la pagina y formularios.
- **CSS3:** diseno visual, distribucion responsive y estilos.
- **JavaScript:** logica de la aplicacion, manejo de datos, calculos, tablas, busqueda, edicion y eliminacion.
- **LocalStorage:** persistencia local en el navegador.
- **Exportacion CSV:** permite exportar tablas por modulo.
- **Respaldo JSON:** permite exportar e importar copias completas de los datos locales.

### Logica y algoritmos principales

La aplicacion usa algoritmos simples del lado del cliente:

- Convierte datos de formularios en objetos de JavaScript.
- Guarda registros en arreglos separados por modulo.
- Guarda y carga informacion usando `localStorage`.
- Renderiza tablas dinamicamente a partir de los registros guardados.
- Filtra registros mediante busqueda de texto en todos los campos.
- Calcula totales de produccion de huevos:
  - total de huevo fertil
  - total de huevo comercial
  - total de produccion del dia
- Calcula saldos de inventario:

```text
saldo final = saldo anterior + entradas - consumo - salida por actividad - traslado
```

- Muestra alertas visuales cuando un producto llega o baja del minimo definido.
- Permite editar y eliminar registros.
- Permite importar/exportar respaldos en JSON y exportar tablas en CSV.

### Limitaciones actuales

Este proyecto aun no esta terminado. Algunas limitaciones actuales son:

- Los datos solo se guardan en el navegador con `localStorage`.
- No hay cuentas de usuario ni inicio de sesion.
- No hay roles ni permisos.
- No hay base de datos externa.
- No hay sincronizacion entre dispositivos.
- No hay reportes avanzados, graficas o PDF.
- Algunas validaciones de campos todavia son basicas.
- El diseno final y la estructura de los formatos pueden necesitar ajustes segun el flujo real de la granja.

### Mejoras futuras

- Agregar una base de datos real.
- Agregar autenticacion y roles de usuario.
- Crear reportes por fecha, lote, sala y producto.
- Agregar graficas de produccion, mortalidad e inventario.
- Exportar reportes a PDF y Excel.
- Crear respaldos automaticos.
- Mejorar la experiencia en celular y tablet.
- Agregar historial de cambios por usuario.
- Agregar reglas de validacion mas completas.

### Como usar

Abre el archivo HTML principal en un navegador o sirve la carpeta del proyecto con un servidor local.

Ejemplo:

```bash
python -m http.server 8765
```

Luego abre:

```text
http://localhost:8765
```

### Licencia

Este proyecto esta bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para mas detalles.
