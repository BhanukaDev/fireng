import { computed, Directive, inject, input } from '@angular/core';
import { FirengResponsiveMap, FirengScreenService } from '@fireng/core';
import {
  FirengAlignContent,
  FirengAlignItems,
  FirengFlexDirection,
  FirengFlexWrap,
  FirengJustifyContent,
} from './fireng.types';
import { FirengJustifyContentDirective } from './fireng-justify-content.directive';

@Directive({
  selector: '[fireFlex]',
  standalone: true,
  host: {
    '[style.display]': '"flex"',
    '[style.flexDirection]': 'activeDirection()',
    '[style.flexWrap]': 'activeWrap()',
    '[style.justifyContent]': 'activeJustify()',
    '[style.alignItems]': 'activeAlignItems()',
    '[style.alignContent]': 'activeAlignContent()',
    '[style.gap]': 'activeGap()',
  },
  hostDirectives: [
    {
      directive: FirengJustifyContentDirective,
      inputs: ['justify'],
    },
  ],
})
export class FirengFlexDirective {
  private readonly screenService = inject(FirengScreenService);

  /**
   * Defines the direction of the main axis and the direction (normal or reversed)
   * in which flex items are placed.
   * @defaultValue 'row'
   * @example
   * // Static:
   * <div fireFlex direction="column">...</div>
   * // Responsive:
   * <div fireFlex [direction]="{ sm: 'row', md: 'column-reverse' }">...</div>
   */
  public direction = input<
    FirengFlexDirection | FirengResponsiveMap<FirengFlexDirection>
  >('row');

  /**
   * Controls whether flex items are forced onto one line or can wrap onto multiple lines.
   * @defaultValue 'nowrap'
   * @example
   * // Static:
   * <div fireFlex wrap="wrap">...</div>
   * // Responsive:
   * <div fireFlex [wrap]="{ xs: 'nowrap', md: 'wrap' }">...</div>
   */
  public wrap = input<FirengFlexWrap | FirengResponsiveMap<FirengFlexWrap>>(
    'nowrap'
  );

  /**
   * Aligns flex items along the cross axis of the current line.
   * @defaultValue 'stretch'
   * @example
   * // Static:
   * <div fireFlex alignItems="center">...</div>
   * // Responsive:
   * <div fireFlex [alignItems]="{ xs: 'stretch', md: 'center' }">...</div>
   */
  public alignItems = input<
    FirengAlignItems | FirengResponsiveMap<FirengAlignItems>
  >('stretch');

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

  /**
   * Sets the gap (gutters) between rows and columns.
   * It is a shorthand for `row-gap` and `column-gap`.
   * Accepts any valid CSS length value (e.g., '10px', '1rem', '2%').
   * @defaultValue '0px'
   * @example
   * // Static:
   * <div fireFlex gap="1rem">...</div>
   * // Responsive:
   * <div fireFlex [gap]="{ xs: '0.5rem', md: '1.5rem' }">...</div>
   */
  public gap = input<string | FirengResponsiveMap<string>>('0px');

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

  // Computed signals using the helper method
  protected readonly activeDirection = computed(() =>
    this.resolveResponsiveValue(this.direction(), 'row')
  );

  protected readonly activeWrap = computed(() =>
    this.resolveResponsiveValue(this.wrap(), 'nowrap')
  );

  protected readonly activeAlignItems = computed(() =>
    this.resolveResponsiveValue(this.alignItems(), 'stretch')
  );

  protected readonly activeAlignContent = computed(() =>
    this.resolveResponsiveValue(this.alignContent(), 'stretch')
  );

  protected readonly activeGap = computed(() =>
    this.resolveResponsiveValue(this.gap(), '0px')
  );
}
