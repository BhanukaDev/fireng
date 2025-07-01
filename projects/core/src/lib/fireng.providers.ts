import { Provider } from '@angular/core';
import { FirengBreakpoints } from './fireng.types';
import { FIRENG_BREAKPOINTS } from './fireng.token';

export function provideFirengBreakpoints(
  breakpoints: FirengBreakpoints
): Provider[] {
  return [
    {
      provide: FIRENG_BREAKPOINTS,
      useValue: breakpoints,
    },
  ];
}
