import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../../jobs-data.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss',
  standalone: false,
})
export class RestoreComponent implements OnInit {
  constructor(private _jobService: JobsDataService) {}
  ngOnInit(): void {
    this._jobService
      .runJobByName('OBF_REVERT_CHANGES_ARCHDEV_JOB')
      .subscribe((res) => {
        console.log(res);
      });
  }
}
