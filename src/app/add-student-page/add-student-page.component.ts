import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-add-student-page',
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.css']
})
export class AddStudentPageComponent {

  page = Page;

  constructor(private studentDataService: StudentDataService) { }

  addStudent(student: SaveStudentRequest): void {
    this.studentDataService.addStudent(student);
  }
}
