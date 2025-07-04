import { computed, Directive, inject, input } from '@angular/core';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';
import { FirengAlignContent } from '../fireng.types';
import { FirengJustifyContentDirective } from '../atomic-directives/fireng-justify-content.directive';
import { FirengFlexDirectionDirective } from '../atomic-directives/fireng-flex-direction.directive';
import { FirengFlexWrapDirective } from '../atomic-directives/fireng-flex-wrap.directive';
import { FirengGapDirective } from '../atomic-directives/fireng-gap-directive';
import { FirengAlignItemDirective } from '../atomic-directives/fireng-align-item.directive';

@Directive({
  selector: '[fireFlex]',
  standalone: true,
  host: {
    '[style.display]': '"flex"',
  },
  hostDirectives: [
    {
      directive: FirengJustifyContentDirective,
      inputs: ['fireJustifyContent: justifyContent'],
    },
    {
      directive: FirengFlexDirectionDirective,
      inputs: ['fireFlexDirection: flexDirection'],
    },
    {
      directive: FirengFlexWrapDirective,
      inputs: ['fireFlexWrap: flexWrap'],
    },
    {
      directive: FirengGapDirective,
      inputs: ['fireGap: gap'],
    },
    {
      directive: FirengAlignItemDirective,
      inputs: ['fireAlignItems: alignItems'],
    },
  ],
})
export class FirengFlexDirective {
  private readonly screenService = inject(FirengScreenService);

  /**
   * Aligns a flex container's lines within the flex container when there is extra space
   * in the cross-axis. This property has no effect when `flex-wrap` is `nowrap`.
   * @defaultValue 'stretch'
   * @example
   * // Static:
   * <div fireFlex alignContent="space-around">...</div>
   * // Responsive:
   * <div fireFlex [alignContent]="{ sm: 'flex-start', lg: 'space-around' }">...</div>
   */
  public alignContent = input<
    FirengAlignContent | FirengResponsiveMap<FirengAlignContent>
  >('stretch');

  // Generic helper method to resolve responsive values
  private resolveResponsiveValue = <T>(
    value: T | FirengResponsiveMap<T>,
    defaultValue: T
  ): T => {
    if (typeof value !== 'object' || value === null) {
      return value as T;
    }
    const resolved = this.screenService.resolveBreakpointValue<T>(
      value as FirengResponsiveMap<T>,
      defaultValue
    )();
    return resolved === undefined ? defaultValue : resolved;
  };

  protected readonly activeAlignContent = computed(() =>
    this.resolveResponsiveValue(this.alignContent(), 'stretch')
  );
}
