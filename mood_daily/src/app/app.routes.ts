// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// export const appRoutes: Routes = [
//   {
//     path: 'dashboard',
//     loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(
//       appRoutes,
//     //   {
//     //     enableTracing: false,
//     //     // preloadingStrategy: SelectivePreloadingStrategyService,
//     //   }
//     )
//   ],
//   exports: [
//     RouterModule
//   ]
// })
// export class AppRoutingModule { }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

export const routes: Routes = [
  // { path: '', component:  HomeComponent, },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Works only for root ('/')
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // { path: '**', redirectTo: 'login' }, // Fallback route to handle undefined routes
];
