import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobElement, JobsDataService } from '../../jobs-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements AfterViewInit, OnInit {
  public dataSource: any;
  constructor(
    private _router: Router,
    public jobService: JobsDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<JobElement>(
      this.jobService.getAllJobs()
    );
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.startSequentialUpdates(this.dataSource.data[0].jobId);
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'progress',
    'symbol',
  ];
  jobs = [
    {
      name: 'Total jobs',
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
      count: '85%',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openJobDetails(jobId: string) {
    this._router.navigate(['/dashboard/job-details', jobId]);
  }
  // startSequentialUpdates(jobId: string): void {
  //   // Start the sequential update process
  //   this.jobService.updateTasksSequentially(jobId).subscribe(
  //     (updatedJob) => {
  //       if (updatedJob) {
  //         // Update the component's job details reference
  //         this.dataSource = updatedJob;

  //         // Update the data source to reflect changes in the UI
  //         this.dataSource.data = [...updatedJob.tasks];

  //         // Force change detection if needed
  //         this.changeDetectorRef.detectChanges();
  //       }
  //     },
  //     (error) => console.error('Error updating tasks:', error),
  //     () => console.log('Sequential task updates completed')
  //   );
  // }

  isJobDetailsRoute(): boolean {
    return this._router.url.includes('/job-details');
  }
}
