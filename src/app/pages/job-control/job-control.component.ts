import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  JobDataControlElement,
  JobsDataService,
} from '../../jobs-data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-control',
  standalone: false,
  templateUrl: './job-control.component.html',
  styleUrl: './job-control.component.scss',
})
export class JobControlComponent {
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
  dataSource!: MatTableDataSource<any>;
  displayedColumns: any[] = [
    'jobControlId',
    'jobControlName',
    'jobControlDescription',
    'obsfucationControlId',
    'lastTriggeredOn',
    'actions',
  ];
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

    this.dataSource = new MatTableDataSource<any>(
      this._jobDataService.getAllJobControlData()
    );
  }

  createJob() {
    this.drawer.close();
    this.router.navigate(['/dashboard/job-details/RUN-98765']);
  }

  runJob(jobControlId: string) {
    // Start the sequential update process
    this._jobDataService.updateTasksSequentially(jobControlId).subscribe(
      (updatedJob) => {
        if (updatedJob) {
          // // Update the component's job details reference
          // this.jobDetails = updatedJob;

          // // Update the data source to reflect changes in the UI
          // this.dataSource.data = [...updatedJob.tasks];

          // // Force change detection if needed
          // this.changeDetectorRef.detectChanges();
          console.log('Updated job:', updatedJob);
        }
      },
      (error) => console.error('Error updating tasks:', error),
      () => console.log('Sequential task updates completed')
    );
  }
}
