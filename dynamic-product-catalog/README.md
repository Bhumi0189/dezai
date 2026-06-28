# Dynamic Product Catalog

A React application that displays a list of products using the `.map()` method and allows users to search items with `.filter()`. Each product is rendered with a unique `key` to help React efficiently update the UI. This project demonstrates dynamic list rendering, conditional rendering, and real-time search functionality.

## Features

- Display products in a responsive grid
- Real-time search functionality
- Filter products using `.filter()`
- Render product cards using `.map()`
- Unique `key` prop for each product
- "No products found" message when search returns no results
- Clean and responsive UI

## Getting Started

```bash
npm install
npm run dev
```

## Key Concepts Demonstrated

| Concept | Where Used |
|---|---|
| `.map()` | Rendering `<ProductCard>` for each product, star ratings, category tabs |
| `.filter()` | Real-time search + category filtering via `useMemo` |
| `key` prop | Every `.map()` call uses a unique `key` (product `id`, star index, category name) |
| Conditional rendering | Badge display, clear button, empty state vs grid |
| `useMemo` | Derived filtered list only recomputes when `query` or `activeCategory` changes |

## Tech Stack

- React 18 + Vite
- CSS custom properties for theming
- No external UI libraries
