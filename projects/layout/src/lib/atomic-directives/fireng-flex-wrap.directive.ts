import { computed, Directive, inject, input } from '@angular/core';
import { FirengFlexWrap } from '../fireng.types';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';

@Directive({
  selector: '[fireFlexWrap]',
  standalone: true,
  host: {
    '[style.flexWrap]': 'activeFlexWrap()',
  },
})
export class FirengFlexWrapDirective {
  /**
   * Defines how flex items are placed in the flex container, allowing them to
   * wrap onto multiple lines.
   * Accepted values for flexWrap are:
   * - `nowrap`: All flex items will be on one line.
   * - `wrap`: Flex items will wrap onto multiple lines.
   * - `wrap-reverse`: Flex items will wrap onto multiple lines in reverse order.
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on the flex-wrap property, refer to the MDN documentation:
   * @see [MDN - flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireFlexWrap="wrap">...</div>
   * <div fireFlexWrap="initial">...</div>
   * // Responsive usage:
   * <div fireFlexWrap="{ xs: 'nowrap', sm: 'wrap', md: 'wrap-reverse', lg: 'unset' }">...</div>
   * @defaultValue `nowrap`
   */
  public flexWrap = input<FirengFlexWrap | FirengResponsiveMap<FirengFlexWrap>>(
    'nowrap',
    { alias: 'fireFlexWrap' }
  );

  private readonly screenService = inject(FirengScreenService);

  // Compute the active flex wrap based on the current screen size
  private readonly activeFlexWrap = computed(() => {
    const wrap = this.flexWrap();
    if (typeof wrap === 'string') {
      return wrap;
    } else {
      // Resolve the value based on the current breakpoint
      const resolvedValue = this.screenService.resolveBreakpointValue(
        wrap,
        'nowrap' // Default value if no breakpoint matches
      );
      return resolvedValue();
    }
  });
}
