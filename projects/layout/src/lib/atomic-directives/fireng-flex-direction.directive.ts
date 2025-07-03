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
        'row'
      );
      return resolvedValue();
    }
  });
}
