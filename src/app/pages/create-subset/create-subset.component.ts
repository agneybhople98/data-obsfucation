import { Component, OnInit, ViewChild } from '@angular/core';

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
export class CreateSubsetComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedValue = 'Date';
  selectedColumnName = 'PER_ID';
  public dataSource: MatTableDataSource<SubsetElement>;
  filteredTableItems: string[] = [];
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

  tableItemsHealthcare = ['CI_PER', 'CI_ACCOUNTS'];

  // 'CI_PER_NAME',
  // 'CI_PER_PHONE',
  // 'CI_PER_ADDR_SEAS',
  // 'C1_ADDRESS',
  // 'CI_PER_ID',
  // 'CI_PER_CHAR',
  tableItemsUtility = ['CI_PER', 'CI_ACCOUNTS'];

  // 'CI_PER_NAME',
  //   'CI_PER_ADDR_SEAS',
  //   'CI_PER_CONTDET',
  //   'CI_PER_ID',
  //   'CI_PER_CHAR',

  searchText = '';
  selectedItem: string = 'CI_PER';

  get tableItems() {
    return this.currentDomain === 'healthcare'
      ? this.tableItemsHealthcare
      : this.tableItemsUtility;
  }

  subsetStrategies = ['Condition', 'Percentage of Rows'];
  subsetStrategiesDate = ['Date of Ranges'];

  public selection = new SelectionModel<any>(true, []);
  obsControlData: any;

  constructor(
    public subsetDataService: CreateSubsetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<SubsetElement>(
      this.subsetDataService.getAllSubsetData()
    );
  }

  ngOnInit() {
    // First detect the domain from URL
    this.detectDomainFromUrl();

    // Extract domain from route parameters
    this.route.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
        this.loadTableDataBasedOnDomain();
      }
    });

    // Also listen to parent route parameters (for nested routes)
    this.route.parent?.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
        this.loadTableDataBasedOnDomain();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectDomainFromUrl();
      });

    // Get state data from navigation
    this.obsControlData =
      this.router.getCurrentNavigation()?.extras.state?.['data'];

    // If no data in navigation, try to get it from history state
    if (!this.obsControlData) {
      this.obsControlData = history.state.data;
    }

    this.filteredTableItems = [...this.tableItems];

    // Initial table setup
    this.onTableChange();

    // // Check rows that have all required values
    // this.dataSource.data.forEach((row: ColumnDefinition) => {
    //   if (row.columnName && row.obfStrategy && row.obfRules?.first) {
    //     this.selection.select(row);
    //   }
    // });
  }

  // Extract domain from URL
  private detectDomainFromUrl(): void {
    const urlPath = this.router.url;
    const segments = urlPath.split('/').filter((segment) => segment);

    if (segments.length > 0) {
      const potentialDomain = segments[0];
      if (['healthcare', 'utility'].includes(potentialDomain)) {
        if (this.currentDomain !== potentialDomain) {
          this.currentDomain = potentialDomain;
        }
      }
    }
  }

  selectItem(item: string) {
    // Update selected item
    this.selectedItem = item;

    // Update selected table in dropdown
    this.selectedTable = item;

    // Clear existing selections
    this.selection.clear();
  }

  // Load the correct table data based on current domain
  private loadTableDataBasedOnDomain(): void {
    // Set the default selected table if available
    if (this.tableData && this.tableData.selectedTable) {
      this.selectedTable = this.tableData.selectedTable;
    }

    this.filteredTableItems = [...this.tableItems];
  }

  onTableChange() {
    // Update selected item in sidebar to keep UI in sync
    if (this.selectedTable) {
      this.selectedItem = this.selectedTable;
    }
  }

  applySearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchText = searchValue;
    this.filteredTableItems = this.tableItems.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
