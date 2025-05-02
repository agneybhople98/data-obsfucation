import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JobsDataService } from '../../jobs-data.service';
import { interval, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
  currentDomain: string = 'utility';

  constructor(
    private _jobService: JobsDataService,
    private router: Router,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract domain from route parameters
    this.route.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
      }
    });

    // Also listen to parent route parameters (for nested routes)
    this.route.parent?.params.subscribe((params) => {
      if (params['domain']) {
        this.currentDomain = params['domain'];
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectDomainFromUrl();
      });
    this._jobService
      .runJobByName('OBF_REVERT_CHANGES_ARCHDEV_JOB')
      .subscribe((res) => {
        console.log(res);
        this.isRestoring = false;
      });
    this.startCountdown();
  }

  private detectDomainFromUrl(): void {
    const urlPath = this.router.url;
    const segments = urlPath.split('/').filter((segment) => segment);

    if (segments.length > 0) {
      const potentialDomain = segments[0];
      if (['healthcare', 'utility'].includes(potentialDomain)) {
        this.currentDomain = potentialDomain;
      }
    }
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
          this.router.navigate([`/${this.currentDomain}/dashboard`]);
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
