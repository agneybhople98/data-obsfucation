import { Component, OnInit, OnDestroy } from '@angular/core';
import { VersionCheckService } from '../../services/version-check.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-notification',
  template: `
    <div *ngIf="showNotification" class="update-notification">
      <div class="notification-content">
        <span>A new version of the application is available.</span>
        <div class="notification-actions">
          <button (click)="refreshApp()" class="btn-update">Update Now</button>
          <button (click)="dismissNotification()" class="btn-dismiss">
            Later
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
      }

      .notification-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .notification-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .btn-update {
        background: #5d87ff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn-dismiss {
        background: transparent;
        border: 1px solid #ccc;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class UpdateNotificationComponent implements OnInit, OnDestroy {
  showNotification = false;
  private subscription: Subscription;

  constructor(private versionCheckService: VersionCheckService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription = this.versionCheckService
      .getUpdateAvailable()
      .subscribe((updateAvailable: boolean) => {
        this.showNotification = updateAvailable;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshApp() {
    window.location.reload();
  }

  dismissNotification() {
    this.showNotification = false;
  }
}
