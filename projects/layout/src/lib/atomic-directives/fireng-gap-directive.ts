import { computed, Directive, inject, input } from '@angular/core';
import { FirengGap } from '../fireng.types';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';

@Directive({
  selector: '[fireGap]',
  standalone: true,
  host: {
    '[style.gap]': 'activeGap()',
  },
})
export class FirengGapDirective {
  /**
   * Defines the gap (gutters) between rows and columns in flex and grid layouts.
   * This is a shorthand for `row-gap` and `column-gap`.
   * Accepted values for gap are:
   * - A single CSS length value (e.g., `10px`, `1em`, `2%`, `auto`). This applies to both row and column gaps.
   * - Two CSS length values (e.g., `10px 20px`). The first value sets the row gap, the second sets the column gap.
   * - `inherit`: Inherits the gap from its parent element.
   * - `initial`: Sets the gap to its default value as defined by the CSS specification (usually `0px`).
   * - `unset`: Behaves as `inherit` if the property is inherited, otherwise as `initial`.
   * - `revert`: Resets the property to its value from the user-agent stylesheet or user-defined styles.
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireGap="16px">...</div>
   * <div fireGap="1em 2em">...</div>
   * // Responsive usage:
   * <div fireGap="{ xs: `8px`, sm: `16px`, md: `1em 2em`, lg: `inherit` }">...</div>
   * @defaultValue `0px`
   */
  public gap = input<FirengGap | FirengResponsiveMap<FirengGap>>('0px', {
    alias: 'fireGap',
  });

  private readonly screenService = inject(FirengScreenService);

  // Compute the active gap based on the current screen size
  private readonly activeGap = computed(() => {
    const gap = this.gap();
    if (typeof gap === 'string') {
      return gap;
    } else {
      // Resolve the value based on the current breakpoint
      const resolvedValue = this.screenService.resolveBreakpointValue(
        gap,
        '0px' // Default value if no breakpoint matches
      );
      return resolvedValue();
    }
  });
}
