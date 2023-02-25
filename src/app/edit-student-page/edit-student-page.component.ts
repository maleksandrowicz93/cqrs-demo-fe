import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorMessage } from '../enums/error-message';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-edit-student-page',
  templateUrl: './edit-student-page.component.html',
  styleUrls: ['./edit-student-page.component.css']
})
export class EditStudentPageComponent {

  studentId = this.pageLoaderService.getCurrentStudentId();

  page = Page;

  constructor(private pageLoaderService: PageLoaderService, private httpStudentService: HttpStudentService) { }

  editStudent(id: string, student: SaveStudentRequest): void {
    this.httpStudentService.editStudent(id, student).subscribe({
      next: response => {
        console.log("Student updated with new data:");
        console.log(response);
        this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE);
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
}
