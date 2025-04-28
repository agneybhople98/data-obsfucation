import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ObfuscationPlan } from './pages/obfuscation-plan/obfuscation-plan.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SidenavigationBarComponent } from './components/sidenavigation-bar/sidenavigation-bar.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { InputComponent } from './components/input/input.component';
import { ViewObfuscationPlanComponent } from './pages/view-obfuscation/view-obfuscation.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from './components/button/button.component';
import { JobControlComponent } from './pages/job-control/job-control.component';
import { CreateObfuscationPlanComponent } from './pages/create-obfuscation/create-obfuscation.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObfuscationPlan,
    NavbarComponent,
    SidebarComponent,
    JobCardComponent,
    SidenavigationBarComponent,
    JobDetailsComponent,
    BreadcrumbComponent,
    CreateJobComponent,
    InputComponent,
    ButtonComponent,
    ViewObfuscationPlanComponent,
    DropdownComponent,
    JobControlComponent,
    CreateObfuscationPlanComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,

    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
