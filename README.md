# Rota Viewer

A simple React single-page application that reads weekly employee schedules from CSV files using **PapaParse**, and displays the data in a clean, easy-to-read table format. Users can select different employees and navigate between weeks to quickly view shift schedules.

![Screenshot](https://raw.githubusercontent.com/paulio11/csv-rota/refs/heads/main/screenshot.png)

## Features

- **CSV Parsing:** Loads and parses schedule CSV files using dynamically based on the selected week.
- **Week Navigation:** Move between weekly schedules with previous/next buttons (restricted to a configurable date range).
- **Employee Filtering:** Select a specific employee or view the full rota.
- **Shift Sorting:** Shifts are sorted by start time for each day.
- **Responsive UI:** Built with React and Bootstrap for a clean and responsive user interface.
- **Error Handling:** Handles missing files or parsing errors.

## Prerequisites

- Node.js and npm installed
