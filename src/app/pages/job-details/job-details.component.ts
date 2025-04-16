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
  isConnected = false;
  obsControlOptions = [
    'OC-98675',
    'OC-98674',
    'OC-98674',
    'OC-98673',
    'OC-98672',
    'OC-98671',
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

          // Start sequential updates if the job is in progress
          if (this.jobDetails.status === 'in-progress') {
            this.startSequentialUpdates(this.jobId);
          }
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

  isExpansionDetailRow = (i: number, row: any) =>
    row.hasOwnProperty('detailRow');

  startSequentialUpdates(jobId: string) {
    this.jobService.updateTasksSequentially(jobId).subscribe(
      (updatedJob) => {
        if (updatedJob) {
        }
      },
      (error) => console.error('Error updating tasks:', error),
      () => {}
    );
  }
}
