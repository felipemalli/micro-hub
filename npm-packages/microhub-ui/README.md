# MicroHub UI

Modern Web Components design system built with Stencil for universal framework compatibility.

## Installation

```bash
npm install @felipemalli-libs/microhub-ui
```

## Quick Start

### React (Recommended)

```tsx
import { CoreButton, CoreInput } from "@felipemalli-libs/microhub-ui/react";

function App() {
  return (
    <form>
      <CoreInput
        type="email"
        placeholder="Enter your email"
        required
        onCoreInput={(e) => console.log(e.detail)}
      />
      <CoreButton variant="primary" type="submit">
        Submit
      </CoreButton>
    </form>
  );
}
```

### Other Frameworks

```js
import { defineCustomElements } from "@felipemalli-libs/microhub-ui/loader";
defineCustomElements();
```

```html
<core-input type="email" placeholder="Enter your email" required></core-input>
<core-button variant="primary">Submit</core-button>
```

## Components

### CoreButton

| Prop       | Type                                                    | Default     |
| ---------- | ------------------------------------------------------- | ----------- |
| `variant`  | `'primary' \| 'secondary' \| 'danger' \| 'outline' \| 'ghost' \| 'underline'` | `'primary'` |
| `size`     | `'small' \| 'medium' \| 'large'`                       | `'medium'`  |
| `type`     | `'button' \| 'submit' \| 'reset'`                      | `'button'`  |
| `disabled` | `boolean`                                              | `false`     |

**Events:** `onCoreClick` (React) / `coreClick` (Web Component)

```tsx
// React
<CoreButton variant="danger" size="large" onCoreClick={handleDelete}>
  Delete
</CoreButton>

// Web Component
<core-button variant="outline" size="small">Cancel</core-button>
```

### CoreInput

| Prop          | Type                                           | Default   |
| ------------- | ---------------------------------------------- | --------- |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`  |
| `placeholder` | `string`                                       | `""`      |
| `value`       | `string`                                       | `""`      |
| `size`        | `'small' \| 'large'`                           | `'large'` |
| `disabled`    | `boolean`                                      | `false`   |
| `required`    | `boolean`                                      | `false`   |
| `error`       | `boolean`                                      | `false`   |
| `name`        | `string`                                       | `""`      |
| `inputId`     | `string`                                       | `""`      |

**Events:** `onCoreInput`, `onCoreChange`, `onCoreFocus`, `onCoreBlur` (React) / `coreInput`, `coreChange`, `coreFocus`, `coreBlur` (Web Components)

```tsx
// React
<CoreInput
  type="password"
  placeholder="Password"
  required
  error={hasError}
  onCoreInput={(e) => setPassword(e.target.value)}
/>

// Web Component
<core-input
  type="number"
  placeholder="Age"
  size="small"
  name="age"
></core-input>
```

## Framework Support

| Framework  | Method                                    |
| ---------- | ----------------------------------------- |
| React      | `@felipemalli-libs/microhub-ui/react`     |
| Vue        | `@felipemalli-libs/microhub-ui/loader`    |
| Angular    | `@felipemalli-libs/microhub-ui/loader`    |
| Vanilla JS | `@felipemalli-libs/microhub-ui/loader`    |

## License

MIT © Felipe Vahia Malliagros
