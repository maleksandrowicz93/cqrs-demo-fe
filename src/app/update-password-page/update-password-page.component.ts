import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ErrorMessage } from '../enums/error-message';
import { FormError } from '../enums/form-error';
import { HttpStudentService } from '../services/http-student.service';
import { StudentNavigatorService } from '../services/student-navigator.service';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.css']
})
export class UpdatePasswordPageComponent implements OnInit, DoCheck {

  studentId = "";
  password = "";
  confirmedPassword = "";
  errors = new Set<FormError>();

  constructor(
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    this.studentId = this.studentNavigatorService.getStudentIdFromPath();
  }

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

  confirm(): void {
    this.httpStudentService.updatePassword(this.studentId, this.password).subscribe({
      next: response => {
        console.log("Password updated for:");
        console.log(response);
        this.studentNavigatorService.toStudentPage(this.studentId);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        switch (error.status) {
          case HttpStatusCode.BadRequest:
            alert(ErrorMessage.INVALID_CREDENTIALS);
            break;
          case HttpStatusCode.NotFound:
            alert(ErrorMessage.STUDENT_NOT_FOUND);
            break;
          default:
            alert(ErrorMessage.UNKNOWN_ERROR);
        }
      }
    });
  }

  close(): void {
    this.studentNavigatorService.toStudentPage(this.studentId);
  }
}
