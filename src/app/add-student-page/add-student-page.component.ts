import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorMessage } from '../enums/error-message';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../services/http-student.service';
import { StudentNavigatorService } from '../services/student-navigator.service';

@Component({
  selector: 'app-add-student-page',
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.css']
})
export class AddStudentPageComponent {

  constructor(
    private studentNagigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  addStudent(student: SaveStudentRequest): void {
    this.httpStudentService.addStudent(student).subscribe({
      next: response => {
        console.log("New student added:")
        console.log(response);
        this.studentNagigatorService.toMainPage();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        switch (error.status) {
          case HttpStatusCode.BadRequest:
            alert(ErrorMessage.INVALID_CREDENTIALS);
            break;
          case HttpStatusCode.Conflict:
            alert(ErrorMessage.STUDENT_ALREADY_EXISTS);
            break;
          default:
            alert(ErrorMessage.UNKNOWN_ERROR);
        }
      }
    });
  }

  close(): void {
    this.studentNagigatorService.toMainPage();
  }
}
