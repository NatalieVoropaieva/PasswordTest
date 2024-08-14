import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordInputComponent } from './password-input/password-input.component'
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordInputComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  password = new FormControl('')
}
