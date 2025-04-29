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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-control',
  standalone: false,
  templateUrl: './job-control.component.html',
  styleUrl: './job-control.component.scss',
})
export class JobControlComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  public jobControlDetails: any;
  public isHidden: boolean = true;
  isConnected = false;
  obsControlOptions = [
    'Utility Account Obfuscation',
    'Financial Data Masking',
    'Person Entity Anonymization',
    'Field Activity Data Obfuscation',
    'Billing & Financial History',
    'Support Interaction Data Masking',
    'Outage Data Anonymization',
  ];
  selectedObsControl = 'Utility Account Obfuscation'; // Default selected value
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
    private router: Router,
    private _toasterService: ToastrService
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
    // this.router.navigate(['/dashboard/job-details/RUN-98765']);
    this.router.navigate(['/job-control-list']);
    this._toasterService.success('Job Control created successfully!');
  }

  runJob(jobControlId: string) {
    const jobId = jobControlId.startsWith('JC-')
      ? 'RUN-' + jobControlId.substring(3)
      : jobControlId;
    this.router.navigate(['/dashboard/job-details', jobId]);

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

  runAPI() {
    this._jobDataService.runJobByName().subscribe((res) => {
      console.log('res', res);
    });
    this._toasterService.success('Job Control created successfully!');
  }

  openCreateObsfucation(element: any) {
    // Get the obfuscation control data from the service
    const allJobData = this._jobDataService.getAllJobControlData();

    const obsControlData = allJobData.find(
      (job) => job.obsfucationControlId === element.obsfucationControlId
    );

    if (obsControlData) {
      // Use location.href to ensure state is preserved
      this.router.navigate(['/obfuscation-plan/view-obfuscation'], {
        state: { data: obsControlData },
        replaceUrl: true,
      });
    } else {
      console.error('No matching obfuscation control data found');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (
      data: JobDataControlElement,
      filter: string
    ) => {
      return (
        data.jobControlId.toLowerCase().includes(filter) ||
        data.jobControlName.toLowerCase().includes(filter) ||
        data.jobControlDescription.toLowerCase().includes(filter) ||
        data.obsfucationControlId.toLowerCase().includes(filter)
      );
    };
  }

  openDrawer(element: any, isHidden?: boolean) {
    this.isHidden = false;
    this.jobControlDetails = element;
    this.drawer.open();
  }

  openJobControlDrawer() {
    this.drawer.open();
    this.isHidden = true;
  }
}
