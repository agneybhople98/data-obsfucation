import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { JobElement, JobsDataService } from '../../jobs-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LlmService } from '../../llm.service';
import 'ria-chat-widget';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {
  expandedElement: any | null = null;
  public dataSource: MatTableDataSource<JobElement>;
  public domain: string = '';
  private subscription = new Subscription();
  currentDomain: string = 'utility';
  userPrompt: string = '';
  public loading: boolean = false;
  message: any;

  constructor(
    private _router: Router,
    public jobService: JobsDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private llmService: LlmService
  ) {
    this.dataSource = new MatTableDataSource<JobElement>([]);
  }

  protected readonly API_BASE = 'https://do-chat-assistant.demo.riaapps.com';

  // protected readonly API_BASE = 'http://localhost:8080'; // For local testing

  onNewMessage(message: any) {
    console.log('New message:', message);
  }

  onError(error: any) {
    console.error('Chat error:', error);
  }

  onReady() {
    console.log('Chat widget is ready');
  }

  ngOnInit(): void {
    // Subscribe to route params
    this.route.params.subscribe((params) => {
      this.currentDomain = params['domain'] || 'utility';
    });

    if (this.currentDomain === 'utility') {
      this.jobService.initializeUtilityData();
    }
    if (this.currentDomain === 'healthcare') {
      this.jobService.initializeHealthcareData();
    }

    // Subscribe to job data changes
    this.subscription.add(
      this.jobService.jobsData$.subscribe((jobs) => {
        // Sort the jobs data before assigning to dataSource
        const sortedJobs = this.sortJobsByTriggeredDate(jobs);
        this.dataSource.data = sortedJobs;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sort jobs by triggered date: most recent first
   */
  private sortJobsByTriggeredDate(jobs: JobElement[]): JobElement[] {
    return jobs.sort((a, b) => {
      // Parse DD/MM/YYYY HH:MM:SSAM/PM format to proper Date objects
      const dateA = this.parseCustomDate(a.triggeredOn);
      const dateB = this.parseCustomDate(b.triggeredOn);

      // Sort by triggered date (most recent first)
      return dateB.getTime() - dateA.getTime();
    });
  }

  /**
   * Parse custom date format DD/MM/YYYY HH:MM:SSAM/PM to Date object
   */
  private parseCustomDate(dateString: string): Date {
    // Split date and time parts
    const [datePart, timePart] = dateString.split(' ');

    // Parse date part (DD/MM/YYYY)
    const [day, month, year] = datePart.split('/').map(Number);

    // Parse time part (HH:MM:SSAM/PM)
    const timeMatch = timePart.match(/(\d{1,2}):(\d{2}):(\d{2})(AM|PM)/);
    if (!timeMatch) {
      throw new Error(`Invalid time format: ${timePart}`);
    }

    let [, hours, minutes, seconds, ampm] = timeMatch;
    let hour24 = parseInt(hours);

    // Convert to 24-hour format
    if (ampm === 'AM' && hour24 === 12) {
      hour24 = 0;
    } else if (ampm === 'PM' && hour24 !== 12) {
      hour24 += 12;
    }

    // Create Date object (month is 0-indexed in JavaScript)
    return new Date(
      year,
      month - 1,
      day,
      hour24,
      parseInt(minutes),
      parseInt(seconds)
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  columnsToDisplayWithExpand: string[] = [
    'expand',
    'position',
    'name',
    'weight',
    'progress',
    'symbol',
  ];

  // Columns for the inner table in the expanded row
  innerDisplayColumns: string[] = [
    'position',
    'name',
    'weight',
    'progress',
    'symbol',
  ];

  jobs = [
    {
      name: 'Total Jobs',
      count: 234,
      path: '../../../assets/total-jobs.svg',
    },
    {
      name: 'Successful Jobs',
      count: 100,
      path: '../../../assets/succesfull-jobs.svg',
    },
    {
      name: 'In Progress Jobs',
      count: 126,
      path: '../../../assets/in-progress.svg',
    },
    {
      name: 'DO Success Rate',
      count: '94.04%',
      path: '../../../assets/do-success-rate.svg',
    },
    {
      name: 'Ave.Masking Time',
      count: '30 Sec/GB',
      path: '../../../assets/avg-masking-time.svg',
    },
    {
      name: 'Failed Jobs',
      count: 8,
      path: '../../../assets/failed-jobs.svg',
    },
  ];
  // for multiple prompts we can use this to resolve
  // async askLLMAsync(): Promise<void> {
  //   const response = await this.llmService.askLLMPromise('Hello, how are you?');
  //   console.log('LLM Response (Promise):', response);
  // }

  askLLM(): void {
    this.loading = true;
    this.llmService.askLLM(this.userPrompt).subscribe({
      next: (response) => {
        console.log('LLM Response:', response.choices[0].message.content);
        this.message = response.choices[0].message.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error from LLM:', error);
        this.loading = false;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: JobElement, filter: string) => {
      return (
        data.jobId.toLowerCase().includes(filter) ||
        data.jobName.toLowerCase().includes(filter) ||
        data.jobDescription.toLowerCase().includes(filter)
      );
    };

    // Re-sort the filtered data
    if (this.dataSource.filteredData) {
      this.dataSource.filteredData = this.sortJobsByTriggeredDate(
        this.dataSource.filteredData
      );
    }
  }

  openJobDetails(jobId: string) {
    this._router.navigate([
      `/${this.currentDomain}/dashboard/job-details`,
      jobId,
    ]);
  }

  isJobDetailsRoute(): boolean {
    return this._router.url.includes('/job-details');
  }
}
