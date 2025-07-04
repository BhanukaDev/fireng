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
   * Accepted values for gap are any valid CSS <length> or <percentage> value,
   * which can be a single value (for both row and column gap) or two values
   * (first for row-gap, second for column-gap).
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on the gap property, refer to the MDN documentation:
   * @see [MDN - gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireGap="20px">...</div>
   * <div fireGap="1em 0.5em">...</div>
   * <div fireGap="calc(10% + 20px)">...</div>
   * <div fireGap="unset">...</div> // Example with a global value
   * // Responsive usage:
   * <div fireGap="{ xs: '8px', sm: '1em 2em', md: '3vmin 2vmax', lg: 'inherit' }">...</div>
   * @defaultValue `normal`
   */
  public gap = input<FirengGap | FirengResponsiveMap<FirengGap>>('normal', {
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
