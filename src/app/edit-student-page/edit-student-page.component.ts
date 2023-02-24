import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-edit-student-page',
  templateUrl: './edit-student-page.component.html',
  styleUrls: ['./edit-student-page.component.css']
})
export class EditStudentPageComponent {

  studentId = this.pageLoaderService.getCurrentStudentId();

  page = Page;

  constructor(private pageLoaderService: PageLoaderService, private httpStudentService: HttpStudentService) { }

  editStudent(id: string, student: SaveStudentRequest): void {
    this.httpStudentService.editStudent(id, student).subscribe({
      next: response => this.pageLoaderService.setCurrentPage(Page.STUDENT_PAGE),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
}
