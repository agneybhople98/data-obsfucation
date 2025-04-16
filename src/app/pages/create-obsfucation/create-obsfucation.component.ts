import { Component, ViewChild } from '@angular/core';
import { ObsfucationService } from '../../services/obsfucation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-create-obsfucation',
  templateUrl: './create-obsfucation.component.html',
  styleUrl: './create-obsfucation.component.scss',
  standalone: false,
})
export class CreateObsfucationComponent {
  public dataSource: any;
  public obsStrategies = ['Starify', 'Hashing', 'Faker'];
  public obsRulesOptions = ['Left', 'Right', 'Type', 'Date'];
  public obsRulesNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public selection = new SelectionModel<any>(true, []);
  public displayedColumns = [
    'select',
    'selectColumn',
    'obsfucationStrategy',
    'obsfucationRules',
  ];

  // Table column mappings for different table items
  private tableColumnMappings: { [key: string]: string[] } = {
    CI_ORDERS: ['Email Address', 'Date of Birth', 'Credit Card Number'],
    CI_PER: ['Name', 'SSN_NUMBER'],
    // Add more mappings as needed
  };

  tableItems = [
    'CI_CUSTOMERS',
    'CI_ORDERS',
    'CI_PER',
    'CI_PER_ADDR_SEAS',
    'CI_PER_NAME',
    'CI_PER_PHONE',
  ];

  selectedItem: string | null = null;

  constructor(private _obsufactionService: ObsfucationService) {
    // Initialize dataSource with some sample data
    this.dataSource = new MatTableDataSource([
      { selectColumn: 'Email Address' },
      { selectColumn: 'Date of Birth' },
      { selectColumn: 'Credit Card Number' },
      { selectColumn: 'Name' },
      { selectColumn: 'SSN_NUMBER' },
    ]);
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.selection.clear();

    // Get the columns to check for the selected item
    const columnsToCheck = this.tableColumnMappings[item] || [];

    // Check the rows that match the columns
    this.dataSource.data.forEach((row: any) => {
      if (columnsToCheck.includes(row.selectColumn)) {
        console.log('row', row);
        this.selection.select(row);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(
      this._obsufactionService.getAllObsfucationStrategies()
    );
  }
}
