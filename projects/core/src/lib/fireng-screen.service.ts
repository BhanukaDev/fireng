import { DOCUMENT } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FirengBreakpoints, FirengResponsiveMap } from './fireng.types';
import { FIRENG_BREAKPOINTS } from './fireng.token';
import { auditTime, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirengScreenService {
  private readonly document: Document = inject(DOCUMENT);
  private readonly window: Window | undefined =
    this.document.defaultView || undefined;

  // signal to store the current window width
  private _windowWidth: WritableSignal<number> = signal(0);
  public readonly windowWidth = this._windowWidth.asReadonly();

  // signal to store the current window height
  private _windowHeight: WritableSignal<number> = signal(0);
  public readonly windowHeight = this._windowHeight.asReadonly();

  // Signal to store breakpoint and this allows for runtime updates to breakpoints
  private readonly _breakpoint: WritableSignal<FirengBreakpoints>;

  // Computed signal to get sorted breakpoints
  private readonly _sortedBreakpoints: Signal<FirengBreakpoints> = computed(
    () => {
      const breakpointsEntries = Object.entries(this._breakpoint() || {}).sort(
        (a, b) => a[1] - b[1]
      );
      return Object.fromEntries(breakpointsEntries);
    }
  );
  // Computed signal for current breakpoint
  public readonly currentBreakpoint: Signal<string> = computed(() => {
    const width = this._windowWidth();
    const breakpoints = this._sortedBreakpoints();

    // taking first first key of breakpoints as default active breakpoint
    let activeBreakpointKey = Object.keys(breakpoints)[0];

    for (const [breakpointKey, breakpointValue] of Object.entries(
      breakpoints
    )) {
      if (width >= breakpointValue) {
        activeBreakpointKey = breakpointKey;
      } else {
        break; // Exit loop once we find the first breakpoint that is larger than the width
      }
    }

    return activeBreakpointKey;
  });

  // Computed signal for cascading breakpoints
  public readonly activeBreakpoints: Signal<string[]> = computed(() => {
    const currentBreakpoint = this.currentBreakpoint();
    const breakpoints = this._sortedBreakpoints();

    const activeNames: string[] = [];
    for (const [breakpointKey, breakpointValue] of Object.entries(
      breakpoints
    )) {
      activeNames.push(breakpointKey);
      if (breakpointKey === currentBreakpoint) {
        break;
      }
    }
    return activeNames;
  });

  constructor() {
    this._breakpoint = signal(inject(FIRENG_BREAKPOINTS));

    if (this.window) {
      this._windowWidth.set(this.window.innerWidth);
      this._windowHeight.set(this.window.innerHeight);

      fromEvent(this.window, 'resize')
        .pipe(auditTime(100))
        .subscribe(() => {
          this._windowWidth.set(this.window?.innerWidth || 0);
          this._windowHeight.set(this.window?.innerHeight || 0);
        });
    } else {
      console.warn(
        'FirengScreenService: No window object found. Screen service may not work as expected.'
      );
    }
  }

  /**
   * Checks if the current screen width matches the specified breakpoint.
   * @param breakpointName The name of the breakpoint (e.g., 'xs', 'md').
   * @returns A signal indicating if the current screen width matches the specified breakpoint.
   */
  public isBreakpoint(breakpointName: string): Signal<boolean> {
    return computed(() => breakpointName === this.currentBreakpoint());
  }

  /**
   * Checks if the current screen size is at or above a specific breakpoint.
   * @param breakpointName The name of the breakpoint (e.g., 'sm', 'md').
   * @returns A signal indicating if the current screen is at or above the breakpoint.
   */
  public isBreakpointUp(breakpointName: string): Signal<boolean> {
    return computed(() => {
      const breakpoints = this._sortedBreakpoints();
      const targetIndex = Object.keys(breakpoints).indexOf(breakpointName);
      const currentIndex = Object.keys(breakpoints).indexOf(
        this.currentBreakpoint()
      );

      return (
        targetIndex >= currentIndex && targetIndex >= 0 && currentIndex >= 0
      );
    });
  }

  /**
   * Checks if the current screen size is below a specific breakpoint.
   * @param breakpointName The name of the breakpoint (e.g., 'sm', 'md').
   * @returns A signal indicating if the current screen is below the breakpoint.
   */
  public isBreakpointDown(breakpointName: string): Signal<boolean> {
    return computed(() => {
      const breakpoints = this._sortedBreakpoints();
      const targetIndex = Object.keys(breakpoints).indexOf(breakpointName);
      const currentIndex = Object.keys(breakpoints).indexOf(
        this.currentBreakpoint()
      );

      return (
        currentIndex < targetIndex && targetIndex >= 0 && currentIndex >= 0
      );
    });
  }

  /**
   * Allows users to update breakpoints dynamically at runtime.
   * This will immediately update the `currentBreakpoint` and `activeBreakpoints` signals.
   * @param newBreakpoints An array of new breakpoint definitions.
   */
  public setBreakpoints(newBreakpoints: FirengBreakpoints): void {
    const keys = new Set<string>();
    for (const [key, value] of Object.entries(newBreakpoints)) {
      if (typeof value !== 'number' || isNaN(value) || value < 0) {
        console.warn(`Invalid breakpoint value for "${key}": ${value}`);
        return;
      } else if (keys.has(key)) {
        console.warn(`Duplicate breakpoint key found: "${key}"`);
        return;
      }
      keys.add(key);
    }

    this._breakpoint.set(newBreakpoints);
    console.log('FirengScreenService: Breakpoints updated successfully.');
  }

  public readonly isPortrait: Signal<boolean> = computed(() => {
    return this._windowHeight() > this._windowWidth();
  });

  /**
   * Resolves a responsive value from a map based on current active breakpoints.
   *
   * It applies cascading logic: the value for the largest active breakpoint in `valueMap` is returned.
   * If no match is found, the `fallback` value is returned.
   *
   * @template T The type of the value (e.g., `number`, `string`).
   * @param valueMap An object mapping breakpoint names to values (e.g., `{ xs: 5, md: 10 }`).
   * @param fallback An optional default value if no matching breakpoint is found.
   * @returns A signal emitting the resolved value, or `fallback`, or `undefined`.
   *
   * @example
   * // Get items per page: 5 for xs, 10 for md and up, default 5
   * const itemsPerPage = this.screenService.resolveBreakpointValue({ xs: 5, md: 10 }, 5);
   */
  public resolveBreakpointValue<T>(
    valueMap: FirengResponsiveMap<T>,
    fallback?: T
  ): Signal<T | undefined> {
    return computed(() => {
      const activeBreakpoints = this.activeBreakpoints();

      let selectedValue: T | undefined;
      for (const breakpoint of activeBreakpoints) {
        if (valueMap.hasOwnProperty(breakpoint)) {
          selectedValue = valueMap[breakpoint];
        }
      }

      if (selectedValue === undefined) {
        return fallback;
      }

      return selectedValue;
    });
  }
}
