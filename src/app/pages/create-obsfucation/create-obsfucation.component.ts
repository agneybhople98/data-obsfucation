import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnDefinition,
  ObsfucationService,
  TABLE_DATA,
} from '../../services/obsfucation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-create-obsfucation',
  templateUrl: './create-obsfucation.component.html',
  styleUrl: './create-obsfucation.component.scss',
  standalone: false,
})
export class CreateObsfucationComponent implements OnInit {
  tableData = TABLE_DATA;
  selectedTable = this.tableData.selectedTable;
  displayedColumns: string[] = [
    'select',
    'columnName',
    'obfStrategy',
    'obfRules',
  ];
  dataSource = new MatTableDataSource<ColumnDefinition>([]);
  // public dataSource: any;
  // public obsStrategies = ['Starify', 'Hashing', 'Faker'];
  // public obsRulesOptions = ['Left', 'Right', 'Type', 'Date'];
  // public obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public selection = new SelectionModel<any>(true, []);

  tableItems = [
    'CI_CUSTOMERS',
    'CI_ORDERS',
    'CI_PER',
    'CI_PER_ADDR_SEAS',
    'CI_PER_NAME',
    'CI_PER_PHONE',
  ];

  selectedItem: string | null = null;

  constructor(private _obsufactionService: ObsfucationService) {}

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
    this.onTableChange();
    // Check rows that have all required values
    this.dataSource.data.forEach((row: ColumnDefinition) => {
      if (row.columnName && row.obfStrategy && row.obfRules?.first) {
        this.selection.select(row);
      }
    });
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
}
