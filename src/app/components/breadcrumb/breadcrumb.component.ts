import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: false,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

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
    const urlSegments = currentUrl.split('/').filter((segment) => segment);
    this.breadcrumbs = [];

    // Always add Dashboard as first item
    // this.breadcrumbs.push({
    //   label: 'Dashboard',
    //   url: '/dashboard',
    // });

    if (urlSegments.length > 0) {
      let currentPath = '';

      for (let i = 0; i < urlSegments.length; i++) {
        currentPath += `/${urlSegments[i]}`;
        const segment = urlSegments[i];

        // Skip 'create-subset' segment in breadcrumbs
        if (segment === 'create-subset' || segment === 'view-subset') {
          continue;
        }

        const label = this.getPageLabel(segment);

        // Skip adding Dashboard if it's not the first segment
        if (label && (i > 0 || label !== 'Dashboard')) {
          this.breadcrumbs.push({
            label: label,
            url: currentPath,
          });
        }
      }
    }
  }

  private getPageLabel(segment: string): string {
    switch (segment) {
      case 'dashboard':
        return 'Dashboard';
      case 'obfuscation-plan':
        return 'Obfuscation Plan';
      case 'view-obfuscation':
        return 'View Obfuscation';
      case 'create-obfuscation':
        return 'Create Obfuscation';
      case 'job-details':
        return 'Job Details';
      case 'process':
        return 'Process';
      case 'tracking':
        return 'Tracking';
      case 'job-control-list':
        return 'Job Control List';
      case 'history':
        return 'History';
      case 'create-subset':
        return ''; // Return empty string to exclude from breadcrumb
      default:
        return this.capitalizeFirstLetter(segment.replace(/-/g, ' '));
    }
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
