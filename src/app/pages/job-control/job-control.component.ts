import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  JobDataControlElement,
  JobsDataService,
} from '../../jobs-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-control',
  standalone: false,
  templateUrl: './job-control.component.html',
  styleUrl: './job-control.component.scss',
})
export class JobControlComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  isConnected = false;
  obsControlOptions = [
    'OC-98675',
    'OC-98674',
    'OC-98674',
    'OC-98673',
    'OC-98672',
    'OC-98671',
  ];
  selectedObsControl = 'OC-98675'; // Default selected value
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
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
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

    this.dataSource = new MatTableDataSource<any>(
      this._jobDataService.getAllJobControlData()
    );
  }

  ngOnDestroy() {
    // Clean up subscription
    this.subscription.unsubscribe();
  }

  createJob() {
    this.drawer.close();
    this.router.navigate(['/dashboard/job-details/RUN-98765']);
  }

  runJob(jobControlId: string) {
    const jobId = jobControlId.startsWith('JC-')
      ? 'RUN-' + jobControlId.substring(3)
      : jobControlId;
    this.router.navigate(['/dashboard/job-details', jobId]);
    this._jobDataService.runJobByName().subscribe((res) => {
      console.log('Job run response:', res);
    });

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
}
