import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
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

  constructor(
    private _router: Router,
    public jobService: JobsDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<JobElement>([]);
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
        this.dataSource.data = jobs;
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
