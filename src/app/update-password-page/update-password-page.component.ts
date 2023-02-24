import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck } from '@angular/core';
import { FormError } from '../enums/form-error';
import { Page } from '../enums/page';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.css']
})
export class UpdatePasswordPageComponent implements DoCheck {

  page = Page;

  studentId = this.pageLoaderService.getCurrentStudentId();

  password = "";
  confirmedPassword = "";

  errors = new Set<FormError>();

  constructor(private pageLoaderService: PageLoaderService, private httpStudentService: HttpStudentService) { }

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

  clear(): void {
    this.password = "";
    this.confirmedPassword = "";
  }

  confirm(id: string): void {
    this.httpStudentService.updatePassword(id, this.password).subscribe({
      next: response => this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
}
