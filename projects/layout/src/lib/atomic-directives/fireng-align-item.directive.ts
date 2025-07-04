import { computed, Directive, inject, input } from '@angular/core';
import { FirengAlignItems } from '../fireng.types';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';

@Directive({
  selector: '[fireAlignItem]',
  standalone: true,
  host: {
    '[style.alignItems]': 'activeAlignItem()',
  },
})
export class FirengAlignItemDirective {
  /**
   * Defines how flex items are aligned along the cross axis of their container
   * (perpendicular to the main axis).
   * Accepted values for alignItems are:
   * - `flex-start`: Items are aligned to the start of the cross axis.
   * - `flex-end`: Items are aligned to the end of the cross axis.
   * - `center`: Items are centered along the cross axis.
   * - `baseline`: Items are aligned such that their baselines align.
   * - `stretch`: Items stretch to fill the container (this is the default behavior).
   *
   * Other accepted values include: `normal`, `start`, `end`, `self-start`, `self-end`,
   * `anchor-center`, `first baseline`, `last baseline`, `safe center`, `unsafe center`.
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on align-items properties, refer to the MDN documentation:
   * @see [MDN - align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireAlignItems="center">...</div>
   * <div fireAlignItems="baseline">...</div>
   * <div fireAlignItems="unset">...</div>
   * // Responsive usage:
   * <div fireAlignItems="{ xs: 'flex-start', sm: 'center', md: 'stretch', lg: 'inherit' }">...</div>
   * @defaultValue `normal`
   */
  public alignItems = input<
    FirengAlignItems | FirengResponsiveMap<FirengAlignItems>
  >('normal', {
    alias: 'fireAlignItems',
  });

  private screenService = inject(FirengScreenService);

  // Compute the active align items based on the current screen size
  private readonly activeAlignItem = computed(() => {
    const align = this.alignItems();

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
