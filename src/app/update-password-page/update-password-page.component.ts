import { Component, DoCheck } from '@angular/core';
import { FormError } from '../enums/form-error';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.css']
})
export class UpdatePasswordPageComponent implements DoCheck {

  studentId = this.pageLoaderService.getCurrentStudentId();

  password = "";
  confirmedPassword = "";

  errors = new Set<FormError>();

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  ngDoCheck(): void {
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
    this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE);
  }

  clear(): void {
    this.password = "";
    this.confirmedPassword = "";
  }

  confirm(id: string): void {
    this.studentDataService.updatePassword(id, this.password);
    this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE);
  }
}
