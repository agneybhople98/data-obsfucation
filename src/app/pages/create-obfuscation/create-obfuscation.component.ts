import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnDefinition,
  ObsfucationService,
  TABLE_DATA,
} from '../../services/obsfucation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-obfuscation',
  standalone: false,
  templateUrl: './create-obfuscation.component.html',
  styleUrl: './create-obfuscation.component.scss',
})
export class CreateObfuscationPlanComponent implements OnInit {
  tableData = TABLE_DATA;
  selectedTable: string | null = null;
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
    'SHA1',
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
    'CI_CUSTOMERS',
    'CI_ORDERS',
    'CI_PER',
    'CI_PER_NAME',
    'CI_PER_PHONE',
    'CI_PER_ADDR_SEAS',
    'CI_PER_ADDR',
  ];

  filteredTableItems = [...this.tableItems];
  searchText = '';

  selectedItem: string | null = 'CI_CUSTOMERS';

  constructor(
    private _obsufactionService: ObsfucationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
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
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
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
}
