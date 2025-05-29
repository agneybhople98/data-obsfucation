import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ObfuscationPlan } from '../pages/obfuscation-plan/obfuscation-plan.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';
import { ViewObfuscationPlanComponent } from '../pages/view-obfuscation/view-obfuscation.component';
import { JobControlComponent } from '../pages/job-control/job-control.component';
import { CreateObfuscationPlanComponent } from '../pages/create-obfuscation/create-obfuscation.component';
import { RestoreComponent } from '../pages/restore/restore.component';
import { SubsetPlanComponent } from '../pages/subset-plan/subset-plan.component';
import { RouteResolverService } from '../services/route-resolver.service';
import { CreateSubsetComponent } from '../pages/create-subset/create-subset.component';
import { MaintenancePageComponent } from '../pages/maintenance-page/maintenance-page.component';

// Set this to true to enable maintenance mode
const MAINTENANCE_MODE = false;

const maintenanceRoutes: Routes = [
  { path: 'maintenance', component: MaintenancePageComponent },
  { path: '**', redirectTo: '/maintenance' },
];

const normalRoutes: Routes = [
  // Domain as the first segment to ensure it's captured for all routes
  {
    path: ':domain',
    resolve: { data: RouteResolverService },

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        runGuardsAndResolvers: 'always',
        children: [{ path: 'job-details/:id', component: JobDetailsComponent }],
      },
      {
        path: 'clear-target',
        component: RestoreComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'job-control-list',
        component: JobControlComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'obfuscation-plan',
        component: ObfuscationPlan,
        runGuardsAndResolvers: 'always',
        children: [
          { path: 'view-obfuscation', component: ViewObfuscationPlanComponent },
          {
            path: 'create-obfuscation',
            component: CreateObfuscationPlanComponent,
          },
        ],
      },
      {
        path: 'subset-plan',
        component: SubsetPlanComponent,
        runGuardsAndResolvers: 'always',
        children: [
          { path: 'create-subset/:id', component: CreateSubsetComponent },
        ],
      },

      {
        path: 'create-subset',
        component: CreateSubsetComponent,
        runGuardsAndResolvers: 'always',
      },

      // Default route redirects to dashboard within the current domain
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  // Root redirects to utility domain
  { path: '', redirectTo: '/utility/dashboard', pathMatch: 'full' },
  // Unknown paths redirect to utility dashboard
  { path: '**', redirectTo: '/utility/dashboard' },
];

const routes: Routes = MAINTENANCE_MODE ? maintenanceRoutes : normalRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
