import { computed, inject, Signal } from '@angular/core';
import { FirengResponsiveValues } from './fireng.types';
import { FirengScreenService } from './fireng-screen.service';

/**
 * A utility function that returns a Signal holding a value that changes
 * based on the current active breakpoint, following a mobile-first cascading approach.
 * If no value is found for the active breakpoints, it returns the provided default value.
 *
 * @param values A map where keys are breakpoint names and values are the responsive data.
 * @param defaultValue An optional value to return if no matching breakpoint value is found.
 * @returns A Signal that emits the responsive value.
 */
export function responsiveValue<T>(
  values: FirengResponsiveValues<T>,
  defaultValue?: T
): Signal<T | undefined> {
  const screenService = inject(FirengScreenService);

  return computed(() => {
    const activeBreakpoints = screenService.activeBreakpoints();

    let selectedValue: T | undefined;
    for (const breakpoint of activeBreakpoints) {
      if (values.hasOwnProperty(breakpoint)) {
        selectedValue = values[breakpoint];
      }
    }

    if (selectedValue === undefined) {
      return defaultValue;
    }

    return selectedValue;
  });
}
