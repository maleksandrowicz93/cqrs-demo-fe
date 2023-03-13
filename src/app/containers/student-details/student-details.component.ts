import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { StudentDto } from '../../interfaces/StudentDto';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  studentId = "";
  student = {} as StudentDto;

  private subscriptions = new Array<Subscription>();

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentSerice: HttpStudentService
  ) { }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
    let sub = this.httpStudentSerice.getStudentById(this.studentId)
      .pipe(first())
      .subscribe({
        next: student => this.student = student,
        error: error => alert(error)
      });
    this.subscriptions.push(sub);
  }

  updatePassword(): void {
    this.studentNavigatorService.toUpdatePasswordPage(this.studentId);
  }

  editStudent(): void {
    this.studentNavigatorService.toEditDataPage(this.studentId);
  }

  deleteStudent(): void {
    if (confirm("Are you sure you want to delete this student?")) {
      let sub = this.httpStudentSerice.deleteStudent(this.student.id)
        .pipe(first())
        .subscribe({
          next: () => {
            alert("Student deleted successfully");
            this.student = {} as StudentDto;
            this.studentNavigatorService.toMainPage();
          },
          error: error => alert(error)
        });
      this.subscriptions.push(sub);
    }
  }

  close(): void {
    this.studentNavigatorService.toMainPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
