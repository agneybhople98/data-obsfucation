import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ObfuscationPlan } from '../pages/obfuscation-plan/obfuscation-plan.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';
import { ViewObfuscationPlanComponent } from '../pages/view-obfuscation/view-obfuscation.component';
import { JobControlComponent } from '../pages/job-control/job-control.component';
import { CreateObfuscationPlanComponent } from '../pages/create-obfuscation/create-obfuscation.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: 'job-details/:id', component: JobDetailsComponent }],
  },
  {
    path: 'obfuscation-plan',
    component: ObfuscationPlan,
    children: [
      { path: 'view-obsfucation', component: ViewObfuscationPlanComponent },
      { path: 'create-obsfucation', component: CreateObfuscationPlanComponent },
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
