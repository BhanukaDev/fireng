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
        'nowrap'
      );
      return resolvedValue();
    }
  });
}
