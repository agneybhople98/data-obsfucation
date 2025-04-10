import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ConfigurationComponent } from '../pages/configuration/configuration.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs', component: ConfigurationComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }, // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
