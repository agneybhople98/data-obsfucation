import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  JobDataControlElement,
  JobsDataService,
} from '../../jobs-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-job-control',
  standalone: false,
  templateUrl: './job-control.component.html',
  styleUrl: './job-control.component.scss',
})
export class JobControlComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  public jobControlDetails: any;
  public isHidden: boolean = true;
  isConnected = false;
  currentDomain: string = 'utility';
  obsControlOptions = [
    'Utility Account Obfuscation',
    'Financial Data Masking',
    'Person Entity Anonymization',
    'Field Activity Data Obfuscation',
    'Billing & Financial History',
    'Support Interaction Data Masking',
    'Outage Data Anonymization',
  ];
  // healthcare options
  obsControlOptionsHealthcare = [
    'Membership & Policy Data Obfuscation',
    'Customer & Account Obfuscation',
    'Billing Transactions - US Region',
    'Membership Plan Enrollments Obfuscation',
    'Coverage & Benefits Obfuscation - Prod',
    'Claim Details Obfuscation - EU',
    'Claims Payments & Payouts - AUS',
  ];

  // subset strategy

  subsetControlOptions = [
    'No selection',
    'Utility Account Obfuscation',
    'Financial Data Masking',
    'Person Entity Anonymization',
    'Field Activity Data Obfuscation',
    'Billing & Financial History',
    'Support Interaction Data Masking',
    'Outage Data Anonymization',
  ];
  // healthcare options
  subsetControlOptionsHealthcare = [
    'No selection',
    'Membership & Policy Data Obfuscation',
    'Customer & Account Obfuscation',
    'Billing Transactions - US Region',
    'Membership Plan Enrollments Obfuscation',
    'Coverage & Benefits Obfuscation - Prod',
    'Claim Details Obfuscation - EU',
    'Claims Payments & Payouts - AUS',
  ];

  selectedObsControl = 'Utility Account Obfuscation'; // Default selected value
  selectedObsControlHealthcare = 'Membership & Policy Data Obfuscation';

  selectedSubsetStrategy = 'No selection';
  dataSource!: MatTableDataSource<any>;
  displayedColumns: any[] = [
    'jobControlId',
    'jobControlName',
    'jobControlDescription',
    'obsfucationControlId',
    'lastTriggeredOn',
    'actions',
  ];

  private subscription = new Subscription();

  constructor(
    private _dialog: MatDialog,
    private _jobDataService: JobsDataService,
    private router: Router,
    private _toasterService: ToastrService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    // Extract domain from route parameters
    this.route.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
      }
    });

    // Also listen to parent route parameters (for nested routes)
    this.route.parent?.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectDomainFromUrl();
      });
    // Reset job data to original state
    this._jobDataService.resetJobData();

    // Subscribe to job data changes
    this.subscription.add(
      this._jobDataService.jobsData$.subscribe((jobs) => {
        // Update the data source when job data changes
        this.dataSource = new MatTableDataSource<any>(
          this._jobDataService.getAllJobControlData()
        );
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      })
    );
    this.setDropdownOptions();
    this.dataSource = new MatTableDataSource<any>(
      this._jobDataService.getAllJobControlData()
    );
  }

  // New method to set dropdown options based on currentDomain
  setDropdownOptions(): void {
    if (this.router.url.includes('utility')) {
      this.selectedObsControl = 'Utility Account Obfuscation';
      this.selectedSubsetStrategy = 'No selection';
    } else if (this.router.url.includes('healthcare')) {
      this.selectedObsControlHealthcare =
        'Membership & Policy Data Obfuscation';
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    // Clean up subscription
    this.subscription.unsubscribe();
  }

  // Extract domain from URL
  private detectDomainFromUrl(): void {
    const urlPath = this.router.url;
    const segments = urlPath.split('/').filter((segment) => segment);

    if (segments.length > 0) {
      const potentialDomain = segments[0];
      if (['healthcare', 'utility'].includes(potentialDomain)) {
        this.currentDomain = potentialDomain;
      }
    }
  }

  createJob() {
    this.drawer.close();
    this._toasterService.success('Job Control created successfully!');
  }

  isActive(route: string): boolean {
    const currentUrl = this.router.url;
    const domainRoute = `/${this.currentDomain}${route}`;
    return currentUrl === domainRoute || currentUrl.startsWith(domainRoute);
  }
  runJob(jobControlId: string) {
    // Remove alert or keep for debugging if needed
    // alert(jobControlId);

    // Generate job ID from job control ID if needed
    const jobId = jobControlId.startsWith('JC-')
      ? 'RUN-' + jobControlId.substring(3)
      : jobControlId;

    // Fix the navigation to use the correct route structure
    // Based on the updated routing configuration, job-details is now a child of dashboard
    this.router.navigate([
      `/${this.currentDomain}/dashboard/job-details/${jobId}`,
    ]);

    // Alternative approach using string URL if the above doesn't work
    /*
    this.router.navigateByUrl(
      `/${this.currentDomain}/dashboard/job-details/${jobId}`
    );
    */

    // Start the sequential update process
    this._jobDataService.updateTasksSequentially(jobId).subscribe(
      (updatedJob) => {
        if (updatedJob) {
          // console.log('Updated job:', updatedJob);
        }
      },
      (error) => console.error('Error updating tasks:', error),
      () => {
        // console.log('Sequential task updates completed');
      }
    );
  }

  runAPI() {
    if (this.currentDomain === 'utility') {
      this._jobDataService
        .runJobByName('OBF_EXECUTE_MAIN_JOB_CISADM')
        .subscribe((res) => {
          console.log('res', res);
        });
      this._toasterService.success('Job submitted succesfully!');
    } else {
      this._jobDataService
        .runJobByName('OBF_EXECUTE_MAIN_JOB_ARCHDEV')
        .subscribe((res) => {
          console.log('res', res);
        });
      this._toasterService.success('Job submitted succesfully!');
    }
  }
  openCreateObsfucation(element: any) {
    // Get the obfuscation control data from the service
    const allJobData = this._jobDataService.getAllJobControlData();

    const obsControlData = allJobData.find(
      (job) => job.obsfucationControlId === element.obsfucationControlId
    );

    if (obsControlData) {
      this.router.navigate(
        [`/${this.currentDomain}/obfuscation-plan/view-obfuscation`],
        {
          state: { data: obsControlData },
          replaceUrl: true,
        }
      );
    } else {
      console.error('No matching obfuscation control data found');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (
      data: JobDataControlElement,
      filter: string
    ) => {
      return (
        data.jobControlId.toLowerCase().includes(filter) ||
        data.jobControlName.toLowerCase().includes(filter) ||
        data.jobControlDescription.toLowerCase().includes(filter) ||
        data.obsfucationControlId.toLowerCase().includes(filter)
      );
    };
  }

  openDrawer(element: any, isHidden?: boolean) {
    this.isHidden = false;
    this.jobControlDetails = element;
    this.drawer.open();
  }

  openJobControlDrawer() {
    this.drawer.open();
    this.isHidden = true;
  }
}
