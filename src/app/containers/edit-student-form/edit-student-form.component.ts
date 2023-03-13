import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { SaveStudentRequest } from '../../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.css']
})
export class EditStudentFormComponent implements OnInit, OnDestroy {

  studentId = "";

  private subscriptions = new Array<Subscription>();

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
  }

  editStudent(student: SaveStudentRequest): void {
    let sub = this.httpStudentService.editStudent(this.studentId, student)
      .pipe(first())
      .subscribe({
        next: () => this.studentNavigatorService.toStudentPage(this.studentId),
        error: error => alert(error)
      });
    this.subscriptions.push(sub);
  }

  close(): void {
    this.studentNavigatorService.toStudentPage(this.studentId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
