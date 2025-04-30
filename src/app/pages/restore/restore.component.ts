import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsDataService } from '../../jobs-data.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss',
  standalone: false,
})
export class RestoreComponent implements OnInit {
  isRestoring: boolean = true;
  countdown: number = 5;
  timerSubscription: Subscription | null = null;

  constructor(private _jobService: JobsDataService, private router: Router) {}

  ngOnInit(): void {
    this._jobService
      .runJobByName('OBF_REVERT_CHANGES_ARCHDEV_JOB')
      .subscribe((res) => {
        console.log(res);
        this.isRestoring = false;
      });
    this.startCountdown();
  }

  startCountdown(): void {
    // Start with a 5 second countdown
    this.countdown = 5;

    // Create an interval that emits every second
    this.timerSubscription = interval(1000)
      .pipe(take(5)) // Take 5 emissions (5 seconds)
      .subscribe({
        next: () => {
          this.countdown--;
        },
        complete: () => {
          this.router.navigate(['/dashboard']);
        },
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
