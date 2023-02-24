import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-add-student-page',
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.css']
})
export class AddStudentPageComponent {

  page = Page;

  constructor(private pageLoaderService: PageLoaderService, private httpStudentService: HttpStudentService) { }

  addStudent(student: SaveStudentRequest): void {
    this.httpStudentService.addStudent(student).subscribe({
      next: response => this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
}
