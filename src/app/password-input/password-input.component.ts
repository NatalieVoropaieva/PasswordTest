import {Component, forwardRef, Injector, Input, type OnInit, Self} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common'
import {
  AbstractControl,
  type ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  type ValidationErrors,
  type ValidatorFn,
  Validators
} from '@angular/forms'
import {strengthValidator} from '../validators/password-strength-validator'

@Component({
  selector: 'password-input',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent implements ControlValueAccessor, OnInit {
  value: string = ''

  control: AbstractControl | null = null

  constructor(@Self() private injector: Injector) {

  }

  ngOnInit() {
    const controlDir = this.injector.get(NgControl)
    this.control = controlDir.control
    this.control?.addValidators([
      Validators.required,
      Validators.minLength(8),
      strengthValidator()
    ]);
  }

  onChangeFn = (value: string) => {
  }
  onTouchedFn = () => {}


  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue
    this.onChangeFn(newValue)
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }

  writeValue(value: string): void {
    this.value = value
    this.onChangeFn(value)
    this.onTouchedFn();
  }
}
