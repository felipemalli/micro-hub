# @felipemalli-libs/microhub-ui

A reusable UI component library for the MicroHub project, built with React, TypeScript, and Tailwind CSS.

> **Note**: This is a simulated private package for demonstrating a microfrontend architecture.

## 🚀 Features

- **TypeScript First**: Fully typed for a better development experience
- **Tailwind CSS**: Utility-first and customizable styling
- **Tests**: Coverage with Jest and Testing Library

## 📦 Installation

```bash
npm install @felipemalli-libs/microhub-ui
```

## 🎯 Basic Usage

```tsx
import { Button } from "@felipemalli-libs/microhub-ui";

function App() {
	return (
		<Button variant="primary" size="md" onClick={() => console.log("Clicked!")}>
			Click me
		</Button>
	);
}
```

## 📚 Components

### Button

A versatile button component with multiple variants and states.

```tsx
// Available Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build the package
npm run build

# Development with watch mode
npm run build:watch
```

## 📁 Project Structure

```
src/
├── components/
│   └── Button/
├── types/
├── utils/
└── index.ts
```
