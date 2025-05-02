import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidenavigation-bar',
  templateUrl: './sidenavigation-bar.component.html',
  styleUrls: ['./sidenavigation-bar.component.scss'],
  standalone: false,
})
export class SidenavigationBarComponent implements OnInit {
  isExpanded = true;
  userName = 'Michael J';
  userRole = 'Admin';
  side: MatDrawerMode = 'side';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentDomain: string = 'utility';

  constructor(private router: Router, private route: ActivatedRoute) {}

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

    // For cases where parameters aren't available, extract from URL
    this.detectDomainFromUrl();

    // Update domain on navigation changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectDomainFromUrl();
      });
  }

  // Extract domain from URL
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

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.side = this.isExpanded ? 'side' : 'over';
  }

  isActive(route: string): boolean {
    const routePath = route.startsWith('/') ? route.substring(1) : route;
    const fullPath = `/${this.currentDomain}/${routePath}`;
    return this.router.url === fullPath || this.router.url.startsWith(fullPath);
  }
}
