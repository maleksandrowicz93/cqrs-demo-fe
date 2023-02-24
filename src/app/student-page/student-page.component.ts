import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from '../enums/page';
import { StudentDto } from '../interfaces/StudentDto';
import { HttpStudentService } from '../services/http-student.service';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  page = Page;

  student = {} as StudentDto;

  constructor(private pageLoaderService: PageLoaderService, private httpStudentSerice: HttpStudentService) { }

  ngOnInit(): void {
    this.pageLoaderService.getCurrentStudentId().subscribe(id => {
      this.httpStudentSerice.getStudentById(id).subscribe({
        next: student => this.student = student,
        error: (error: HttpErrorResponse) => {
          this.student = {} as StudentDto;
          console.error(error);
        }
      });  
    });
  }

  updatePassword(): void {
    this.pageLoaderService.setCurrentPage(Page.UPDATE_PASSWORD_FORM);
  }

  editStudent(): void {
    this.pageLoaderService.setCurrentPage(Page.EDIT_FORM);
  }

  deleteStudent(): void {
    this.httpStudentSerice.deleteStudent(this.student.id).subscribe({
      next: () => {
        this.student = {} as StudentDto;
        this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
      },
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
}
