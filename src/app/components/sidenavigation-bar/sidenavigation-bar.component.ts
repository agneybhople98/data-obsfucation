import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

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
  side: any = 'side';

  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'settings', label: 'Configuration', route: '/configuration' },
    { icon: 'rotate_right', label: 'Process', route: '/process' },
    { icon: 'schedule', label: 'Tracking', route: '/tracking' },
    { icon: 'history', label: 'History', route: '/history' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;

    this.side = this.isExpanded ? 'side' : 'over';
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
