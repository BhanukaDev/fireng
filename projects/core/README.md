# `@fireng/core`

## Introduction

`@fireng/core` is the core package of the `fireng` Angular responsive library. It provides essential tools for building responsive Angular apps using Signals. It helps you detect screen sizes and manage breakpoints.

## Features

- **Signal Based Reactivity:** Angular signals to access to screen dimensions and breakpoint states.
- **Custom Breakpoints:** Easily set your own breakpoints.
- **Mobile First Design:** Built to support a mobile-first cascading flow, making it easy to apply responsive styles and logic.

## Installation

To install `@fireng/core` in your Angular project:

```
npm install @fireng/core
```

## FireNg Screen Service

Inject `FirengScreenService` into your components, services, or directives to screen-related signals:

```typescript
import { Component, effect } from "@angular/core";
import { FirengScreenService } from "@fireng/core";

@Component({
  selector: "screen-service-demo",
  standalone: true,
  imports: [],
  templateUrl: "./screen-service-demo.component.html",
})
export class ScreenServiceDemoComponent {
  constructor(private screenService: FirengScreenService) {
    effect(() => {
      const currentBreakpoint = this.screenService.currentBreakpoint();

      console.log("Current Breakpoint:", currentBreakpoint);
    });
  }
}
```

## Custom Breakpoints

You can define your own screen breakpoints using the `provideFirengBreakpoints` function.

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

`FirengScreenService` API

- `windowWidth: Signal<number>`: A signal that provides the current window's inner width in pixels.
- `windowHeight: Signal<number>`: A signal that provides the current window's inner height in pixels.
- `currentBreakpoint: Signal<string>`: A signal that provides the name of the currently active breakpoint (e.g., 'md', 'lg').
- `activeBreakpoints: Signal<string[]>`: A signal that provides an array of breakpoint names that are currently active, in ascending order (e.g., ['xs', 'sm', 'md'] if the current breakpoint is 'md').
- `isBreakpoint(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint matches the given name.
- `isBreakpointUp(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint is at or above the given name.
- `isBreakpointDown(name: string): Signal<boolean>`: Returns a signal that is true if the current breakpoint is below the given name.
- `setBreakpoints(newBreakpoints: FirengBreakpoints)`: void: Allows you to dynamically update the breakpoints at runtime.
- `isPortrait: Signal<boolean>`: Returns a signal that is true if the orientation is portrait.

## `responsiveValue` Utility

The `responsiveValue` function helps you get different data values based on the current screen size. This is useful for changing things like the number of items to show, different image sources, or any setting that needs to adapt to the screen.

```typescript
import { Component, inject, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { responsiveValue } from "@fireng/core";

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
  // Example: Change number of items based on screen size
  itemsToShow: Signal<number | undefined> = responsiveValue<number>(
    {
      mobile: 1, // 1 item on mobile
      tablet: 3, // 3 items on tablet
      desktop: 5, // 5 items on desktop
    },
    2
  ); // Default to 2 items if no match

  // Example: Change image source based on screen size
  imageSrc: Signal<string | undefined> = responsiveValue<string>({
    mobile: "https://placehold.co/300x300text=FireNg+Mobile",
    tablet: "https://placehold.co/600x600?text=FireNg+Tablet",
    desktop: "https://placehold.co/800x600?text=FireNg+Desktp",
  });
}
```

## Contributing

We welcome contributions! Please refer to our contribution guidelines (coming soon) for more information.

## License

This project is licensed under the MIT License.
