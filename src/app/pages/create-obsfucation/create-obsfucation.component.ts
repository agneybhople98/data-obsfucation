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
  constructor(private _obsufactionService: ObsfucationService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  displayedColumns: string[] = [
    'select',
    'selectColumn',
    'obsfucationStrategy',
    'obsfucationRules',
  ];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(
      this._obsufactionService.getAllObsfucationStrategies()
    );
  }
  // Add these methods for selection
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

  tableItems = [
    'CI_BILL',
    'CI_PER_NAME',
    'CI_PER_PHONE',
    'CI_PER',
    'CI_PER_ADDR_REAS',
    'CI_ACCT',
    'CI_PER_CHAR',
    'CI_PRCE_CALC',
    'CI_POLICY_PER',
  ];

  selectedItem: string | null = null;

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
