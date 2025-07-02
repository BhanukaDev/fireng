# `@fireng/core`

## Introduction

`@fireng/core` is the foundational package of the fireng Angular responsive library. It provides the essential, low-level tools for building highly adaptive Angular applications using the power of Signals. At its heart, it helps you accurately detect and react to screen dimensions, manage breakpoints, and resolve values dynamically based on the current viewport state.

## Features

- **Signal Based Reactivity:** Access real-time screen dimensions (`windowWidth`, `windowHeight`) and breakpoint states (`currentBreakpoint`, `activeBreakpoints`) as Angular Signals, ensuring efficient and automatic UI updates.
- **Custom Breakpoints:** Easily define and manage your own set of named breakpoints to match your project's design system.
- **Mobile-First Design:** Built with mobile-first cascading logic, simplifying the application of responsive styles and conditional logic across various screen sizes.
- **Responsive Value Resolution:** A powerful utility to automatically select the most appropriate value from a map based on the current screen's active breakpoints.

## Installation

To install `@fireng/core` in your Angular project:

```bash
npm install @fireng/core
```

## Services & Functions

### `FirengScreenService`

The `FirengScreenService` is the central service for all screen-related information and responsive utilities. Inject it to access signals representing the current viewport state.

#### Injection Example

```typescript
import { Component, effect, inject } from "@angular/core";
import { FirengScreenService } from "@fireng/core";

@Component({
  selector: "screen-service-demo",
  standalone: true,
  imports: [],
  template: `
    <p>Current Window Width: {{ screenService.windowWidth() }}px</p>
    <p>Current Breakpoint: {{ screenService.currentBreakpoint() }}</p>
  `,
})
export class ScreenServiceDemoComponent {
  public screenService = inject(FirengScreenService); // Inject the service

  constructor() {
    effect(() => {
      const currentBreakpoint = this.screenService.currentBreakpoint();
      console.log("Current Breakpoint:", currentBreakpoint);
    });
  }
}
```

#### API

- `windowWidth: Signal<number>`: A signal that provides the current window's inner width in pixels.
- `windowHeight: Signal<number>`: A signal that provides the current window's inner height in pixels.
- `currentBreakpoint: Signal<string>`: A signal that provides the name of the currently active breakpoint (e.g., 'md', 'lg').
- `activeBreakpoints: Signal<string[]>`: A signal that provides an array of breakpoint names that are currently active, in ascending order (e.g., ['xs', 'sm', 'md'] if the current breakpoint is 'md').
- `isBreakpoint(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint matches the given name.
- `isBreakpointUp(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint is at or above the given name.
- `isBreakpointDown(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint is below the given name.
- `setBreakpoints(newBreakpoints: FirengBreakpoints)`: void: Allows you to dynamically update the breakpoints at runtime.
- `isPortrait: Signal<boolean>`: Returns a signal that is `true` if the device orientation is portrait.
- `resolveBreakpointValue<T>(valueMap: FirengResponsiveMap<T>, fallback?: T): Signal<T | undefined>`: Resolves a responsive value from a map based on current active breakpoints. It applies cascading logic: the value for the largest active breakpoint in `valueMap` is returned. If no match is found, the `fallback` value is returned.

```typescript
import { Component, inject, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FirengScreenService } from "@fireng/core";

@Component({
  selector: "responsive-value-demo",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; border: 1px dashed #ccc; margin-top: 20px;">
      <h3>Responsive Value Demo</h3>
      <p>Items to display: {{ itemsToShow() }}</p>
      <p>Current image: <img [src]="imageSrc()" alt="Responsive Image" style="max-width: 100%; height: auto;" /></p>
    </div>
  `,
})
export class ResponsiveValueDemoComponent {
  private screenService = inject(FirengScreenService);

  // Example: Change number of items based on screen size
  itemsToShow: Signal<number | undefined> = this.screenService.resolveBreakpointValue<number>(
    {
      mobile: 1, // 1 item on mobile
      tablet: 3, // 3 items on tablet
      desktop: 5, // 5 items on desktop
    },
    2
  ); // Default to 2 items if no match

  // Example: Change image source based on screen size
  imageSrc: Signal<string | undefined> = this.screenService.resolveBreakpointValue<string>({
    mobile: "https://placehold.co/300x300text=FireNg+Mobile",
    tablet: "https://placehold.co/600x600?text=FireNg+Tablet",
    desktop: "https://placehold.co/800x600?text=FireNg+Desktop",
  });
}
```

#### `provideFirengBreakpoints`

You can define your own custom screen breakpoints for your application using the `provideFirengBreakpoints` function during application bootstrap.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideFirengBreakpoints } from "@fireng/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirengBreakpoints({
      mobile: 0,
      tablet: 768,
      desktop: 992,
      largeDesktop: 1200,
    }),
  ],
};
```

## Contributing

We welcome contributions! Please refer to our contribution guidelines (coming soon) for more information.

## License

This project is licensed under the [MIT License](https://github.com/BhanukaDev/fireng/blob/main/LICENSE.md).
