import { Component, OnDestroy } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { SaveStudentRequest } from '../../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnDestroy {

  private studentSaveSubscription$ = new Subscription();

  constructor(
    private studentNagigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  addStudent(student: SaveStudentRequest): void {
    this.studentSaveSubscription$ = this.httpStudentService.addStudent(student)
      .pipe(first())
      .subscribe({
        next: () => this.studentNagigatorService.toMainPage(),
        error: error => alert(error)
      });
  }

  close(): void {
    this.studentNagigatorService.toMainPage();
  }

  ngOnDestroy(): void {
    this.studentSaveSubscription$.unsubscribe();
  }
}
