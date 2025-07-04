import { computed, Directive, inject, input } from '@angular/core';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';
import { FirengAlignContent } from '../fireng.types';

@Directive({
  selector: '[fireAlignContent]',
  standalone: true,
  host: {
    '[style.alignContent]': 'activeAlignContent()',
  },
})
export class FirengAlignContentDirective {
  /**
   * Defines how lines of flex items are distributed and aligned within a flex container
   * when there is extra space in the cross axis and the container has multiple lines of items.
   * Accepted values for alignContent are:
   * - `stretch`: Lines stretch to take up the remaining space.
   * - `flex-start`: Lines are packed towards the start of the cross axis.
   * - `flex-end`: Lines are packed towards the end of the cross axis.
   * - `center`: Lines are centered along the cross axis.
   * - `space-between`: Lines are evenly distributed with the first line at the start
   * and the last line at the end.
   * - `space-around`: Lines are evenly distributed with equal space around them.
   * Note: The space between lines is double the space at the ends.
   * - `space-evenly`: Lines are evenly distributed with equal space around them,
   * including the space at the ends.
   *
   * Other accepted values include: `start`, `end`, `baseline`, `first baseline`, `last baseline`.
   *
   * Other accepted values include: `normal`, `start`, `end`, `self-start`, `self-end`,
   * `anchor-center`, `first baseline`, `last baseline`, `safe center`, `unsafe center`.
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on the align-content property, refer to the MDN documentation:
   * @see [MDN - align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireAlignContent="space-between">...</div>
   * <div fireAlignContent="center">...</div>
   * <div fireAlignContent="unset">...</div>
   * // Responsive usage:
   * <div fireAlignContent="{ xs: 'flex-start', sm: 'stretch', md: 'space-around', lg: 'inherit' }">...</div>
   * @defaultValue `normal`
   */
  public alignContent = input<
    FirengAlignContent | FirengResponsiveMap<FirengAlignContent>
  >('normal', {
    alias: 'fireAlignContent',
  });

  private screenService = inject(FirengScreenService);

  // Compute the active align content based on the current screen size
  private readonly activeAlignContent = computed(() => {
    const align = this.alignContent();

    if (typeof align === 'string') {
      return align;
    } else {
      const resolvedValue = this.screenService.resolveBreakpointValue(
        align,
        'normal' // Default value if no breakpoint matches
      );

      return resolvedValue();
    }
  });
}
