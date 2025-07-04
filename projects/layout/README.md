# @fireng/layout

## Introduction

`@fireng/layout` is a powerful Angular library that helps you build responsive layouts easily. It’s built on top of `@fireng/core` and gives you special Angular directives that wrap common CSS layout styles like `display`, `flex`, `gap`, and more.

You can use these as:

- **Atomic directives** – for single CSS properties
- **Compositional directives** – for combining multiple layout properties together (like Flexbox settings)

It uses Angular Signals to update layouts automatically when the screen size changes. Whether you're making simple containers or complex responsive UIs, `@fireng/layout` helps you write less CSS and keep your templates clean.

## Features

- **Declarative Layouts**: Set layout styles directly in your HTML using clear directive inputs.
- **Signal-Powered Reactivity**: Breakpoint changes update layouts instantly using Angular Signals.
- **Mobile-First Friendly**: Works perfectly with `@fireng/core`’s mobile-first breakpoints.
- **Type-Safe API**: Get auto-complete and error checks with fully typed directive inputs.
- **Modular Design**: Each directive focuses on one thing, which you can mix and match.
- **Less CSS Code**: Control layout from templates, no need for extra utility classes or stylesheets.

## Installation

Run this in your Angular project:

```bash
npm install @fireng/layout
```

Make sure `@fireng/core` is also installed, since it’s a required dependency.

## Quick Example

Here’s a simple Flexbox layout using a compositional directive:

```html
<div fireBox display="flex" [flexDirection]="{ xs: 'column', md: 'row' }" gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Usage

To use any directive from `@fireng/layout`, simply import it into your standalone component, module, or directive. Directives are applied directly to your HTML elements using their selectors. Responsive inputs accept either a single static value or a `FirengResponsiveMap` object from `@fireng/core` for breakpoint-specific adjustments.

### 1. Import the Directive

```ts
import { FirengBoxDirective } from '@fireng/layout';

@Component({
standalone: true,
imports: [FirengBoxDirective],
...
})
```

### 2. Use in Template

Compositional directives like `fireBox` let you combine multiple styles easily:

```html
<!-- Static Flexbox Layout -->
<div fireBox display="flex" flexDirection="column" justify="center" alignItems="center" gap="1rem">
  <span>Item A</span>
  <span>Item B</span>
  <span>Item C</span>
</div>

<!-- Responsive Flexbox Layout -->
<div
  fireBox
  display="flex"
  [flexDirection]="{ xs: 'column', md: 'row' }"
  [justifyContent]="{
    xs: 'flex-start',
    md: 'space-between',
    lg: 'space-around'
  }"
  gap="2rem"
>
  <span>Small Screen</span>
  <span>Medium Screen</span>
  <span>Large Screen</span>
</div>
```

> **Note**: Input names follow **camelCase** (e.g. `alignItems`, `flexDirection`, etc.)

---

## Directives

### Compositional Directive

#### `FirengBoxDirective` (`[fireBox]`)

Turns any element into a responsive Flexbox container. It combines several atomic directives like:

- `display` → sets `display`
- `flexDirection` → sets `flex-direction`
- `flexWrap` → sets `flex-wrap`
- `justifyContent` → sets `justify-content`
- `alignItems` → sets `align-items`
- `alignContent` → sets `align-content`
- `gap` → sets `gap`

You can pass:

- A single value (like `"row"`)
- Or a responsive map (like `{ xs: 'column', md: 'row' }`)

These inputs are reactive and will update automatically when the screen size changes.

---

### Atomic Directives

Use these to control individual CSS properties:

- **`[fireDisplay]`** – Sets the `display` value (e.g., `flex`, `grid`, `none`)
- **`[fireFlexDirection]`** – Sets `flex-direction`
- **`[fireFlexWrap]`** – Sets `flex-wrap`
- **`[fireJustifyContent]`** – Sets `justify-content`
- **`[fireAlignItems]`** – Sets `align-items`
- **`[fireAlignContent]`** – Sets `align-content`
- **`[fireGap]`** – Sets the `gap`

All of these work with responsive values and Angular Signals.

---

## 📦 Coming Soon

More compositional directives will be added soon:

- **`[fireGrid]`** – Grid layouts with responsive columns and rows
- **`[fireSpacing]`** – Easy responsive padding and margin
- **`[fireStyle]`** – Applies responsive custom CSS styles.
- **`[fireText]`** – Responsive control of font size, weight, color, and alignment

These inputs are reactive and will update automatically when the screen size changes.
For a complete list of all accepted values, types, and detailed examples for each input, please refer to the comprehensive JSDoc comments of the corresponding atomic directive.

---

## Contributing

We welcome contributions! A full guide will be published soon.

---

## License

Licensed under the [MIT License](https://github.com/BhanukaDev/fireng/blob/main/LICENSE.md).
