import { Directive } from '@angular/core';
import { FirengJustifyContentDirective } from '../atomic-directives/fireng-justify-content.directive';
import { FirengFlexDirectionDirective } from '../atomic-directives/fireng-flex-direction.directive';
import { FirengFlexWrapDirective } from '../atomic-directives/fireng-flex-wrap.directive';
import { FirengGapDirective } from '../atomic-directives/fireng-gap-directive';
import { FirengAlignItemDirective } from '../atomic-directives/fireng-align-item.directive';
import { FirengAlignContentDirective } from '../atomic-directives/fireng-align-content.directive';

@Directive({
  selector: '[fireBox]',
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
    {
      directive: FirengAlignContentDirective,
      inputs: ['fireAlignContent: alignContent'],
    },
  ],
})
export class FirengBoxDirective {}
