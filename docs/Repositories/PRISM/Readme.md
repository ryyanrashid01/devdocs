---
title: PRISM
sidebar_position: 1
---

# PRISM

Welcome to the documentation for the PRISM web app. This documentation provides file-by-file explanations for easy reference.
<br />

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
  <img src="https://ik.imagekit.io/devdocs/img/prism/logo.png" alt="PRISM logo" width="64" />
  <img src="https://ik.imagekit.io/devdocs/img/prism/text.png" alt="PRISM text" height="48" />
</div>

## Overview

This project is a web-based simulator for visualizing and managing drones within a safe monitoring zone. Built with React, Vite, Tailwind CSS, Shadcn UI, and Framer Motion. You can visit the website [here](https://prism.secure-utm.org/).

## Project Structure

- **src/components/**: All reusable UI and logic components
- **src/pages/**: Top-level pages/routes
- **src/lib/**: Utility and helper functions
- **src/interfaces/**: TypeScript interfaces and types
- **src/constants/**: Constants and configuration values

## Documentation Sections

- [Components](./Components/Readme)
- [Pages](./pages)
- [Library Utilities](./lib)
- [Interfaces & Types](./interfaces)
- [Constants](./constants)
- [Key Simulation Logic: drone-canvas](./Components/Drone-canvas)

---

## Quick Start

1. Clone the repository and install dependencies.

```txs
git clone https://github.com/ryyanrashid01/prism
cd prism
```

2. Install dependencies

```tsx
npm install
```

or with **yarn**

```tsx
yarn;
```

3. Run the development server.

```tsx
npm run dev
```

4. Explore the app at `http://localhost:5173`.

## Screenshots

![Dashboard](https://ik.imagekit.io/devdocs/img/prism/dashboard.png)

## How to Use This Documentation

- Each section contains detailed explanations, code snippets, and placeholders for screenshots.
- For the core simulation logic, see **[drone-canvas.md](./Components/drone-canvas.md)**.

---

For further questions, contact the development team or open an issue in the repository.
