import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from '../../enums/error-message';
import { SaveStudentRequest } from '../../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.css']
})
export class EditStudentFormComponent implements OnInit {

  studentId = "";

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
  }

  editStudent(id: string, student: SaveStudentRequest): void {
    this.httpStudentService.editStudent(id, student).subscribe({
      next: response => {
        console.log("Student updated with new data:");
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
