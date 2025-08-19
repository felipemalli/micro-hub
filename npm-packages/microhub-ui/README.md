# MicroHub UI

Web Components design system built with Stencil.

## Installation

```bash
pnpm install @felipemalli-libs/microhub-ui
```

## Usage

### Vanilla JS/HTML

```html
<script type="module">
	import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
	defineCustomElements();
</script>

<core-button variant="primary">Click me</core-button>
```

### React/Vue/Angular

```js
import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
defineCustomElements();
```

## Components

This part should be improved to use Storybook and make components examples.

### `<core-button>`

| Prop       | Type                                   | Default     | Description          |
| ---------- | -------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Button style variant |
| `size`     | `'small' \| 'medium' \| 'large'`       | `'medium'`  | Button size          |
| `type`     | `'button' \| 'submit' \| 'reset'`      | `'button'`  | Button type          |
| `disabled` | `boolean`                              | `false`     | Disable button       |

| Event       | Description                  |
| ----------- | ---------------------------- |
| `coreClick` | Fired when button is clicked |

## Development

```bash
npm run build    # Build components
npm run start    # Dev server
npm test         # Run tests
```
