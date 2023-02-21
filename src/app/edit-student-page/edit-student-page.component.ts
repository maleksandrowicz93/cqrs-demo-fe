import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-edit-student-page',
  templateUrl: './edit-student-page.component.html',
  styleUrls: ['./edit-student-page.component.css']
})
export class EditStudentPageComponent {

  studentId = this.pageLoaderService.getCurrentStudentId();

  page = Page;

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  editStudent(id: string, student: SaveStudentRequest): void {
    this.studentDataService.editStudent(id, student);
  }
}
