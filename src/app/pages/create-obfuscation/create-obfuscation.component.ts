import { Component, OnInit, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  TABLE_DATA_HEATLHCARE,
  ColumnDefinition,
  TABLE_DATA_UTILITY,
} from '../../services/obfusaction-table-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-create-obfuscation',
  standalone: false,
  templateUrl: './create-obfuscation.component.html',
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
  styleUrl: './create-obfuscation.component.scss',
})
export class CreateObfuscationPlanComponent implements OnInit {
  tableData: any;
  expandedElement: any | null = null;
  selectedTable: string | null = null;
  currentDomain: string = 'utility';
  displayedColumns: string[] = [
    'expand',
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

  conditions = [
    'CHAR_TYPE_CD',
    'CI_PER_CHAR',
    'CHAR_VAL',
    'EFFDT',
    'ADHOC_CHAR_VAL',
    'VERSION',
    'CHAR_VAL_FK1',
    'CHAR_VAL_FK2',
    'CHAR_VAL_FK3',
    'CHAR_VAL_FK5',
    'SRCH_CHAR_VAL',
  ];

  operators = ['=', '<', '>', '=>', '<='];

  dataSource = new MatTableDataSource<ColumnDefinition>([]);
  public selection = new SelectionModel<any>(true, []);
  obsControlData: any;

  tableItemsHealthcare = [
    'CI_PER',
    'CI_PER_NAME',
    'CI_PER_PHONE',
    'CI_PER_ADDR_SEAS',
    'C1_ADDRESS',
    'CI_PER_ID',
    'CI_PER_CHAR',
  ];
  tableItemsUtility = [
    'CI_PER',
    'CI_PER_NAME',
    'CI_PER_ADDR_SEAS',
    'CI_PER_CONTDET',
    'CI_PER_ID',
    'CI_PER_CHAR',
  ];

  obfValues = [
    'CM-GENDR',
    'CMFNAME',
    'CMMGRIND',
    'CMNMPFX',
    'CMMNAME',
    'CMMRCODT',
    'C1TOBCC',
    'CMNMSFX',
    'CMPYRLLC',
    'CMLECLSS',
    'CMLNAME',
  ];

  get tableItems() {
    return this.currentDomain === 'healthcare'
      ? this.tableItemsHealthcare
      : this.tableItemsUtility;
  }

  filteredTableItems: string[] = [];
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
      console.log('rw', row);
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

    // Listen to navigation events to detect domain changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const prevDomain = this.currentDomain;
        this.detectDomainFromUrl();

        // Only reload if domain actually changed
        if (prevDomain !== this.currentDomain) {
          this.loadTableDataBasedOnDomain();
        }
      });

    // Get state data from navigation
    this.obsControlData =
      this.router.getCurrentNavigation()?.extras.state?.['data'];

    // If no data in navigation, try to get it from history state
    if (!this.obsControlData) {
      this.obsControlData = history.state.data;
    }

    // Initialize table data if we have a selected item
    if (this.selectedItem) {
      this.selectItem(this.selectedItem);
    } else {
      this.dataSource.data = [];
    }
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

  // Load the correct table data based on current domain
  private loadTableDataBasedOnDomain(): void {
    if (this.currentDomain === 'utility') {
      this.tableData = TABLE_DATA_UTILITY;
    } else if (this.currentDomain === 'healthcare') {
      this.tableData = TABLE_DATA_HEATLHCARE;
    } else {
      // If domain is not recognized, default to utility
      this.currentDomain = 'utility';
      this.tableData = TABLE_DATA_UTILITY;
    }

    // Set the default selected table if available
    if (this.tableData && this.tableData.selectedTable) {
      this.selectedTable = this.tableData.selectedTable;
      this.selectedItem = this.tableData.selectedTable;
    }

    // Update filtered items based on current domain
    this.filteredTableItems = [...this.tableItems];

    // Update table data if a table is already selected
    if (this.selectedTable) {
      this.updateTableData();
    }
  }

  /**
   * Update the table data based on selection
   */
  private updateTableData() {
    if (!this.selectedTable) return;

    // Find selected table definition
    const selectedTableData = this.tableData?.tables.find(
      (table: any) => table.tableName === this.selectedTable
    );

    // Update data source if table found
    if (selectedTableData) {
      this.dataSource.data = selectedTableData.columns;
    } else {
      this.dataSource.data = [];
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

    // Update table data
    this.updateTableData();

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
    if (!this.selectedTable || !this.tableData) {
      this.dataSource.data = [];
      return;
    }

    // Find selected table definition to get column structure
    const selectedTableData = this.tableData.tables.find(
      (table: any) => table.tableName === this.selectedTable
    );

    // Create empty columns based on the structure of the selected table
    if (selectedTableData) {
      // Create new empty columns with the same column names but empty values
      const emptyColumns = selectedTableData.columns.map(
        (column: any): ColumnDefinition => {
          return {
            columnName: column.columnName,
            displayName: column.displayName,
            obfStrategy: '',
            obfRules: {
              first: '',
              second: '',
            },
            isExpandable: column.columnName === 'ADHOC_CHAR_VAL',
            options: [
              {
                selectedOnCondition: 'CHAR_TYPE_CD',
                selectedOperator: '<',
                selectedValue: 'CMFNAME',
                selectedObfStrategy: 'STARIFY',
                selectedObfRule: 'R',
                inputValue: '3',
              },
            ],
            inputValue: '',
          };
        }
      );

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

  // Methods for handling options (add/remove)
  addOption(element: any) {
    // Add a new empty option
    const newOption: any = {
      selectedOnCondition: 'CHAR_TYPE_CD',
      selectedOperator: '<',
      selectedValue: 'CMLNAME',
      selectedObfStrategy: 'FAKER',
      selectedObfRule: 'LASTNAME',
      inputValue: '',
    };

    element.options.push(newOption);
    // this.hideButton = false;
  }
}
