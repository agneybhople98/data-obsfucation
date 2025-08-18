import { Component, OnInit, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  ObfusactionTableDataService,
  ColumnDefinition,
  TABLE_DATA_UTILITY,
  TABLE_DATA_HEATLHCARE,
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
  selector: 'app-view-obfuscation',
  templateUrl: './view-obfuscation.component.html',
  styleUrl: './view-obfuscation.component.scss',
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
export class ViewObfuscationPlanComponent implements OnInit {
  tableData: any;
  expandedElement: any | null = null;
  selectedTable: string = '';
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
    'Y',
    'FIRSTNAME',
    'ALPHA',
    'EMAIL',
    'SSN',
    'ADDRESS',
    'Delivered',
    'FULL_NAME',
    'PHONE',
    'MD5',
    'SHA1',
    'ENG',
    'NUMERIC',
    'California',
    'DATE',
    'CA',
    'F',
  ];
  obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  obfStrategies = [
    'STARIFY',
    'RANDOMIZE',
    'FAKER',
    'REPLACE_WITH_CONSTANT',
    'HASH',
  ];
  operators = ['=', '<', '>', '=>', '<='];

  obfValues_GENERAL = [
    'CM-GENDR',
    'CMFNAME',
    'CMMNAME',
    'CMLNAME',
    'C2MBTHDT',
    'SSN',
  ];

  // dropdown for utility if CI_PER_ID is for this PER_ID_NBR

  obfValues_UTILITY_CI_PER_ID_FOR_PER_ID_NBR = [
    'CIF',
    'DL',
    'PIN',
    'SSN',
    'DNI',
    'EIN',
  ];

  // dropdown for utility if CI_PER_CHAR for CHAR_VAL

  obfValues_UTILITY_CI_PER_CHAR_CHAR_VAL = ['C2M_SNR', 'C2M_SVRT'];

  // dropdown for utility if CI_PER_CHAR for ADHOC_CHAR_VAL

  obfValues_UTILITY_CI_PER_CHAR_ADHOC_CHAR_VAL = ['C2MBTHDT'];

  // dropdown for utility if CI_PER_CONTDET for ADHOC_CHAR_VAL

  obfValues_UTILITY_CI_PER_CONTDET = [
    'HOMEPHONE',
    'CELLPHONE',
    'PRIMARYEMAIL',
    'SECONDARYEMAIL',
  ];

  // dropdown for healthcare if CI_PER_CHAR for CHAR_VAL

  obfValues_HEALTHCARE_CI_PER_CHAR_CHAR_VAL = [
    'CM-GENDR',
    'CMNMPFX ',
    'CMMRCODT',
    'C1TOBCC ',
    'CMNMSFX ',
    'CMPYRLLC',
    'CMLECLSS',
  ];

  // dropdown for healthcare if CI_PER_CHAR for ADHOC_CHAR_VAL

  obfValues_HEALTHCARE_CI_PER_CHAR_ADHOC_CHAR_VAL = [
    'CMFNAME',
    'CMLNAME',
    'CMMNAME',
  ];

  conditions = [
    'COMM_RTE_TYPE_CD',
    'CHAR_TYPE_CD',
    'CI_PER_CHAR',
    'CHAR_VAL',
    'EFFDT',
    'ADHOC_CHAR_VAL',
    'VERSION',
    'ID_TYPE_CD',
    'CHAR_VAL_FK1',
    'CHAR_VAL_FK2',
    'CHAR_VAL_FK3',
    'CHAR_VAL_FK5',
    'SRCH_CHAR_VAL',
  ];

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

  get tableItems() {
    return this.currentDomain === 'healthcare'
      ? this.tableItemsHealthcare
      : this.tableItemsUtility;
  }

  filteredTableItems: string[] = [];
  searchText = '';
  selectedItem: string | null = null;
  hideButton = true;

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

    // Check rows that have all required values
    this.dataSource.data.forEach((row: ColumnDefinition) => {
      if (row.columnName && row.obfStrategy && row.obfRules?.first) {
        this.selection.select(row);
      }
    });
  }

  // Load the correct table data based on current domain
  private loadTableDataBasedOnDomain(): void {
    if (this.currentDomain === 'utility') {
      this.tableData = TABLE_DATA_UTILITY;
    } else if (this.currentDomain === 'healthcare') {
      this.tableData = TABLE_DATA_HEATLHCARE;
    }

    // Set the default selected table if available
    if (this.tableData && this.tableData.selectedTable) {
      this.selectedTable = this.tableData.selectedTable;
    }

    // Update filtered items based on current domain
    this.filteredTableItems = [...this.tableItems];

    // Update table data if a table is already selected
    if (this.selectedTable) {
      this.updateTableData();
    }
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

  isPerChecked(row: ColumnDefinition): any {
    if (this.currentDomain === 'utility') {
      if (row.columnName === 'CHAR_VAL') {
        console.log('row columnnane', row.columnName);
        return true;
      }
      if (row.columnName === 'ADHOC_CHAR_VAL') {
        console.log('row columnnane', row.columnName);
        return true;
      }
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
      (table: any) => table.tableName === this.selectedTable
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

  navigateTo() {
    this.router.navigate([`${this.currentDomain}/obfuscation-plan`]);
  }

  // Methods for handling options (add/remove)
  addOption(element: any) {
    // If this is the first option being added, initialize the options array if needed
    if (!element.options) {
      element.options = [];
    }

    // Add a new empty option
    const newOption: any = {
      selectedOnCondition: 'CHAR_TYPE_CD',
      selectedOperator: '=',
      selectedValue: 'CMLNAME',
      selectedObfStrategy: 'FAKER',
      selectedObfRule: 'FIRSTNAME',
      inputValue: '',
      isEditing: false, // New property to track edit state
    };

    element.options.push(newOption);

    // Make the previous options non-editable by default
    if (element.options.length > 0) {
      // Set the previous option to be in non-editing mode
      element.options[element.options.length - 1].isEditing = true;
    }
  }

  // Remove an option at the specified index
  removeOption(element: any, index: number) {
    if (element.options && index >= 1 && index < element.options.length) {
      element.options.splice(index, 1);
    }
  }

  // Toggle edit mode for an option
  toggleEditOption(option: any) {
    option.isEditing = !option.isEditing;
  }

  // Check if an option is the last one in the list (for showing add button)
  isLastOption(element: any, index: number): boolean {
    return element.options && index === element.options.length - 1;
  }

  // Check if fields should be disabled based on editing state
  isFieldDisabled(option: any): boolean {
    return !option.isEditing;
  }
  // get dropdown options

  // Add this function to your component class
  getDropdownOptions(tableName: string, columnName: string): string[] {
    let options = this.obfValues_GENERAL;

    // For healthcare domain
    if (this.currentDomain === 'healthcare') {
      if (tableName === 'CI_PER_CHAR') {
        if (columnName === 'CHAR_VAL') {
          options = this.obfValues_HEALTHCARE_CI_PER_CHAR_CHAR_VAL;
        } else if (columnName === 'ADHOC_CHAR_VAL') {
          options = this.obfValues_HEALTHCARE_CI_PER_CHAR_ADHOC_CHAR_VAL;
        }
      }
      if (tableName === 'CI_PER_ID' && columnName === 'PER_ID_NBR') {
        options = this.obfValues_UTILITY_CI_PER_ID_FOR_PER_ID_NBR;
      }
    }

    // For utility domain
    else if (this.currentDomain === 'utility') {
      if (tableName === 'CI_PER_ID' && columnName === 'PER_ID_NBR') {
        options = this.obfValues_UTILITY_CI_PER_ID_FOR_PER_ID_NBR;
      }
      if (tableName === 'CI_PER_CONTDET' && columnName === 'CONTACT_VALUE') {
        options = this.obfValues_UTILITY_CI_PER_CONTDET;
      } else if (tableName === 'CI_PER_CHAR') {
        if (columnName === 'CHAR_VAL') {
          options = this.obfValues_UTILITY_CI_PER_CHAR_CHAR_VAL;
        } else if (columnName === 'ADHOC_CHAR_VAL') {
          options = this.obfValues_UTILITY_CI_PER_CHAR_ADHOC_CHAR_VAL;
        }
      }
    }

    return options;
  }
}
