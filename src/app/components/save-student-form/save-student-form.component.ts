import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { FormError } from '../../enums/form-error';
import { SaveStudentRequest } from '../../interfaces/SaveStudentRequest';

@Component({
  selector: 'app-save-student-form',
  templateUrl: './save-student-form.component.html',
  styleUrls: ['./save-student-form.component.css']
})
export class SaveStudentFormComponent implements DoCheck {

  @Output()
  studentConfirmed = new EventEmitter<SaveStudentRequest>();
  
  @Output()
  pageClosed = new EventEmitter<void>();

  email = "";
  password = "";
  confirmedPassword = "";
  firstName = "";
  lastName = "";
  birthDate = new Date();

  errors = new Set<FormError>();

  constructor() { }

  ngDoCheck(): void {
    this.validateInput(FormError.BLANK_EMAIL, () => this.email.trim().length > 0);
    this.validateInput(FormError.BLANK_PASSWORD, () => this.password.trim().length > 0);
    this.validateInput(FormError.DIFFERENT_PASSWORDS, () => this.password === this.confirmedPassword);
  }

  private validateInput(error: FormError, predicate: () => boolean): void {
    let isError = this.errors.has(error);
    if (predicate()) {
      if (isError) {
        this.errors.delete(error);
      }
    } else {
      if (!isError) {
        this.errors.add(error);
      }
    }
  }

  clear(): void {
    this.email = "";
    this.password = "";
    this.confirmedPassword = "";
    this.firstName = "";
    this.lastName = "";
    this.birthDate = new Date();
  }

  confirm(): void {
    this.studentConfirmed.emit({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate
    });
  }

  close(): void {
    this.pageClosed.emit();
  }
}
