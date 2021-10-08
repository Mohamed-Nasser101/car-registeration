import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator {
  @Input('appConfirmPassword') Password = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.Password === control.value ? null : {notMatch: true};
  }

}
