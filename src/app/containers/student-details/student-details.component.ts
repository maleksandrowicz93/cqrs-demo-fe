import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDto } from '../../interfaces/StudentDto';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentId = "";
  student = {} as StudentDto;

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentSerice: HttpStudentService
  ) { }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
    this.httpStudentSerice.getStudentById(this.studentId).subscribe({
      next: student => this.student = student,
      error: error => alert(error)
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
          alert("Student deleted successfully");
          this.student = {} as StudentDto;
          this.studentNavigatorService.toMainPage();
        },
        error: error => alert(error)
      });
    }
  }

  close(): void {
    this.studentNavigatorService.toMainPage();
  }
}
