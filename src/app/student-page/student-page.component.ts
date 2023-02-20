import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { StudentDto } from '../interfaces/StudentDto';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

  studentId = this.pageLoaderService.getCurrentStudentId();

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  getStudent(id: string): StudentDto {
    return this.studentDataService.findById(id);
  }

  close(): void {
    this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
  }

  updatePassword(): void {
    this.pageLoaderService.setCurrentPage(Page.UPDATE_PASSWORD_FORM);
  }

  editStudent(): void {
    this.pageLoaderService.setCurrentPage(Page.EDIT_FORM);
  }
}
