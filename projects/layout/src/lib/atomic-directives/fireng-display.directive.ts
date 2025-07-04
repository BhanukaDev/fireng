import { computed, Directive, inject, input } from '@angular/core';
import { FirengDisplay } from '../fireng.types';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';

@Directive({
  selector: '[fireDisplay]',
  standalone: true,
  host: {
    '[style.display]': 'activeDisplay()',
  },
})
export class FirengDisplayDirective {
  /**
   * Defines the display type of an element, determining its layout behavior.
   * Accepted values for display are:
   * - `block`: The element generates a block-level box.
   * - `inline`: The element generates an inline-level box.
   * - `inline-block`: The element generates a block-level box that flows with surrounding content as if it were a single inline box.
   * - `flex`: The element generates a block-level flex container.
   * - `inline-flex`: The element generates an inline-level flex container.
   * - `grid`: The element generates a block-level grid container.
   * - `inline-grid`: The element generates an inline-level grid container.
   * - `none`: The element and its descendants are hidden, and it takes up no space.
   * - `contents`: The element itself does not generate any boxes, but its children and pseudo-elements still generate boxes.
   *
   * Other accepted values include: `flow-root`, `block flex`, `block flow`, `block flow-root`,
   * `block grid`, `inline flex`, `inline flow`, `inline flow-root`, `inline grid`,
   * `table`, `table-row`, `list-item`.
   *
   * Global CSS values are also accepted: `inherit`, `initial`, `unset`, `revert`.
   *
   * For more details on the display property, refer to the MDN documentation:
   * @see [MDN - display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
   *
   * Can also be provided as a responsive map for different screen sizes.
   * @example
   * // Static usage:
   * <div fireDisplay="flex">...</div>
   * <span fireDisplay="inline-block">...</span>
   * <div fireDisplay="block flex">...</div>
   * <div fireDisplay="unset">...</div>
   * // Responsive usage:
   * <div fireDisplay="{ xs: 'block', sm: 'flex', md: 'inline-block', lg: 'none' }">...</div>
   * @defaultValue 'inline'
   */
  public display = input<FirengDisplay | FirengResponsiveMap<FirengDisplay>>(
    'inline',
    {
      alias: 'fireDisplay',
    }
  );

  private screenService = inject(FirengScreenService);

  // Compute the active display based on the current screen size
  private readonly activeDisplay = computed(() => {
    const displayInput = this.display();

    if (typeof displayInput === 'string') {
      return displayInput;
    } else {
      const resolvedValue = this.screenService.resolveBreakpointValue(
        displayInput,
        'inline' // Default value if no breakpoint matches
      );

      return resolvedValue();
    }
  });
}
