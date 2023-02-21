import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FormError } from '../enums/form-error';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-save-form-page',
  templateUrl: './save-form-page.component.html',
  styleUrls: ['./save-form-page.component.css']
})
export class SaveFormPageComponent implements DoCheck {

  @Input()
  previousPage = Page.MAIN_PAGE;

  @Output()
  studentConfirmed = new EventEmitter<SaveStudentRequest>();

  email = "";
  password = "";
  confirmedPassword = "";
  firstName = "";
  lastName = "";
  birthDate = new Date();

  errors = new Set<FormError>();

  constructor(private pageLoaderService: PageLoaderService) { }

  ngDoCheck(): void {
    this.validateInput(FormError.BLANK_EMAIL, () => this.email.length > 0);
    this.validateInput(FormError.BLANK_PASSWORD, () => this.password.length > 0);
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
    this.pageLoaderService.setCurrentPage(this.previousPage);
  }
}
