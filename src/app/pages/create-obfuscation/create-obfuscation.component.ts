import { Component, OnInit, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import {
  TABLE_DATA_HEATLHCARE,
  ColumnDefinition,
  TABLE_DATA_UTILITY,
} from '../../services/create-data-table.service';

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
import { LlmService } from '../../llm.service';

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
  selectedTable: string = '';
  currentDomain: string = 'utility';
  public loading: boolean = false;

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

  // dropdown for utility if CI_PER_CONTDET for ADHOC_CHAR_VAL

  obfValues_UTILITY_CI_PER_CONTDET = [
    'HOMEPHONE',
    'CELLPHONE',
    'PRIMARYEMAIL',
    'SECONDARYEMAIL',
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
  autoFilled: boolean = false;

  constructor(
    private _obsufactionService: ObsfucationService,
    private router: Router,
    private route: ActivatedRoute,
    private llmService: LlmService
  ) {}

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ColumnDefinition): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.columnName + 1
    }`;
  }

  isAllSelected() {
    // Determine which rows should be counted based on LLM application status
    const selectableRows = this.dataSource.data.filter((row) => {
      if (row.columnName === 'PER_ID' && !this.autoFilled) {
        return false; // Exclude PER_ID if LLM hasn't been applied
      }
      return true; // Include all other rows, and PER_ID if LLM has been applied
    });

    const totalRows = selectableRows.length;
    const numSelected = this.selection.selected.length;
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
    // If PER_ID and LLM recommendations haven't been applied, disable it
    if (element.columnName === 'PER_ID' && !this.autoFilled) {
      return true;
    }
    // If PER_ID and LLM recommendations have been applied, enable it when selected
    if (element.columnName === 'PER_ID' && this.autoFilled) {
      return !this.selection.isSelected(element);
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
      // Enable PER_ID row if LLM recommendations have been applied
      return !this.autoFilled;
    }
    return false;
  }

  isPerChecked(row: ColumnDefinition): any {
    if (this.currentDomain === 'utility') {
      if (row.columnName === 'CHAR_VAL') {
        return true;
      }
      if (row.columnName === 'ADHOC_CHAR_VAL') {
        return true;
      }
    }

    return false;
  }

  valueSelection(): boolean {
    // Only prevent selection of PER_ID rows if LLM recommendations haven't been applied
    if (!this.autoFilled) {
      this.selection.selected.forEach((row) => {
        if (row.columnName === 'PER_ID') {
          this.selection.deselect(row);
        }
      });
    }
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
      // Store the current selections before updating dataSource
      const previouslySelectedColumns = this.selection.selected.map(
        (row) => row.columnName
      );

      // Update the dataSource with new data
      this.dataSource.data = selectedTableData.columns;

      // Clear current selections
      this.selection.clear();

      // Restore selections based on column names and obfuscation strategy
      setTimeout(() => {
        this.dataSource.data.forEach((row: ColumnDefinition) => {
          // Re-select rows that:
          // 1. Were previously selected, OR
          // 2. Have obfuscation strategy set (from LLM recommendations)
          // 3. Now include PER_ID if LLM recommendations have been applied
          const wasPreviouslySelected = previouslySelectedColumns.includes(
            row.columnName
          );
          const hasObfuscationStrategy =
            row.obfStrategy && row.obfStrategy.trim() !== '';

          // Include PER_ID in selection logic if LLM recommendations have been applied
          const shouldSelect = wasPreviouslySelected || hasObfuscationStrategy;

          if (shouldSelect) {
            // If it's PER_ID, only select it if LLM recommendations have been applied
            if (row.columnName === 'PER_ID' && !this.autoFilled) {
              return; // Don't select PER_ID if LLM hasn't been applied
            }
            this.selection.select(row);
          }
        });
      }, 0);
    } else {
      this.dataSource.data = [];
      this.selection.clear();
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

  toggleAllRows() {
    if (this.isAllSelected()) {
      // Clear all selections when unchecking
      this.selection.clear();
      return;
    }

    // Select all rows when checking
    this.dataSource.data.forEach((row) => {
      // If LLM recommendations haven't been applied, exclude PER_ID
      if (!this.autoFilled && row.columnName === 'PER_ID') {
        return; // Skip PER_ID if LLM hasn't been applied
      }
      // Otherwise, select all rows including PER_ID (if LLM applied)
      this.selection.select(row);
    });
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

  private strategyMapping: { [key: string]: string } = {
    Starify: 'STARIFY',
    Randomize: 'RANDOMIZE',
    Faker: 'FAKER',
    ReplaceWithConstant: 'REPLACE_WITH_CONSTANT',
    Hashing: 'HASH',
  };

  askLLM(): void {
    const userPrompt = `/no_think System Prompt : 

