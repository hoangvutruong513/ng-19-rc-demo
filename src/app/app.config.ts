import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(() => console.log('first initializer')),
    provideAppInitializer(() => console.log('second initializer')),
  ],
};
