import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VersionCheckService {
  // Subject to emit when a new version is available
  private updateAvailable = new Subject<boolean>();
  private currentHash: string = '';

  constructor(private http: HttpClient) {
    // Check for updates every 5 minutes
    interval(5 * 60 * 1000).subscribe(() => {
      this.checkForUpdate();
    });
  }

  public init() {
    // Get the initial hash on app start
    this.checkForUpdate();
  }

  // Observable that components can subscribe to
  public getUpdateAvailable(): Observable<boolean> {
    return this.updateAvailable.asObservable();
  }

  private checkForUpdate(): void {
    // Make a request to get the current version info
    // We'll use a timestamp query parameter to prevent caching
    this.http
      .get('/version.json?t=' + new Date().getTime())
      .pipe(map((response: any) => response.hash))
      .subscribe(
        (hash: string) => {
          // If we have a hash stored and it's different from the new one
          if (this.currentHash && this.currentHash !== hash) {
            this.updateAvailable.next(true);
          }
          this.currentHash = hash;
        },
        (error) => {
          console.error('Error checking for updates:', error);
        }
      );
  }
}
