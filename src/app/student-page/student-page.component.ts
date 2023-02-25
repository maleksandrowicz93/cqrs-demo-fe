import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from '../enums/error-message';
import { Page } from '../enums/page';
import { StudentDto } from '../interfaces/StudentDto';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  page = Page;

  student = {} as StudentDto;

  constructor(private pageLoaderService: PageLoaderService, private httpStudentSerice: HttpStudentService) { }

  ngOnInit(): void {
    this.pageLoaderService.getCurrentStudentId().subscribe(id => {
      this.httpStudentSerice.getStudentById(id).subscribe({
        next: student => {
          console.log("Student fetched:")
          console.log(student);
          this.student = student;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.student = {} as StudentDto;
          switch (error.status) {
            case HttpStatusCode.NotFound:
              alert(ErrorMessage.STUDENT_NOT_FOUND);
              break;
            default:
              alert(ErrorMessage.UNKNOWN_ERROR);
          }
        }
      });  
    });
  }

  updatePassword(): void {
    this.pageLoaderService.setCurrentPage(Page.UPDATE_PASSWORD_FORM);
  }

  editStudent(): void {
    this.pageLoaderService.setCurrentPage(Page.EDIT_FORM);
  }

  deleteStudent(): void {
    if (confirm("Are you sure you want to delete this student?")) {
      this.httpStudentSerice.deleteStudent(this.student.id).subscribe({
        next: () => {
          let message = "Student with id " + this.student.id + " deleted";
          console.log(message);
          alert(message);
          this.student = {} as StudentDto;
          this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          alert(ErrorMessage.UNKNOWN_ERROR);
        }
      });
    } 
  }
}
