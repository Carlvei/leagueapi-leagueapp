import {Directive} from "@angular/core";
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {SummonersService} from "../../summoners/summoners.service";
import {Observable, catchError, map, of} from "rxjs";


@Directive({
  selector: '[appUsernameRiotAccount]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameRiotAccountDirective,
      multi: true,
    },
  ],
})
export class UsernameRiotAccountDirective implements AsyncValidator {
  constructor(private summonerService: SummonersService) {}

  public validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control.value === null || control.value === '') {
      return new Promise((resolve) => resolve(null));
    }
    return new Promise((resolve) =>
      this.summonerService.querySummoner(control.value).subscribe(
        () => {
          resolve(null);
        },
        (error) => {
          resolve({ usernameNotARiotAccount: control.value });
        }
      )
    );
  }

  /**
   * This method has been refactored to use observables instead of promises and manual subscription.
   * It validates the given control by querying the summoner service.
   * If the control value is null or empty, it immediately returns an observable with null as the result.
   * Otherwise, it calls the querySummoner method of the summoner service, and based on the response,
   * it either resolves the observable with null (indicating the validation is successful) or
   * resolves it with a ValidationErrors object containing the control value as the key
   * usernameNotARiotAccount (indicating the validation has failed).
   * @param control The control to validate.
   * @returns An observable that emits either null or a ValidationErrors object.
   */
  public validate2(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (control.value === null || control.value === '') {
      return of(null); // If the value is null or empty, return an observable with null immediately.
    }

    return this.summonerService.querySummoner(control.value).pipe(
      map(() => null), // If the query is successful, resolve the observable with null.
      catchError(() => of({ usernameNotARiotAccount: control.value })) // If an error occurs, resolve the observable with a ValidationErrors object.
    );
  }
}


