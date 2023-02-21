import { Component, DoCheck } from '@angular/core';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-add-form-page',
  templateUrl: './add-form-page.component.html',
  styleUrls: ['./add-form-page.component.css']
})
export class AddFormPageComponent implements DoCheck {

  saveStudentRequest = {} as SaveStudentRequest;
  email = "";
  password = "";
  confirmedPassword = "";
  firstName = "";
  lastName = "";
  birthDate = new Date();
  errors = new Set<Error>([Error.BLANK_EMAIL, Error.BLANK_PASSWORD]);

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  ngDoCheck(): void {
    this.validateInput(Error.BLANK_EMAIL, () => this.email.length > 0);
    this.validateInput(Error.BLANK_PASSWORD, () => this.password.length > 0);
    this.validateInput(Error.DIFFERENT_PASSWORDS, () => this.password === this.confirmedPassword);
  }

  private validateInput(error: Error, predicate: () => boolean): void {
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

enum Error {
  BLANK_EMAIL = "Email cannot be blank",
  BLANK_PASSWORD = "Password cannot be blank",
  DIFFERENT_PASSWORDS = "Passwords must be the same"
}
