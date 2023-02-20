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

  students = new Array<StudentIdentifiaction>();

  constructor(private pageLoaderService: PageLoaderService, private studentDataService: StudentDataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.students = this.studentDataService.findAll();
  }

  clear(): void {
    this.students.length = 0;
  }

  adduser(): void {
    this.pageLoaderService.setCurrentPage(Page.ADD_FORM);
  }

  nextUsers(): void { }
  previousUsers(): void { }
}
