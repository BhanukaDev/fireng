import { computed, Directive, inject, input } from '@angular/core';
import { FirengFlexDirection } from '../fireng.types';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';

@Directive({
  selector: '[fireFlexDirection]',
  standalone: true,
  host: {
    '[style.flexDirection]': 'activeFlexDirection()',
  },
})
export class FirengFlexDirectionDirective {
  /**
   * Defines the primary axis along which flex items are laid out and the direction
   * in which they are placed.
   * Accepted values for flexDirection are:
   * - `row`: Items are placed in a row, from left to right in LTR context.
   * - `column`: Items are placed in a column, from top to bottom.
   * - `row-reverse`: Items are placed in a row, from right to left in LTR context.
   * - `column-reverse`: Items are placed in a column, from bottom to top.
   * - `inherit`: Inherits the flex-direction from its parent element.
   * - `initial`: Sets the flex-direction to its default value as defined by the CSS specification.
   * - `unset`: Behaves as `inherit` if the property is inherited, otherwise as `initial`.
   * - `revert`: Resets the property to its value from the user-agent stylesheet or user-defined styles.
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireFlexDirection="column">...</div>
   * // Responsive usage:
   * <div fireFlexDirection="{ sm: `row`, md: `column-reverse`, lg: `inherit` }">...</div>
   * @defaultValue `row`
   */
  public flexDirection = input<
    FirengFlexDirection | FirengResponsiveMap<FirengFlexDirection>
  >('row', {
    alias: 'fireFlexDirection',
  });

  private readonly screenService = inject(FirengScreenService);

  // Compute the active flex direction based on the current screen size
  private readonly activeFlexDirection = computed(() => {
    const direction = this.flexDirection();
    if (typeof direction === 'string') {
      return direction;
    } else {
      const resolvedValue = this.screenService.resolveBreakpointValue(
        direction,
        'row' // Default value if no breakpoint matches
      );
      return resolvedValue();
    }
  });
}
