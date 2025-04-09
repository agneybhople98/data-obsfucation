import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
  standalone: false,
})
export class JobCardComponent {
  @Input() job: any;
}
