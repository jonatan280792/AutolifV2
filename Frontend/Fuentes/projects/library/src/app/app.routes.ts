import { LoggedUserComponent } from '@modules/library/logged-user/logged-user.component';
import { Routes } from '@angular/router';
import { SessionAuthGuard } from 'src/app/guards/session-auth.guard';

const AppRoutes: Routes = [
  {
    canActivate: [SessionAuthGuard],
    children: [
      {
        canActivate: [SessionAuthGuard],
        loadChildren: () => import('@modules/library/invoice/invoice.module').then(m => m.InvoiceModule),
        path: 'invoice'
      },
      {
        canActivate: [SessionAuthGuard],
        loadChildren: () => import('@modules/library/home/home.module').then(m => m.HomeModule),
        path: ''
      },
    ],
    component: LoggedUserComponent,
    path: 'home',
  },
  {
    path: 'home',
    redirectTo: 'home'
  }
];

export { AppRoutes };
