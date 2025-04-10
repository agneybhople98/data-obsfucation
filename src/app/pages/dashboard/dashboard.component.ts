import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobElement, JobsDataService } from '../../jobs-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements AfterViewInit {
  public dataSource: any;
  constructor(private _router: Router, public jobService: JobsDataService) {
    this.dataSource = new MatTableDataSource<JobElement>(
      this.jobService.getAllJobs()
    );
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    // Implement the logic to open the job details page
    console.log('Opening job details for:', jobId);
    this._router.navigate(['/job-details', jobId]);
  }
}
