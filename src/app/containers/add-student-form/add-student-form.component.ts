import { Component } from '@angular/core';
import { SaveStudentRequest } from '../../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent {

  constructor(
    private studentNagigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  addStudent(student: SaveStudentRequest): void {
    this.httpStudentService.addStudent(student).subscribe({
      next: () => this.studentNagigatorService.toMainPage(),
      error: error => alert(error)
    });
  }

  close(): void {
    this.studentNagigatorService.toMainPage();
  }
}
