import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { Subscription } from 'rxjs';
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
  selectedObsControl = 'Utility Account Obfuscation'; // Default selected value
  selectedJobIdControl = 'Utility Account Obfuscation – Non-Prod'; // Default selected value

  obsControlOptions = [
    'Utility Account Obfuscation',
    'Financial Data Masking',
    'Person Entity Anonymization',
    'Field Activity Data Obfuscation',
    'Billing & Financial History',
    'Support Interaction Data Masking',
    'Outage Data Anonymization',
  ];
  jobControlOptions = [
    'Utility Account Obfuscation – Non-Prod',
    'Financial Data Masking – Utility Systems',
    'Person Entity Anonymization – Pre-Prod',
    'Field Activity Data Obfuscation – Dev/Test',
    'Billing & Financial History Obfuscation',
    'Support Interaction Data Masking',
    'Outage Data Anonymization – Global Compliance',
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
    private route: ActivatedRoute,
    private jobService: JobsDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get the jobId from route parameters
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get('id');
      if (this.jobId) {
        // Subscribe to job data changes
        this.subscription.add(
          this.jobService.jobsData$.subscribe((jobs) => {
            this.jobDetails = this.jobService.getJobById(this.jobId);
            if (this.jobDetails && this.jobDetails.tasks) {
              this.dataSource.data = this.jobDetails.tasks;
              this.loading = false;
              this.changeDetectorRef.detectChanges();
            } else {
              this.error = 'Job details not found';
              this.loading = false;
            }
          })
        );

        // Get initial job details
        this.jobDetails = this.jobService.getJobById(this.jobId);
        if (this.jobDetails && this.jobDetails.tasks) {
          this.dataSource.data = this.jobDetails.tasks;
          this.loading = false;
        } else {
          this.error = 'Job details not found';
          this.loading = false;
        }
      } else {
        this.error = 'No job ID provided';
        this.loading = false;
      }
    });
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
}
