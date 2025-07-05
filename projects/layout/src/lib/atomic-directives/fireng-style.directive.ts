import { computed, Directive, inject, input } from '@angular/core';
import { FirengScreenService } from '@fireng/core';
import { FirengStyle } from '../fireng.types';

@Directive({
  selector: '[fireStyle]',
  standalone: true,
  host: {
    '[style]': 'activeStyle()',
  },
})
export class FirengStyleDirective {
  /**
   * Applies dynamic and responsive custom CSS styles directly to the host element,
   * providing fine-grained control over any valid CSS property.
   *
   * This input accepts a plain JavaScript object (a map) where:
   * - Keys are standard CSS property names in **camelCase** (e.g., `backgroundColor`, `fontSize`, `padding`, `borderLeft`).
   *
   * Values for these properties can be:
   * - A static CSS value string (e.g., `'red'`, `'10px'`, `'flex'`, `'inherit'`).
   * - A `FirengResponsiveMap<string>` object for breakpoint-specific styling (e.g., `{ xs: '16px', sm: '24px' }`).
   *
   * This allows for highly flexible styling, supporting any CSS property that can be set via
   * an element's `style` attribute, including global CSS values for individual properties.
   *
   * @example
   * // Applying various custom styles, including a responsive font size:
   * <span
   * [fireStyle]="{
   * color: 'white',
   * backgroundColor: '#007bff',
   * fontSize: { xs: '16px', sm: '24px' }, // Responsive value for fontSize
   * padding: '10px 20px',
   * borderRadius: '5px'
   * }"
   * >
   * Responsive Text
   * </span>
   * @defaultValue `{}`
   */
  public style = input<FirengStyle>({}, { alias: 'fireStyle' });

  private readonly screenService = inject(FirengScreenService);

  // Compute the active style based on the current screen size
  private readonly activeStyle = computed(() => {
    const styleInput = this.style();
    if (!styleInput || typeof styleInput !== 'object') {
      return {};
    }

    return Object.fromEntries(
      Object.entries(styleInput).reduce<[string, string][]>(
        (acc, [prop, val]) => {
          if (typeof val === 'string') {
            acc.push([prop, val]);
          } else {
            const resolved =
              this.screenService.resolveBreakpointValue<string>(val)();
            if (resolved) {
              acc.push([prop, resolved]);
            }
          }
          return acc;
        },
        []
      )
    );
  });
}
