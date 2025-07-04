import { computed, Directive, inject, input } from '@angular/core';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';
import { FirengJustifyContent } from '@fireng/layout';

@Directive({
  selector: '[fireJustifyContent]',
  standalone: true,
  host: {
    '[style.justifyContent]': 'activeJustifyContent()',
  },
})
export class FirengJustifyContentDirective {
  /**
   * Defines how flex items are distributed along the main axis of their container,
   * after any flexible lengths and auto margins have been applied.
   * Accepted values for justifyContent are:
   * - `flex-start`: Items are packed towards the start of the flex-direction.
   * - `flex-end`: Items are packed towards the end of the flex-direction.
   * - `center`: Items are centered along the main axis.
   * - `space-between`: Items are evenly distributed with the first item at the start
   * and the last item at the end.
   * - `space-around`: Items are evenly distributed with equal space around them.
   * - `space-evenly`: Items are evenly distributed with equal space around them,
   * including the space at the ends.
   *
   * Other accepted values include:
   * `start`, `end`, `left`, `right`, `normal`, `stretch`,
   * `safe center`, `unsafe center`.
   *
   * This input also accepts values from `FirengCssOverflowAlignment` (e.g., `safe`, `unsafe`)
   * when combined with alignment keywords (like `center`).
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on the justify-content property, refer to the MDN documentation:
   * @see [MDN - justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireJustifyContent="center">...</div>
   * <div fireJustifyContent="space-between">...</div>
   * <div fireJustifyContent="safe center">...</div>
   * <div fireJustifyContent="unset">...</div> // Example with a global value
   * // Responsive usage:
   * <div fireJustifyContent="{ xs: 'flex-start', sm: 'center', md: 'space-between', lg: 'inherit' }">...</div>
   * @defaultValue `normal`
   */
  public justifyContent = input<
    FirengJustifyContent | FirengResponsiveMap<FirengJustifyContent>
  >('normal', { alias: 'fireJustifyContent' });

  private readonly screenService = inject(FirengScreenService);

  // Compute the active justify content based on the current screen size
  private readonly activeJustifyContent = computed(() => {
    const justify = this.justifyContent();
    if (typeof justify === 'string') {
      return justify;
    } else {
      const resolvedValue = this.screenService.resolveBreakpointValue(
        justify,
        'normal' // Default value if no breakpoint matches
      );
      return resolvedValue();
    }
  });
}
