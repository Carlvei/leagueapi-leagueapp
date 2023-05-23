import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {SummonersService} from "../../summoners/summoners.service";
import {Observable} from "rxjs";


@Directive({
  selector: '[appUsernameRiotAccount]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: UsernameRiotAccountDirective, multi: true
    }
  ]
})
export class UsernameRiotAccountDirective implements AsyncValidator {

  constructor(private summonerService: SummonersService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control.value === null || control.value === '') {
      return new Promise(
        resolve => resolve(null)
      )
    }
    return new Promise(resolve => this.summonerService.querySummoner(control.value)
      .subscribe(
        () => {
          resolve(null)
        },
        error => {
          resolve({usernameNotARiotAccount: control.value})
        }
      ))
  }
}


