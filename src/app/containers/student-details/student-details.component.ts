import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from '../../enums/error-message';
import { StudentDto } from '../../interfaces/StudentDto';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, AfterContentInit, AfterViewInit {

  studentId = "";
  student = {} as StudentDto;

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentSerice: HttpStudentService
  ) { }

  ngAfterContentInit(): void {
    this.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
    this.httpStudentSerice.getStudentById(this.studentId).subscribe({
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
  }

  updatePassword(): void {
    this.studentNavigatorService.toUpdatePasswordPage(this.studentId);
  }

  editStudent(): void {
    this.studentNavigatorService.toEditDataPage(this.studentId);
  }

  deleteStudent(): void {
    if (confirm("Are you sure you want to delete this student?")) {
      this.httpStudentSerice.deleteStudent(this.student.id).subscribe({
        next: () => {
          let message = "Student with id " + this.student.id + " deleted";
          console.log(message);
          alert(message);
          this.student = {} as StudentDto;
          this.studentNavigatorService.toMainPage();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          alert(ErrorMessage.UNKNOWN_ERROR);
        }
      });
    }
  }

  close(): void {
    this.studentNavigatorService.toMainPage();
  }
}
