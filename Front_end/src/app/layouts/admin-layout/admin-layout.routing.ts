import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ConncurenceComponent } from 'app/conncurence/conncurence.component';
import { RepportingComponent } from 'app/repporting/repporting.component';
import { KeywordStatisticComponent } from 'app/keyword-statistic/keyword-statistic.component';
import { AdminLayoutComponent } from './admin-layout.component';
// import { AuthGuard } from 'app/auth.guard';

export const AdminLayoutRoutes: Routes = [
  { path: 'admin', component: AdminLayoutComponent},
  { path: 'dashboard/:id', component: DashboardComponent},
  { path: 'user-profile/:id', component: UserProfileComponent},
  { path: 'concurrence/:id', component: ConncurenceComponent},
  { path: 'repporting/:id', component: RepportingComponent},
  { path: 'keyword-statistic/:id/:idKey', component: KeywordStatisticComponent},
];
