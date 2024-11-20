import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout/main-layout.component').then(
        (p) => p.MainLayoutComponent,
      ),
  },
  {
    path: 'linked-signal',
    loadComponent: () =>
      import('./link-signal-demo/link-signal-demo.component').then(
        (p) => p.LinkSignalDemoComponent,
      ),
  },
];
