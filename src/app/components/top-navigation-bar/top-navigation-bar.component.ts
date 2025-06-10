import { Component } from '@angular/core';

@Component({
  selector: 'app-top-navigation-bar',
  standalone: false,
  templateUrl: './top-navigation-bar.component.html',
  styleUrl: './top-navigation-bar.component.scss',
})
export class TopNavigationBarComponent {
  userName = 'Michael J';
}
