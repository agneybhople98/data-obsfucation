import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JobsDataService } from '../../jobs-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { filter, Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
  standalone: false,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class JobDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  isConnected = false;
  public jobDetailsDrawer: any;
  selectedObsControl = '';
  selectedJobIdControl = '';
  headerTitle: string = 'View Job Control';

  selectedObsControlHealthcare = '';
  selectedJobIdControlHealthcare = '';
  currentDomain: string = 'utility';

  // utility options
  obsControlOptionsUtility = [
    'Utility Account Obfuscation',
    'Financial Data Masking',
    'Person Entity Anonymization',
    'Field Activity Data Obfuscation',
    'Billing & Financial History',
    'Support Interaction Data Masking',
    'Outage Data Anonymization',
  ];
  jobControlOptionsUtility = [
    'Utility Account Obfuscation – Non-Prod',
    'Financial Data Masking – Utility Systems',
    'Person Entity Anonymization – Pre-Prod',
    'Field Activity Data Obfuscation – Dev/Test',
    'Billing & Financial History Obfuscation',
    'Support Interaction Data Masking',
    'Outage Data Anonymization – Global Compliance',
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
  jobControlOptionsHealthcare = [
    'Membership & Policy Data Obfuscation',
    'Customer & Account Obfuscation',
    'Billing Transactions - US Region',
    'Membership Plan Enrollments Obfuscation',
    'Coverage & Benefits Obfuscation - Prod',
    'Claim Details Obfuscation - EU',
    'Claims Payments & Payouts - AUS ',
  ];
  expandedElement: any | null = null;
  public jobId: any;
  jobDetails: any;
  loading = true;
  error: string | null = null;
  public dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay: string[] = [
    'taskId',
    'taskDescription',
    'status',
    'startTime',
    'endTime',
  ];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];

  private subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobsDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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

    // Get the jobId from route parameters
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get('id');

      if (this.jobId) {
        this.setDropdownOptions();
        if (this.router.url.includes('healthcare')) {
          this.jobService.initializeHealthcareData();
        } else {
          this.jobService.initializeUtilityData(); // fallback/default
        }

        this.subscription.add(
          this.jobService.jobsData$.subscribe((jobs) => {
            // First try to find the job directly by ID
            this.jobDetails = this.jobService.getJobById(this.jobId);

            if (this.jobDetails === undefined) {
              // If not found, try to find it in additionalRunIdDetails
              const parentJob = this.jobService.getJobByAdditionalRunIdDetails(
                this.jobId
              );

              if (parentJob) {
                // Find the specific additionalRunIdDetails that matches the jobId
                const matchingDetail = parentJob.additionalRunIdDetails.find(
                  (detail: any) => detail.jobId === this.jobId
                );

                if (matchingDetail) {
                  // Use the details from the matching additionalRunIdDetails
                  this.jobDetails = matchingDetail;

                  if (matchingDetail.tasks) {
                    this.dataSource.data = matchingDetail.tasks;
                    this.loading = false;
                  } else {
                    this.error = 'No tasks found for this job';
                    this.loading = false;
                  }
                } else {
                  this.error =
                    'Job details not found in additionalRunIdDetails';
                  this.loading = false;
                }
              } else {
                this.error = 'Job not found';
                this.loading = false;
              }
            } else if (this.jobDetails && this.jobDetails.tasks) {
              // If job was found directly by ID, use its tasks
              this.dataSource.data = this.jobDetails.tasks;
              this.loading = false;
              this.changeDetectorRef.detectChanges();
            } else {
              this.error = 'No tasks found for this job';
              this.loading = false;
            }
          })
        );

        // Similar logic for initial job details fetch (outside subscription)
        this.jobDetails = this.jobService.getJobById(this.jobId);

        if (this.jobDetails === undefined) {
          const parentJob = this.jobService.getJobByAdditionalRunIdDetails(
            this.jobId
          );

          if (parentJob) {
            const matchingDetail = parentJob.additionalRunIdDetails.find(
              (detail: any) => detail.jobId === this.jobId
            );

            if (matchingDetail) {
              this.jobDetails = matchingDetail;

              if (matchingDetail.tasks) {
                this.dataSource.data = matchingDetail.tasks;
                this.loading = false;
              } else {
                this.error = 'No tasks found for this job';
                this.loading = false;
              }
            } else {
              this.error = 'Job details not found in additionalRunIdDetails';
              this.loading = false;
            }
          } else {
            this.error = 'Job not found';
            this.loading = false;
          }
        } else if (this.jobDetails && this.jobDetails.tasks) {
          this.dataSource.data = this.jobDetails.tasks;
          this.loading = false;
        } else {
          this.error = 'No tasks found for this job';
          this.loading = false;
        }
      } else {
        this.error = 'No job ID provided';
        this.loading = false;
      }
    });
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

  // New method to set dropdown options based on currentDomain
  setDropdownOptions(): void {
    if (this.router.url.includes('utility')) {
      this.selectedJobIdControl = 'Utility Account Obfuscation – Non-Prod';
      this.selectedObsControl = 'Utility Account Obfuscation';
    } else if (this.router.url.includes('healthcare')) {
      this.selectedJobIdControlHealthcare =
        'Membership & Policy Data Obfuscation';
      this.selectedObsControlHealthcare =
        'Membership & Policy Data Obfuscation';
    }
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Clean up subscription
    this.subscription.unsubscribe();
  }

  toggleRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.changeDetectorRef.detectChanges();
  }

  openJobControlDrawer(jobDetails: any) {
    this.drawer.open();
    this.jobDetailsDrawer = jobDetails;
    this.headerTitle = 'View Job Control';
  }
  openSubsetPlanDrawer(jobDetails: any) {
    // this.drawer.open();
    // this.jobDetailsDrawer = jobDetails;
    // this.headerTitle = 'View Subset Plan';
    this.router.navigate([`${this.currentDomain}/subset-plan/create-subset`]);
  }

  isExpansionDetailRow = (i: number, row: any) =>
    row.hasOwnProperty('detailRow');

  extractUrl(message: string): string {
    if (!message) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = message.match(urlRegex);
    return match ? match[0] : '';
  }

  extractNonUrlText(message: string): string {
    if (!message) return '';

    // Remove the URL from the message
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return message.replace(urlRegex, '');
  }

  formatMessage(message: string): string {
    // Split the message into words
    return message
      .split(' ')
      .map((word) => {
        // Check if the word is all caps (ignoring punctuation)
        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
        if (cleanWord === cleanWord.toUpperCase() && cleanWord.length > 1) {
          // Return the word with HTML bold tags, preserving any punctuation
          return `<strong>${word}</strong>`;
        }

        return word;
      })
      .join(' ');
  }

  navigateToObfuscationPlan(element: any) {
    const allJobData = this.jobService.getAllJobControlData();

    const obsControlData = allJobData.find(
      (job) => job.obsfucationControlId === element
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
}
