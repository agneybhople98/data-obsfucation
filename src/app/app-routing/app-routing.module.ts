import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ObsfucationControl } from '../pages/obsfucation-control/obsfucation-control.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';
import { CreateObsfucationComponent } from '../pages/create-obsfucation/create-obsfucation.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'obsfucation-Control',
    component: ObsfucationControl,
    children: [
      { path: 'create-obsfucation', component: CreateObsfucationComponent },
    ],
  },
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }, // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
