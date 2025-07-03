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
   * Aligns flex items along the main axis of the current line.
   * @defaultValue 'flex-start'
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
