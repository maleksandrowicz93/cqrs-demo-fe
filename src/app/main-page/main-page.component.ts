import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorMessage } from '../enums/error-message';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { HttpStudentService } from '../services/http-student.service';
import { StudentNavigatorService } from '../services/student-navigator.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  readonly defaultSizeIndex = 1;
  readonly sizes = [1, 5, 10, 20];

  students = new Array<StudentIdentifiaction>();
  pageSize = this.sizes[this.defaultSizeIndex];
  pageNumber = 0;

  constructor(
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents(): void {
    this.httpStudentService.getAllStudents().subscribe({
      next: list => {
        console.log("Students page laoded:");
        console.log(list);
        this.students = list;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert(ErrorMessage.UNKNOWN_ERROR);
      }
    });
  }

  addStudent(): void {
    this.studentNavigatorService.toAddStudentPage();
  }

  loadStudents(): void {
    this.fetchStudents();
  }

  changeSize(selectedValue: Event): void {
    let selectedSize = (selectedValue.target as HTMLSelectElement).value;
    this.pageSize = Number.parseInt(selectedSize);
    this.pageNumber = 0;
  }

  clear(): void {
    this.students.length = 0;
  }

  isPreviousPageDisabled(): boolean {
    return this.pageNumber <= 0;
  }

  isNextPageDisabled(): boolean {
    let studentsNumber = this.students.length;
    let studentsToPageSize = Math.floor(studentsNumber / this.pageSize);
    let maxPage = studentsNumber <= this.pageSize || studentsNumber % this.pageSize == 0
      ? studentsToPageSize - 1
      : studentsToPageSize;
    return this.pageNumber >= maxPage;
  }

  previousPage(): void {
    this.pageNumber--;
  }

  nextPage(): void {
    this.pageNumber++;
  }
}
