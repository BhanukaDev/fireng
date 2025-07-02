import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirengBreakpoints } from '@fireng/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirengBreakpoints({
      mobile: 0,
      tablet: 568,
      desktop: 992,
      largeDesktop: 1200,
    }),
  ],
};
