import {Component, Input} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  type ValidationErrors,
  type ValidatorFn,
  Validators
} from '@angular/forms'

@Component({
  selector: 'password-input',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.strengthValidator()
  ])
  strengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const digitExp = /\d/
      const letterExp = /.*[a-zA-Z].*/
      const symbolExp = /[-!$%^&*()@_+|~=`{}\[\]:";'<>?,.\/]/
      const hasDigit = digitExp.test(control.value)
      const hasLetter = letterExp.test(control.value)
      const hasSymbol = symbolExp.test(control.value)
      if (hasDigit && hasLetter && hasSymbol) {
        return null
      }
      if ((hasLetter && hasDigit) || (hasLetter && hasSymbol) || (hasDigit && hasSymbol)) {
        return {mediumPassword: {value: control.value}}
      }
      if (hasLetter || hasDigit || hasSymbol) {
        return {weakPassword: {value: control.value}}
      }
      return null
    }
  }
  protected readonly Object = Object
}
