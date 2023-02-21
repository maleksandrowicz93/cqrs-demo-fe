import { Component, Input } from '@angular/core';
import { Page } from '../enums/page';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})
export class StudentEntryComponent {

  @Input()
  index = 0;

  @Input()
  student = {} as StudentIdentifiaction;

  constructor(private pageLoaderService: PageLoaderService) {}

  showDetails(studentId: string): void {
    this.pageLoaderService.setCurrentStudentId(studentId);
    this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE);
  }
}
