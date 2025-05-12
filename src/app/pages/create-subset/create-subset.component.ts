import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import {
  CreateSubsetService,
  SubsetElement,
} from '../../services/create-subset.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

// Define custom date formats (assuming you want MM/DD/YYYY format)
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-subset',
  templateUrl: './create-subset.component.html',
  styleUrl: './create-subset.component.scss',
  standalone: false,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateSubsetComponent {
  selectedValue = 'Date';
  selectedColumnName = 'PER_ID';
  public dataSource: MatTableDataSource<SubsetElement>;
  readonly campaignOne = new FormGroup({
    start: new FormControl(moment([year, month, 13])),
    end: new FormControl(moment([year, month, 16])),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl(moment([year, month, 15])),
    end: new FormControl(moment([year, month, 19])),
  });
  tableData: any;
  expandedElement: any | null = null;
  selectedTable: string = '';
  currentDomain: string = 'utility';
  selectedSubsetStrategy = 'Condition';

  displayedColumns: string[] = [
    'tableName',
    'columnName',
    'subsetStrategiesColumn',
    'subsetRules',
  ];

  subsetStrategies = ['Condition', 'Percentage of Rows'];
  subsetStrategiesDate = ['Date of Ranges'];

  public selection = new SelectionModel<any>(true, []);
  obsControlData: any;

  constructor(public subsetDataService: CreateSubsetService) {
    this.dataSource = new MatTableDataSource<SubsetElement>(
      this.subsetDataService.getAllSubsetData()
    );
    console.log('ths datasource', this.dataSource);
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
