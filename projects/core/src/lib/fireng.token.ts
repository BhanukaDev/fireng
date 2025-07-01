import { InjectionToken } from '@angular/core';
import { FirengBreakpoints } from './fireng.types';
import { DEFAULT_BREAKPOINTS } from './fireng.data';

export const FIRENG_BREAKPOINTS = new InjectionToken<FirengBreakpoints>(
  'FIRENG_BREAKPOINTS_TOKEN',
  {
    factory: () => DEFAULT_BREAKPOINTS,
  }
);
