import {AbstractControl, type ValidationErrors, type ValidatorFn} from '@angular/forms'

export const strengthValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const digitExp = /\d/
    const letterExp = /\p{L}/u
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
