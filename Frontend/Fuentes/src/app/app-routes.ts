import { ApplibraryModule } from '../../projects/library/src/app/app.module'
import { Routes } from '@angular/router';

const AppRoutes: Routes = [
  {
    loadChildren: () => import('@modules/login/login.module').then((m) => m.LoginModule),
    path: 'login',
  },
  {
    loadChildren: () => ApplibraryModule,
    path: 'management'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

export { AppRoutes };
