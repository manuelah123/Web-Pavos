# Turkey Farm Management System – Web Prototype

Turkey Farm Management System is a web application developed with HTML, CSS and JavaScript to support the operational management of a turkey farm. The system allows users to record artificial insemination processes, semen collection, daily egg production and inventory movements.

This project is currently a prototype. Data is stored locally using `localStorage`, so it does not yet include a database, authentication system, user roles or device synchronization.

---

# Main Features

| Feature | Technology | Benefit |
|---|---|---|
| Artificial insemination records | HTML + JavaScript | Flock management |
| Daily egg production | Automatic calculations | Production control |
| Semen collection | Dynamic forms | Quality tracking |
| Inventory | Final balance algorithm | Stock control |
| Record search | Text filtering | Fast queries |
| Local storage | LocalStorage | Persistent data |
| Export | JSON and CSV | Data backup |

---

# Project Architecture

The project is built as a static web application.

- HTML5
- CSS3
- JavaScript
- LocalStorage

---

# System Modules

## Artificial Insemination

Records:

- Date
- Batch
- Start time
- End time
- Semen used
- Closed hens
- Hens with masses
- Hens with pox
- Sick bay
- Recovered hens
- Staff
- Notes

---

## Egg Production

Records:

- Date
- Batch
- Age
- Barn
- Fertile eggs
- Commercial eggs
- Broken eggs
- Dirty eggs
- Double-yolk eggs
- White eggs
- Small eggs
- Shells
- Mortality
- Sick bay
- Recovered birds
- Marked birds
- Penalized birds
- Feed
- Water
- Notes

---

## Semen Collection

Records:

- Date
- Room
- Batch
- Semen concentration
- Semen extracted
- Males processed
- Males producing semen
- Males without semen
- Poor-quality semen
- Collector
- Notes

---

## Inventory

Records:

- Product
- Unit
- Quantity
- Minimum stock
- Date
- Dispatch number
- Work center
- Responsible person
- Entries
- Consumption
- Outputs
- Transfers
- Previous balance
- Final balance
- Batch
- Expiration date
- Employee signature
- Notes

---

# Implemented Algorithms

## Form Conversion

Each form is converted into a JavaScript object.

## Local Storage

Records are stored using `localStorage`.

## Dynamic Rendering

Tables update automatically whenever records are created, edited or deleted.

## Search

Records can be searched using text filtering.

## Egg Production

```
Fertile total =
Small fertile +
Medium fertile +
Large fertile

Commercial total =
Broken +
Dirty +
Double yolk +
White +
Small +
Others

Daily production =
Fertile total + Commercial total
```

## Inventory

```
Final balance =
Previous balance +
Entries -
Consumption -
Activity output -
Transfer
```

## Alerts

The system displays a warning whenever stock reaches the minimum quantity.

---

# Technologies

- HTML5
- CSS3
- JavaScript
- LocalStorage
- JSON
- CSV

---

# Usage

1. Open the application in your browser.
2. Select the desired module.
3. Fill in the form.
4. Save the record.
5. Review the data table.
6. Export information as JSON or CSV.

---

# Running the Project

No dependencies are required.

Simply open the main HTML file.

Or run a local server:

```bash
python -m http.server 8765
```

Then open:

```
http://localhost:8765
```

---

# Project Status

This project is still under development.

Planned features:

- Database integration
- User authentication
- User roles
- Device synchronization
- PDF reports
- Advanced Excel export
- Charts and dashboards
- Improved validation
- Better UI
- User activity history

---

# Goal

To digitize the daily processes of a turkey farm, reducing paperwork and improving production, inventory, insemination and semen collection management.

---

# Author

Manuel

---

# License

MIT License
