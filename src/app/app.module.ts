import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SidenavigationBarComponent } from './components/sidenavigation-bar/sidenavigation-bar.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InputComponent } from './components/input/input.component';
import { ViewObfuscationPlanComponent } from './pages/view-obfuscation/view-obfuscation.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from './components/button/button.component';
import { JobControlComponent } from './pages/job-control/job-control.component';
import { CreateObfuscationPlanComponent } from './pages/create-obfuscation/create-obfuscation.component';
import { SubsetPlanComponent } from './pages/subset-plan/subset-plan.component';
import { FormsModule } from '@angular/forms';
import { RestoreComponent } from './pages/restore/restore.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { CreateSubsetComponent } from './pages/create-subset/create-subset.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { QueryBuilderComponent } from './components/query-builder/query-builder.component';
import { NgxAngularQueryBuilderModule } from 'ngx-angular-query-builder';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { MaintenancePageComponent } from './pages/maintenance-page/maintenance-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ViewSubsetPlanComponent } from './pages/view-subset-plan/view-subset-plan.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { AiLoadingModalComponent } from './ai-loading-modal/ai-loading-modal.component';
import { StreamingLoadingComponent } from './streaming-loading/streaming-loading.component';
import { MatTreeModule } from '@angular/material/tree';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

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
    InputComponent,
    ButtonComponent,
    ViewObfuscationPlanComponent,
    DropdownComponent,
    JobControlComponent,
    CreateObfuscationPlanComponent,
    RestoreComponent,
    SubsetPlanComponent,
    CreateSubsetComponent,
    QueryBuilderComponent,
    ToggleButtonComponent,
    MaintenancePageComponent,
    ViewSubsetPlanComponent,
    TopNavigationBarComponent,
    AiLoadingModalComponent,
    StreamingLoadingComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxAngularQueryBuilderModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTreeModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDatepicker,
    MatSliderModule,
    MatMomentDateModule,
    MatRadioModule,
    HttpClientModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSpinner,
    ToastrModule.forRoot(),
    CdkOverlayOrigin,
  ],
  providers: [provideNativeDateAdapter(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
