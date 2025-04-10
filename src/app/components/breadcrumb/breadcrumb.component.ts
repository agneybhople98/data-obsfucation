import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: false,
})
export class BreadcrumbComponent implements OnInit {
  currentPage: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });

    // Initial breadcrumb
    this.updateBreadcrumb();
  }

  private updateBreadcrumb() {
    const currentUrl = this.router.url;

    // Remove leading slash and get the first segment
    const urlSegments = currentUrl.split('/').filter((segment) => segment);

    if (urlSegments.length > 0) {
      // Convert URL segment to display format
      switch (urlSegments[0]) {
        case 'dashboard':
          this.currentPage = 'Dashboard';
          break;
        case 'configuration':
          this.currentPage = 'Configuration';
          break;
        case 'job-details':
          this.currentPage = 'Job Details';
          break;
        case 'process':
          this.currentPage = 'Process';
          break;
        case 'tracking':
          this.currentPage = 'Tracking';
          break;
        case 'history':
          this.currentPage = 'History';
          break;
        default:
          this.currentPage = this.capitalizeFirstLetter(
            urlSegments[0].replace(/-/g, ' ')
          );
      }
    } else {
      this.currentPage = '';
    }
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
