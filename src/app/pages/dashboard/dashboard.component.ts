import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  jobId: string;
  jobName: any;
  jobDescription: string;
  triggeredOn: string;
  progress: number;
  status: 'success' | 'in-progress' | 'failed';
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    jobId: 'JOB-98765',
    jobName: 'Data Masking - Customer Records',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 08:30:15',
    status: 'success',
    progress: 100,
  },
  {
    jobId: 'JOB-98766',
    jobName: 'Patient Data Anonymization',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 09:45:22',
    status: 'in-progress',
    progress: 45,
  },
  {
    jobId: 'JOB-98767',
    jobName: 'Financial Records Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 10:15:08',
    status: 'failed',
    progress: 50,
  },
  {
    jobId: 'JOB-98768',
    jobName: 'Employee Data Security',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 11:20:33',
    status: 'failed',
    progress: 50,
  },
  {
    jobId: 'JOB-98769',
    jobName: 'Healthcare Records Masking',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 12:05:47',
    status: 'in-progress',
    progress: 75,
  },
  {
    jobId: 'JOB-98770',
    jobName: 'Credit Card Data Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 13:30:12',
    status: 'failed',
    progress: 0,
  },
  {
    jobId: 'JOB-98771',
    jobName: 'Social Security Number Masking',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 14:15:28',
    status: 'in-progress',
    progress: 30,
  },
  {
    jobId: 'JOB-98772',
    jobName: 'Email Address Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 15:40:55',
    status: 'failed',
    progress: 50,
  },
  {
    jobId: 'JOB-98773',
    jobName: 'Phone Number Anonymization',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 16:25:19',
    status: 'success',
    progress: 100,
  },
  {
    jobId: 'JOB-98774',
    jobName: 'Address Data Security',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 17:10:42',
    status: 'failed',
    progress: 50,
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements AfterViewInit {
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
}
