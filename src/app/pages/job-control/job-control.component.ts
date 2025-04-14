import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  JobDataControlElement,
  JobsDataService,
} from '../../jobs-data.service';

@Component({
  selector: 'app-job-control',
  standalone: false,
  templateUrl: './job-control.component.html',
  styleUrl: './job-control.component.scss',
})
export class JobControlComponent {
  isConnected = false;
  obsControlOptions = [
    'OC-98675',
    'OC-98674',
    'OC-98674',
    'OC-98673',
    'OC-98672',
    'OC-98671',
  ];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: any[] = [
    'jobControlId',
    'jobControlName',
    'jobControlDescription',
    'obsfucationControlId',
    'lastTriggeredOn',
    'actions',
  ];
  constructor(
    private _dialog: MatDialog,
    private _jobDataService: JobsDataService
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(
      this._jobDataService.getAllJobControlData()
    );
  }
}
