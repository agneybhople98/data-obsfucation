import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JobsDataService } from '../../jobs-data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
// import { Subse } from '../../services/obsfucation.service';
import { SubsetService } from '../../services/subset.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-subset-plan',
  templateUrl: './subset-plan.component.html',
  styleUrl: './subset-plan.component.scss',
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
export class SubsetPlanComponent {
  expandedElement: any | null = null;
  selectedSubSetStrategy = 'Condition'; // Default selected value

  subsetStrategies = ['Condition', 'Percentage of rows', 'Date ranges'];
  percentageStrategies = ['Number of rows with limit 25%'];
  selectedPercentStrategy = 'Number of rows with limit 25%';
  isConnected = false;
  defaultDateFirst = new Date(2025, 4, 5); // Months are 0-indexed: 4 = May
  defaultDateSecond = new Date(2025, 9, 5); // Months are 0-indexed: 4 = May

  columnsToDisplayWithExpand = [
    'expand',
    'obsControlId',
    'obsControlName',
    'obsControlDescription',
    'createdBy',
  ];
  dataSource!: MatTableDataSource<any>;
  public currentDomain: string = 'utility';

  selectedConditionOn = 'ID_TYPE_CD';
  conditionOn = ['ID_TYPE_CD'];

  conditions = ['=', '<', '>', '>=', '<='];
  selectedCondition = '=';

  valueList = ['SSN'];
  selectedValue = 'SSN';

  constructor(
    private _dialog: MatDialog,
    private subsetService: SubsetService,
    public router: Router,
    private _jobDataService: JobsDataService,
    private _toaster: ToastrService,
    private _route: ActivatedRoute
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.currentDomain = params['domain'] || 'utility';
    });
    if (this.currentDomain === 'healthcare') {
      this.dataSource = new MatTableDataSource<any>(
        this.subsetService.getAllHealthcareObfuscation()
      );
    } else {
      this.dataSource = new MatTableDataSource<any>(
        this.subsetService.getAllObsfucations()
      );
    }
  }

  openCreateObsfucation(element: any) {
    const allJobData = this._jobDataService.getAllJobControlData();

    const obsControlData = allJobData.find(
      (job) => job.obsfucationControlId === element.obsControlName
    );

    if (obsControlData) {
      this.router.navigate(
        [`/${this.currentDomain}/obfuscation-plan/view-obfuscation`],
        {
          state: { data: obsControlData },
          replaceUrl: true,
        }
      );
    } else {
      console.error('No matching obfuscation control data found');
    }
  }

  createObfuscation() {
    this._toaster.success('Obfuscation Plan created successfully!');
    this.router.navigate([`${this.currentDomain}/subset-plan/create-subset`]);
  }
}
