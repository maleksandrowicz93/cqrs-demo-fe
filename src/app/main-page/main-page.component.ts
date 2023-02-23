import { Component, OnInit } from '@angular/core';
import { Page } from '../enums/page';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { PageLoaderService } from '../services/page-loader.service';
import { StudentDataService } from '../services/student-data.service';

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

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  adduser(): void {
    this.pageLoaderService.setCurrentPage(Page.ADD_FORM);
  }

  loadUsers(): void {
    this.students = this.studentDataService.findAll();
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
