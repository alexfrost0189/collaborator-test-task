# Flight Search

Test task: a flight tickets list with filtering by number of stops, sorting and "show more" pagination.

## Features

- Filter by stops (none, 1, 2, 3, all)
- Sort by the cheapest, the fastest and the optimal option
- Load more tickets, 5 at a time
- Responsive layout

## Tech stack

React 19, TypeScript, Redux Toolkit, SCSS (BEM), Jest + React Testing Library, Prettier, Stylelint.

Flight data is loaded from `public/data/data.json`.

## Getting started

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm start`            | Start the dev server          |
| `npm test`             | Run tests in watch mode       |
| `npm run build`        | Build for production          |
| `npm run lint:css`     | Lint styles with Stylelint    |
| `npm run format`       | Format the code with Prettier |
| `npm run format:check` | Check formatting              |
