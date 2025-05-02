import { Component, OnInit, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  ObfusactionTableDataService,
  ColumnDefinition,
  TABLE_DATA,
} from '../../services/obfusaction-table-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-view-obfuscation',
  templateUrl: './view-obfuscation.component.html',
  styleUrl: './view-obfuscation.component.scss',
  standalone: false,
})
export class ViewObfuscationPlanComponent implements OnInit {
  tableData = TABLE_DATA;
  selectedTable = this.tableData.selectedTable;
  currentDomain: string = 'utility';

  displayedColumns: string[] = [
    'select',
    'columnName',
    'obfStrategy',
    'obfRules',
  ];
  obsRules = [
    'R',
    'L',
    'ALPHA',
    'EMAIL',
    'SSN',
    'ADDRESS',
    'Delivered',
    'FULL_NAME',
    'ENG',
    'PHONE',
    'NUMERIC',
    'MD5',
    'SHA1',
  ];
  obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  obfStrategies = [
    'STARIFY',
    'RANDOMIZE',
    'FAKER',
    'REPLACE_WITH_CONSTANT',
    'HASH',
  ];

  dataSource = new MatTableDataSource<ColumnDefinition>([]);
  // public dataSource: any;
  // public obsStrategies = ['Starify', 'Hashing', 'Faker'];
  // public obsRulesOptions = ['Left', 'Right', 'Type', 'Date'];
  // public obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public selection = new SelectionModel<any>(true, []);
  obsControlData: any;

  tableItems = [
    'CI_PER',
    'CI_PER_NAME',
    'CI_PER_PHONE',
    'CI_PER_ADDR_SEAS',
    'CI_PER_ADDR',
  ];

  filteredTableItems = [...this.tableItems];
  searchText = '';

  selectedItem: string | null = null;

  constructor(
    private _obsufactionService: ObsfucationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  toggleAllRows() {
    if (this.isAllSelected()) {
      // Clear all selections when unchecking
      this.selection.clear();
      return;
    }

    // Select all rows except PER_ID when checking
    this.dataSource.data.forEach((row) => {
      if (row.columnName !== 'PER_ID') {
        this.selection.select(row);
      }
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ColumnDefinition): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.columnName + 1
    }`;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // Count only non-PER_ID rows for total
    const totalRows = this.dataSource.data.filter(
      (row) => row.columnName !== 'PER_ID'
    ).length;
    const numSelected = this.selection.selected.filter(
      (row) => row.columnName !== 'PER_ID'
    ).length;
    return numSelected === totalRows;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
      }
    });

    // Also listen to parent route parameters (for nested routes)
    this.route.parent?.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
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

    this.onTableChange();
    // Check rows that have all required values
    this.dataSource.data.forEach((row: ColumnDefinition) => {
      if (row.columnName && row.obfStrategy && row.obfRules?.first) {
        this.selection.select(row);
      }
    });
  }

  // Extract domain from URL
  private detectDomainFromUrl(): void {
    const urlPath = this.router.url;
    const segments = urlPath.split('/').filter((segment) => segment);

    if (segments.length > 0) {
      const potentialDomain = segments[0];
      if (['healthcare', 'utility'].includes(potentialDomain)) {
        this.currentDomain = potentialDomain;
      }
    }
  }

  /**
   *
   * @param element
   * @returns Disabled state of the dropdown for unselected row
   */

  isDropdownDisabled(element: any): boolean {
    // Always disable dropdowns for PER_ID rows, regardless of selection state
    if (element.columnName === 'PER_ID') {
      return true;
    }
    // For other rows, enable dropdowns only when selected
    return !this.selection.isSelected(element);
  }

  /**
   * Handle table selection change from dropdown
   */
  onTableChange() {
    // Update selected item in sidebar to keep UI in sync
    if (this.selectedTable) {
      this.selectedItem = this.selectedTable;
    }

    // Update table data
    this.updateTableData();
  }

  selectItem(item: string) {
    // Update selected item
    this.selectedItem = item;

    // Update selected table in dropdown
    this.selectedTable = item;

    // Update table data
    this.updateTableData();

    // Clear existing selections
    this.selection.clear();

    // Check rows that have all required values
    this.dataSource.data.forEach((row: ColumnDefinition) => {
      if (row.columnName && row.obfStrategy && row.obfRules?.first) {
        this.selection.select(row);
      }
    });
  }

  isRowDisabledForPerID(row: ColumnDefinition): any {
    if (row.columnName === 'PER_ID') {
      return true;
    }
    return false;
  }

  valueSelection(): boolean {
    // Prevent selection of PER_ID rows and ensure they're always deselected
    this.selection.selected.forEach((row) => {
      if (row.columnName === 'PER_ID') {
        this.selection.deselect(row);
      }
    });
    return false;
  }

  /**
   * Update the table data based on selection
   */
  private updateTableData() {
    if (!this.selectedTable) return;

    // Find selected table definition
    const selectedTableData = this.tableData.tables.find(
      (table) => table.tableName === this.selectedTable
    );

    // Update data source if table found
    if (selectedTableData) {
      this.dataSource.data = selectedTableData.columns;
    } else {
      this.dataSource.data = [];
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
