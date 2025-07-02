# `@fireng/layout`

## Introduction

`@fireng/layout` is a powerful and intuitive Angular library designed to simplify the creation of responsive web layouts. Built on top of `@fireng/core`, it provides a collection of directives and components that wrap common CSS layout modules, allowing you to build adaptive UIs with a declarative, Angular-idiomatic approach using Signals.

Whether you're working with Flexbox, CSS Grid, or other fundamental styling concepts, `@fireng/layout` helps you apply responsive styles effortlessly, reducing boilerplate and enhancing readability.

## Features

- **Declarative Layouts:** Define complex responsive layouts directly in your HTML templates using intuitive directive inputs.

- **Signal-Powered Reactivity:** All responsive properties are powered by Angular Signals, ensuring efficient and automatic updates when screen dimensions or breakpoints change.

- **Mobile-First Design Ready:** Seamlessly integrate with @fireng/core's mobile-first breakpoint system for cascading responsive styles.

- **Common CSS Pattern Abstractions:** Provides opinionated directives for widely used CSS layout and styling techniques.

- **Reduced CSS Boilerplate:** Less manual CSS, more dynamic control from your templates.

## Installation

To get started with @fireng/layout, install it in your Angular project:

```bash
npm install @fireng/layout
```

Ensure you also have `@fireng/core` installed, as it's a peer dependency providing the underlying responsive utilities.

## Usage

To use any directive or component from `@fireng/layout`, simply import it into your standalone component, module, or directive, and then apply it to your HTML elements. Responsive inputs accept either a single static value or a `FirengResponsiveMap` object from `@fireng/core` for breakpoint-specific adjustments.

## Directives

Below are the directives and components available in @fireng/layout, along with their APIs and usage examples.

### `FirengFlexDirective` (`[fireFlex]`)

The `FirengFlexDirective` transforms an element into a Flexbox container, allowing you to define its layout properties responsively.

#### Inputs

All inputs accept either a direct CSS value (`string` or `number`, depending on property) or a `FirengResponsiveMap<T>` object (e.g., `{ xs: 'value1', md: 'value2' }`).

- `direction`: Defines the direction of the main axis and the placement of flex items.
  - **Type:** `FirengFlexDirection | FirengResponsiveMap<FirengFlexDirection>`
  - **Values:** `'row'`, `'row-reverse'`, `'column'`,`'column-reverse'`
  - **Default:** `'row'`
- `wrap`: Controls whether flex items are forced onto one line or can wrap.
  - **Type**: `FirengFlexWrap | FirengResponsiveMap<FirengFlexWrap>`
  - **Values**: `'nowrap'`, `'wrap'`, `'wrap-reverse'`
  - **Default**: `'nowrap'`
- `justify`: Aligns flex items along the main axis of the current line.

  - **Type**: `FirengJustifyContent | FirengResponsiveMap<FirengJustifyContent>`
  - **Values**: `'flex-start'`, `'flex-end'`, `'center'`, `'space-between'`, `'space-around'`, `'space-evenly'`
  - **Default**: `'flex-start'`

- `alignItems`: Aligns flex items along the cross axis of the current line.
  - **Type**: `FirengAlignItems | FirengResponsiveMap<FirengAlignItems>`
  - **Values**: `'stretch'`, `'flex-start'`, `'flex-end'`, `'center'`, 'baseline'
  - **Default**: `'stretch'`
- alignContent: Aligns a flex container's lines within the flex container when flex-wrap is wrap.

  - **Type**: `FirengAlignContent | FirengResponsiveMap<FirengAlignContent>`
  - **Values**: `'stretch'`, `'flex-start'`, `'flex-end'`, `'center'`, `'space-between'`, `'space-around'`
  - **Default**: `'stretch'`

- gap: Sets the gap (gutters) between rows and columns within the flex container.
  - **Type**: `string | FirengResponsiveMap<string>` (accepts any valid CSS length, e.g., '10px', '1rem')
  - **Default**: `'0px'`

#### Example Usage

```typescript
import { Component } from "@angular/core";
import { FirengFlexDirective } from "@fireng/layout"; // Import the directive

@Component({
  selector: "app-flex-demo",
  standalone: true,
  imports: [FirengFlexDirective], // Add it to your imports
  template: `
    <h3>Static Flex Container</h3>
    <div fireFlex direction="column" justify="center" alignItems="center" gap="1rem" style="border: 1px dashed #ccc; padding: 10px; min-height: 150px;">
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
    </div>

    <h3>Responsive Flex Container</h3>
    <p>Resize your browser to see the changes:</p>
    <div fireFlex [direction]="{ xs: 'column', md: 'row' }" [justify]="{ xs: 'flex-start', md: 'space-between', lg: 'space-around' }" [gap]="{ xs: '0.5rem', md: '1rem', lg: '2rem' }" style="border: 1px dashed #007bff; padding: 10px; min-height: 150px;">
      <span>Small</span>
      <span>Medium</span>
      <span>Large</span>
    </div>
  `,
})
export class FlexDemoComponent {}
```

### `FirengGridDirective` (`[fireGrid]`)

**Coming Soon:** Details for the `FirengGridDirective` will be added here. It will provide similar responsive control for CSS Grid containers.

### `FirengSpacingDirective` (`[fireSpacing]`)

**Coming Soon:** Details for the `FirengSpacingDirective` will be added here. It will offer responsive control over padding and margin.

`FirengTextDirective` (`[fireText]`)
**Coming Soon:** Details for the FirengTextDirective will be added here. It will provide responsive typography controls like font size and text alignment.

`FirengDisplayDirective` (`[fireDisplay]`)
**Coming Soon:** Details for the FirengDisplayDirective will be added here. It will allow responsive control over the display property, including show/hide based on breakpoints.

## Contributing

We welcome contributions! Please refer to our contribution guidelines (coming soon) for more information.

## License

This project is licensed under the [MIT License](https://github.com/BhanukaDev/fireng/blob/main/LICENSE.md).
