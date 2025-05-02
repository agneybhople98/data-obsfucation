import { Injectable, Inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JobsDataService } from '../jobs-data.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteResolverService implements Resolve<any> {
  constructor(
    @Inject(JobsDataService) private jobsDataService: JobsDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Extract domain from route params
    const domain = route.paramMap.get('domain');
    console.log('RouteResolver - domain:', domain);

    // Return an observable that initializes the correct data
    return of(null).pipe(
      tap(() => {
        if (domain === 'healthcare') {
          console.log('RouteResolver - Initializing healthcare data');
          this.jobsDataService.initializeHealthcareData();
        } else if (domain === 'utility') {
          this.jobsDataService.initializeUtilityData();
        } else {
          console.warn(
            'RouteResolver - Unknown domain:',
            domain,
            'Defaulting to utility'
          );
          this.jobsDataService.initializeUtilityData();
        }
      }),
      catchError((error) => {
        console.error('RouteResolver - Error initializing data:', error);
        // Return an empty object to prevent navigation from failing
        return of({});
      })
    );
  }
}