You are a data privacy and compliance expert with deep knowledge of HIPAA, GDPR, and PCI-DSS.
Your task is to identify sensitive columns in database schemas and suggest the most appropriate
data obfuscation function for each sensitive column.

Obfuscation functions available:
1. Starify → Mask part of the value with '*', e.g., "john.doe@gmail.com" → "j***@gmail.com".
2. Randomize → Replace with a random but valid value of the same type/format.
3. Faker → Replace with a realistic fake value (name, email, phone, address, etc.).
4. ReplaceWithConstant → Replace with a fixed placeholder value (e.g., "XXXX").
5. Hashing → Irreversibly hash the value (used for identifiers, SSN, card numbers).

Rules:
- Consider HIPAA, GDPR, PCI regulations when determining sensitive data.
- Sensitive columns include personally identifiable information (PII), protected health information (PHI), and payment card data.
- Always return output in valid JSON format. Do not include explanations outside JSON.

JSON response format:
{
  "recommendations": [
    {
      "table": "<table_name>",
      "column": "<column_name>",
      "is_sensitive": true/false,
      "recommended_function": "<Starify|Randomize|Faker|ReplaceWithConstant|Hashing>"
    }
  ]
}

User Prompt : 

Here is my database schema with tables and columns.
Identify sensitive columns as per HIPAA, GDPR, and PCI,
and suggest an appropriate obfuscation function for each column.

