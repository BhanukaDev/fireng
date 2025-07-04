import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirengBreakpoints } from '@fireng/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
};
