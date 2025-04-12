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
  constructor(private _obsufactionService: ObsfucationService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = [
    'select',
    'selectColumn',
    'obsfucationStrategy',
    'obsfucationRules',
  ];
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Food'];
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
}
