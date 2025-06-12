// Component file: obfuscation-plan.component.ts
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsDataService } from '../../jobs-data.service';

@Component({
  selector: 'app-obfuscation-plan',
  templateUrl: './obfuscation-plan.component.html',
  styleUrls: ['./obfuscation-plan.component.scss'],
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
export class ObfuscationPlan implements OnInit, AfterViewInit {
  expandedElement: any | null = null;
  isConnected = false;
  columnsToDisplayWithExpand = [
    'expand',
    'obsControlId',
    'obsControlName',
    'obsControlDescription',
    'createdBy',
  ];
  dataSource!: MatTableDataSource<any>;
  public currentDomain: string = 'utility';

  constructor(
    private _dialog: MatDialog,
    private obsfucationService: ObsfucationService,
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
        this.obsfucationService.getAllHealthcareObfuscation()
      );
    } else {
      this.dataSource = new MatTableDataSource<any>(
        this.obsfucationService.getAllObsfucations()
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
      this.router.navigate([
        `/${this.currentDomain}/obfuscation-plan/view-obfuscation`,
      ]);
    }
  }

  createObfuscation() {
    this._toaster.success('Obfuscation Plan created successfully!');
    this.router.navigate([
      `${this.currentDomain}/obfuscation-plan/create-obfuscation`,
    ]);
  }
}
