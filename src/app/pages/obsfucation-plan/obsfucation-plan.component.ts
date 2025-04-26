// Component file: obsfucation-plan.component.ts
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-obsfucation-plan',
  templateUrl: './obsfucation-plan.component.html',
  styleUrls: ['./obsfucation-plan.component.scss'],
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
export class ObsfucationPlan implements OnInit, AfterViewInit {
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

  constructor(
    private _dialog: MatDialog,
    private obsfucationService: ObsfucationService,
    public router: Router
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(
      this.obsfucationService.getAllObsfucations()
    );
  }

  openCreateObsfucation(row: any) {
    this.router.navigate(['/obsfucation-plan/view-obsfucation'], {
      state: { data: row },
    });
  }
}
