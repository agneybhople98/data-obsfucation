import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsDataService } from '../../jobs-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
  standalone: false,
})
export class JobDetailsComponent implements OnInit, AfterViewInit {
  public jobId: any;
  jobDetails: any; // Consider creating a proper interface/type for your job data
  loading = true;
  error: string | null = null;
  public dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'taskId',
    'taskDescription',
    'status',
    'errorMessage',
    'startTime',
    'endTime',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobsDataService
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

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
