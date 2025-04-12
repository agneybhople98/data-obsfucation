import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ObsfucationControl } from '../pages/obsfucation-control/obsfucation-control.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';
import { CreateObsfucationComponent } from '../pages/create-obsfucation/create-obsfucation.component';
import { JobControlComponent } from '../pages/job-control/job-control.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: 'job-details/:id', component: JobDetailsComponent }],
  },
  {
    path: 'obsfucation-control',
    component: ObsfucationControl,
    children: [
      { path: 'create-obsfucation', component: CreateObsfucationComponent },
    ],
  },
  { path: 'job-control-list', component: JobControlComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }, // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
