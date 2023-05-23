import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appPasswordMatcher]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: PasswordMatcherDirective, multi: true
    }
  ]
})
export class PasswordMatcherDirective implements Validator {

  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor() { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.controls['password'];
    const confirmPasswordControl = formGroup.controls['passwordConfirmation'];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
    return null;
  }

}
