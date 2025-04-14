import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class JobDetailsComponent implements OnInit, AfterViewInit {
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
  jobDetails: any; // Consider creating a proper interface/type for your job data
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
        this.jobDetails = this.jobService.getJobById(this.jobId);
        console.log('jobDetails', this.jobDetails);
        if (this.jobDetails && this.jobDetails.tasks) {
          this.dataSource.data = this.jobDetails.tasks;
          this.loading = false;

          // Update tasks sequentially with 1-second intervals
          this.startSequentialUpdates(this.jobId);
        } else {
          this.error = 'Job details not found';
          this.loading = false;
        }
        console.log('dataSource data', this.dataSource.data);
      } else {
        this.error = 'No job ID provided';
        this.loading = false;
      }
    });
  }

  toggleRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.changeDetectorRef.detectChanges();
  }

  isExpansionDetailRow = (i: number, row: any) =>
    row.hasOwnProperty('detailRow');

  startSequentialUpdates(jobId: string): void {
    // Start the sequential update process
    this.jobService.updateTasksSequentially(jobId).subscribe(
      (updatedJob) => {
        if (updatedJob) {
          // Update the component's job details reference
          this.jobDetails = updatedJob;

          // Update the data source to reflect changes in the UI
          this.dataSource.data = [...updatedJob.tasks];

          // Force change detection if needed
          this.changeDetectorRef.detectChanges();
        }
      },
      (error) => console.error('Error updating tasks:', error),
      () => console.log('Sequential task updates completed')
    );
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
