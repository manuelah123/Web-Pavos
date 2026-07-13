# Sistema de Gestión para Granja de Pavos – Prototipo Web

Sistema de Gestión para Granja de Pavos es una aplicación web desarrollada con HTML, CSS y JavaScript para apoyar el control operativo de una granja de pavos. El sistema permite registrar procesos de inseminación artificial, colecta de semen, producción diaria de huevos e inventario de productos.

Este proyecto se encuentra en etapa de prototipo. Actualmente almacena la información en el navegador mediante `localStorage`, por lo que aún no cuenta con base de datos, autenticación de usuarios, roles ni sincronización entre dispositivos.

---

# Características Principales

| Funcionalidad | Tecnología | Beneficio |
|---|---|---|
| Registro de inseminación | HTML + JavaScript | Control de lotes, semen y personal |
| Producción diaria de huevos | Cálculos automáticos | Control de producción |
| Colecta de semen | Formularios dinámicos | Registro de calidad y concentración |
| Inventario | Algoritmo de saldo final | Control de entradas y salidas |
| Búsqueda de registros | Filtrado de texto | Consulta rápida |
| Almacenamiento local | LocalStorage | Persistencia de datos |
| Exportación | JSON y CSV | Respaldo de información |

---

# Arquitectura del Proyecto

El sistema está construido como una aplicación web estática.

- HTML5
- CSS3
- JavaScript
- LocalStorage

---

# Módulos del Sistema

## Inseminación Artificial

Permite registrar:

- Fecha
- Lote
- Hora inicio
- Hora final
- Semen gastado
- Pavas cerradas
- Pavas con masa
- Pavas con viruela
- Enfermería
- Recuperadas
- Personal
- Observaciones

---

## Producción de Huevos

Permite registrar:

- Fecha
- Lote
- Edad
- Galpón
- Huevo fértil
- Huevo comercial
- Huevo roto
- Huevo sucio
- Doble yema
- Blanco
- Pequeño
- Cáscaras
- Mortalidad
- Enfermería
- Recuperadas
- Pintadas
- Castigadas
- Alimento
- Agua
- Observaciones

---

## Colecta de Semen

Permite registrar:

- Fecha
- Sala
- Lote
- Concentración
- Semen extraído
- Machos trabajados
- Machos con semen
- Machos sin semen
- Mala calidad
- Colector
- Observaciones

---

## Inventario

Permite registrar:

- Producto
- Unidad
- Cantidad
- Stock mínimo
- Fecha
- Número de salida
- Centro de trabajo
- Responsable
- Entradas
- Consumo
- Salidas
- Traslados
- Saldo anterior
- Saldo final
- Lote
- Fecha de vencimiento
- Firma
- Observaciones

---

# Algoritmos Implementados

## Conversión de Formularios

Cada formulario se convierte en un objeto JavaScript.

## LocalStorage

Los registros se almacenan localmente utilizando `localStorage`.

## Renderizado Dinámico

Las tablas se actualizan automáticamente después de cada modificación.

## Búsqueda

Los registros pueden filtrarse mediante texto.

## Producción de Huevos

```
Total fértil =
Huevo fértil pequeño +
Huevo fértil mediano +
Huevo fértil grande

Total comercial =
Roto +
Sucio +
Doble yema +
Blanco +
Pequeño +
Otros

Producción diaria =
Total fértil + Total comercial
```

## Inventario

```
Saldo final =
Saldo anterior +
Entradas -
Consumo -
Salida por actividad -
Traslado
```

## Alertas

Cuando un producto alcanza el stock mínimo se muestra una alerta visual.

---

# Tecnologías

- HTML5
- CSS3
- JavaScript
- LocalStorage
- JSON
- CSV

---

# Uso

1. Abrir la página en el navegador.
2. Seleccionar el módulo.
3. Completar el formulario.
4. Guardar el registro.
5. Consultar la tabla.
6. Exportar información en JSON o CSV.

---

# Ejecución

No requiere instalar dependencias.

Abrir directamente el archivo HTML principal.

También puede ejecutarse con:

```bash
python -m http.server 8765
```

Luego abrir:

```
http://localhost:8765
```

---

# Estado del Proyecto

Proyecto en desarrollo.

Pendiente implementar:

- Base de datos
- Inicio de sesión
- Roles
- Sincronización
- Reportes PDF
- Exportación avanzada a Excel
- Gráficas
- Validaciones
- Mejoras de interfaz
- Historial de cambios

---

# Objetivo

Digitalizar los procesos diarios de una granja de pavos para mejorar el control de producción, inventario, inseminación y colecta de semen.

---

# Autor

Manuel

---

# Licencia

MIT License