Schema:
Table: CI_PER. Columns: PER_ID, LANGUAGE_CD, PER_OR_BUS_FLG, LS_SL_FLG, LS_SL_DESCR, EMAILID, OVRD_MAIL_NAME1, OVRD_MAIL_NAME2, OVRD_MAIL_NAME3, ADDRESS1
Table: CI_PER_NAME. Columns: PER_ID, SEQ_NUM, ENTITY_NAME, NAME_TYPE_FLG, VERSION, PRIM_NAME_SW, ENTITY_NAME_UPR
Table: CI_PER_ADDR_SEAS. Columns: PER_ID, SEQ_NUM, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, CITY, NUM1, NUM2, COUNTY
Table: CI_PER_CONTDET. Columns: C1_CONTACT_ID, CONTACT_VALUE, PER_ID, COMM_RTE_TYPE_CD, CONTACT_VALUE, CND_PRIMARY_FLAG, CONTACT_VALUE_EXT, DND_START_TM, DND_END_TM, CND_VERIFY_STATUS_FLAG
Table: CI_PER_ID. Columns: PER_ID, ID_TYPE_CD, PER_ID_NBR, PRIM_SW, VERSION, ENCR_PER_ID_NBR, HASH_PER_ID_NBR
Table: CI_PER_CHAR. Columns: PER_ID, CHAR_TYPE_CD, CHAR_VAL, EFFDT, ADHOC_CHAR_VAL, VERSION, CHAR_VAL_FK1, CHAR_VAL_FK2, CHAR_VAL_FK3, CHAR_VAL_FK4
`;

    this.loading = true;
    this.llmService.askLLM(userPrompt).subscribe({
      next: (response) => {
        console.log(
          'LLM Response:(for personal use)',
          response.choices[0].message.content
        );

        try {
          // Extract JSON from the response (handle <think> tags or other text)
          const responseContent = response.choices[0].message.content;
          const jsonMatch = responseContent.match(/```json\s*([\s\S]*?)\s*```/);

          let jsonString = '';
          if (jsonMatch && jsonMatch[1]) {
            // If JSON is wrapped in code blocks
            jsonString = jsonMatch[1].trim();
          } else {
            // Try to find JSON object directly
            const jsonStart = responseContent.indexOf('{');
            const jsonEnd = responseContent.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
              jsonString = responseContent.substring(jsonStart, jsonEnd + 1);
            } else {
              throw new Error('No valid JSON found in response');
            }
          }

          // Parse the extracted JSON
          const llmResponse = JSON.parse(jsonString);

          // Apply recommendations to current table data
          this.applyLLMRecommendations(llmResponse.recommendations);

          this.loading = false;
        } catch (error) {
          console.error('Error parsing LLM response:', error);

          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error from LLM:', error);
        this.loading = false;
      },
    });
  }

  // Add this new method to apply LLM recommendations
  private applyLLMRecommendations(recommendations: any[]): void {
    if (!this.tableData || !this.tableData.tables) {
      console.warn('No table data available to apply recommendations');
      return;
    }

    // Clear all existing selections first
    this.selection.clear();

    // Apply recommendations to ALL tables in tableData
    this.tableData.tables.forEach((table: any) => {
      // Filter recommendations for the current table being processed
      const currentTableRecommendations = recommendations.filter(
        (rec) => rec.table === table.tableName
      );

      if (currentTableRecommendations.length === 0) {
        console.warn(`No recommendations found for table: ${table.tableName}`);
        return;
      }

      // Apply recommendations to each column in the current table
      table.columns.forEach((column: ColumnDefinition) => {
        const recommendation = currentTableRecommendations.find(
          (rec) => rec.column === column.columnName && rec.is_sensitive === true
        );

        if (recommendation) {
          // Map the LLM recommendation to your strategy values
          const mappedStrategy =
            this.strategyMapping[recommendation.recommended_function];

          if (mappedStrategy) {
            // Update the obfuscation strategy for this specific column
            column.obfStrategy = mappedStrategy;
            this.autoFilled = true;

            // Set default rules based on strategy and column
            this.setDefaultRulesForStrategy(column, mappedStrategy);
          }
        } else {
          // Clear strategy for columns not in recommendations or not sensitive
          column.obfStrategy = '';
          if (column.obfRules) {
            column.obfRules.first = '';
            column.obfRules.second = '';
          }
        }
      });
    });

    // If there's a currently selected table, update the dataSource and selections
    if (this.selectedTable) {
      this.updateTableData();

      // After updating table data, select rows that have recommendations
      setTimeout(() => {
        this.dataSource.data.forEach((row: ColumnDefinition) => {
          // Now include PER_ID in selection since LLM recommendations have been applied
          if (row.obfStrategy && row.obfStrategy.trim() !== '') {
            this.selection.select(row);
          }
        });

        // Force table to refresh and detect changes
        this.dataSource._updateChangeSubscription();
      }, 0);
    }
  }

  private setDefaultRulesForStrategy(
    row: ColumnDefinition,
    strategy: string
  ): void {
    // Initialize obfRules if not exists
    if (!row.obfRules) {
      row.obfRules = { first: '', second: '' };
    }

    // Set default rules based on strategy and column type
    switch (strategy) {
      case 'FAKER':
        if (
          row.columnName.includes('NAME') ||
          row.columnName.includes('ENTITY_NAME')
        ) {
          row.obfRules.first = '';
        } else if (row.columnName.includes('EMAIL')) {
          row.obfRules.first = '';
        } else if (row.columnName.includes('ADDRESS')) {
          row.obfRules.first = '';
        } else if (
          row.columnName.includes('PHONE') ||
          row.columnName.includes('CONTACT')
        ) {
          row.obfRules.first = '';
        } else {
          row.obfRules.first = ''; // Default
        }
        row.obfRules.second = '';
        break;

      case 'HASH':
        row.obfRules.first = ''; // or 'SHA1'
        row.obfRules.second = '';
        break;

      case 'STARIFY':
        row.obfRules.first = ''; // Left preserve
        row.obfRules.second = ''; // Preserve 2 characters
        break;

      case 'RANDOMIZE':
        row.obfRules.first = '';
        row.obfRules.second = '';
        break;

      case 'REPLACE_WITH_CONSTANT':
        row.obfRules.first = '';
        row.obfRules.second = '';
        break;

      default:
        row.obfRules.first = '';
        row.obfRules.second = '';
        break;
    }
  }
}
