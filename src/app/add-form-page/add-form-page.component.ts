import { Component, DoCheck } from '@angular/core';
import { FormError } from '../enums/form-error';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-add-form-page',
  templateUrl: './add-form-page.component.html',
  styleUrls: ['./add-form-page.component.css']
})
export class AddFormPageComponent implements DoCheck {

  email = "";
  password = "";
  confirmedPassword = "";
  firstName = "";
  lastName = "";
  birthDate = new Date();
  errors = new Set<FormError>([FormError.BLANK_EMAIL, FormError.BLANK_PASSWORD]);

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

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

  close(): void {
    this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
  }

  clear(): void {
    this.email = "";
    this.password = "";
    this.confirmedPassword = "";
    this.firstName = "";
    this.lastName = "";
    this.birthDate = new Date();
  }

  addStudent(): void {
    this.studentDataService.addStudent({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate
    });
    this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
  }
}
