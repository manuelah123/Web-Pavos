# Turkey Farm Management System

![License](https://img.shields.io/badge/license-MIT-green)


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
