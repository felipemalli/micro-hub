# MicroHub UI

Web Components design system built with Stencil.

## Installation

```bash
pnpm install @felipemalli-libs/microhub-ui
```

### React Projects

For React projects, you also need to install the runtime dependency:

```bash
pnpm install @stencil/react-output-target
```

Ensure your `tsconfig.json` includes:

```json
{
	"compilerOptions": {
		"module": "esnext",
		"moduleResolution": "bundler"
	}
}
```

## Usage

### React (Recommended)

For React applications, use the React wrapper components with full TypeScript support:

```tsx
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";

function MyComponent() {
	const handleClick = (event) => {
		console.log("Button clicked!", event.detail);
	};

	return (
		<CoreButton
			variant="primary"
			size="medium"
			disabled={false}
			onCoreClick={handleClick}
		>
			Click me
		</CoreButton>
	);
}
```

**Benefits:**

- ✅ Full TypeScript support and IntelliSense
- ✅ Proper React event handling
- ✅ SSR support (Next.js compatible)
- ✅ Tree-shaking and optimal bundling

### Vanilla JS/HTML

```html
<script type="module">
	import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
	defineCustomElements();
</script>

<core-button variant="primary">Click me</core-button>
```

### Vue/Angular (Web Components)

```js
import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
defineCustomElements();
```

Then use as web components in your templates:

```html
<core-button variant="primary" size="medium">Click me</core-button>
```

## Components

### CoreButton (React) / `<core-button>` (Web Component)

#### Props

| Prop       | Type                                   | Default     | Description          |
| ---------- | -------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Button style variant |
| `size`     | `'small' \| 'medium' \| 'large'`       | `'medium'`  | Button size          |
| `type`     | `'button' \| 'submit' \| 'reset'`      | `'button'`  | Button type          |
| `disabled` | `boolean`                              | `false`     | Disable button       |

#### Events

| React Handler | Web Component Event | Description                  |
| ------------- | ------------------- | ---------------------------- |
| `onCoreClick` | `coreClick`         | Fired when button is clicked |

#### Examples

**React:**

```tsx
import { CoreButton } from '@felipemalli-libs/microhub-ui/react';

// Basic usage
<CoreButton variant="primary">Save</CoreButton>

// With event handler
<CoreButton
  variant="danger"
  size="large"
  onCoreClick={(event) => handleDelete(event.detail)}
>
  Delete
</CoreButton>

// Form submission
<CoreButton type="submit" disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</CoreButton>
```

**Web Component:**

```html
<!-- Basic usage -->
<core-button variant="primary">Save</core-button>

<!-- With JavaScript event listener -->
<script>
	const button = document.querySelector("core-button");
	button.addEventListener("coreClick", (event) => {
		console.log("Clicked!", event.detail);
	});
</script>
```

## Framework Compatibility

| Framework      | Support Level            | Import Method                          |
| -------------- | ------------------------ | -------------------------------------- |
| **React**      | ✅ **Native Components** | `@felipemalli-libs/microhub-ui/react`  |
| **Vue**        | ✅ Web Components        | `@felipemalli-libs/microhub-ui/loader` |
| **Angular**    | ✅ Web Components        | `@felipemalli-libs/microhub-ui/loader` |
| **Vanilla JS** | ✅ Web Components        | `@felipemalli-libs/microhub-ui/loader` |
| **Next.js**    | ✅ SSR Support           | `@felipemalli-libs/microhub-ui/react`  |

## Troubleshooting

### TypeScript Errors in React

If you see `Cannot find module '@felipemalli-libs/microhub-ui/react'`:

1. Make sure you've installed the runtime dependency:

   ```bash
   pnpm install @stencil/react-output-target
   ```

2. Ensure your `tsconfig.json` has `"moduleResolution": "bundler"`

3. Restart your TypeScript server in your IDE

### Web Component Mode (Vue/Angular)

```typescript
// In your main.ts or app initialization
import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
defineCustomElements();
```

## Development

```bash
npm run build    # Build components (includes React wrappers)
npm run start    # Dev server
npm test         # Run tests
```

### Building React Wrappers

The React components are automatically generated during the build process. They are located in the `react/` directory and exported via the package's `exports` field.
