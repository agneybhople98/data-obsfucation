import { Component, OnInit, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  TABLE_DATA,
  ColumnDefinition,
} from '../../services/obfusaction-table-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-create-obfuscation',
  standalone: false,
  templateUrl: './create-obfuscation.component.html',
  styleUrl: './create-obfuscation.component.scss',
})
export class CreateObfuscationPlanComponent implements OnInit {
  tableData = TABLE_DATA;
  selectedTable: string | null = null;
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
    'PHONE',
    'MD5',
    'ENG',
    'SHA1',
    'NUMERIC',
    'California',
    'CA',
  ];
  obfStrategies = [
    'STARIFY',
    'RANDOMIZE',
    'FAKER',
    'REPLACE_WITH_CONSTANT',
    'HASH',
  ];
  obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  dataSource = new MatTableDataSource<ColumnDefinition>([]);
  public selection = new SelectionModel<any>(true, []);
  obsControlData: any;

  tableItems = [
    'CI_PER',
    'CI_PER_NAME',
    'CI_PER_PHONE',
    'CI_PER_ADDR_SEAS',
    'C1_ADDRESS',
    'CI_PER_ID',
    'CI_PER_CHAR',
  ];

  filteredTableItems = [...this.tableItems];
  searchText = '';

  selectedItem: string | null = 'CI_PER';

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
    // Extract domain from route parameters
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

    if (this.selectedItem) {
      this.selectItem(this.selectedItem);
    } else {
      this.dataSource.data = [];
    }

    // Initialize with empty data source
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
   * Select an item from the sidebar
   */
  selectItem(item: string) {
    // Update selected item
    this.selectedItem = item;

    // Update selected table
    this.selectedTable = item;

    // Create empty columns based on the selected table structure
    this.createEmptyColumns();

    // Clear existing selections
    this.selection.clear();
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

  isRowDisabledForPerID(row: ColumnDefinition): any {
    if (row.columnName === 'PER_ID') {
      return true;
    }
    return false;
  }

  /**
   * Create empty columns for the selected table
   */
  private createEmptyColumns() {
    if (!this.selectedTable) {
      this.dataSource.data = [];
      return;
    }

    // Find selected table definition to get column structure
    const selectedTableData = this.tableData.tables.find(
      (table) => table.tableName === this.selectedTable
    );

    // Create empty columns based on the structure of the selected table
    if (selectedTableData) {
      // Create new empty columns with the same column names but empty values
      const emptyColumns = selectedTableData.columns.map((column) => {
        return {
          columnName: column.columnName,
          displayName: column.displayName, // Keep display name
          obfStrategy: '', // Empty strategy
          obfRules: {
            first: '', // Empty rules
            second: '', // Empty rules
          },
        } as ColumnDefinition;
      });

      this.dataSource.data = emptyColumns;
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

  valueSelection(): boolean {
    // Prevent selection of PER_ID rows and ensure they're always deselected
    this.selection.selected.forEach((row) => {
      if (row.columnName === 'PER_ID') {
        this.selection.deselect(row);
      }
    });
    return false;
  }

  navigateTo() {
    this.router.navigate([`${this.currentDomain}/obfuscation-plan`]);
  }
}
