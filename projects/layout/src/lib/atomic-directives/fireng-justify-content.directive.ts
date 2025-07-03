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
   * Defines how flex items are placed in the flex container.
   * Accepted values for flexWrap are:
   * - `nowrap`: All flex items will be on one line.
   * - `wrap`: Flex items will wrap onto multiple lines.
   * - `wrap-reverse`: Flex items will wrap onto multiple lines in reverse order.
   * - `inherit`: Inherits the flex-wrap from its parent element.
   * - `initial`: Sets the flex-wrap to its default value as defined by the CSS specification.
   * - `unset`: Behaves as `inherit` if the property is inherited, otherwise as `initial`.
   * - `revert`: Resets the property to its value from the user-agent stylesheet or user-defined styles.
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireFlexWrap="wrap">...</div>
   * // Responsive usage:
   * <div fireFlexWrap="{ xs: `nowrap`, sm: `wrap`, md: `wrap-reverse`, lg: `unset` }">...</div>
   * @defaultValue `nowrap`
   */
  public justifyContent = input<
    FirengJustifyContent | FirengResponsiveMap<FirengJustifyContent>
  >('flex-start', { alias: 'fireJustifyContent' });

  private readonly screenService = inject(FirengScreenService);

  // Compute the active justify content based on the current screen size
  private readonly activeJustifyContent = computed(() => {
    const justify = this.justifyContent();
    if (typeof justify === 'string') {
      return justify;
    } else {
      const resolvedValue = this.screenService.resolveBreakpointValue(
        justify,
        'flex-start' // Default value if no breakpoint matches
      );
      return resolvedValue();
    }
  });
}
