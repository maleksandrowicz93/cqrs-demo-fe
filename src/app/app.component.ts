import { Component, OnInit } from '@angular/core';
import { Page } from './enums/page';
import { PageLoaderService } from './services/page-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageLoaderService]
})
export class AppComponent implements OnInit {

  page = Page;
  currentPage = Page.MAIN_PAGE;
  studentId = "";

  constructor(private pageLoaderService: PageLoaderService) {}

  ngOnInit(): void {
    this.pageLoaderService.getCurrentPage().subscribe(page => this.currentPage = page);
    this.pageLoaderService.getCurrentStudentId().subscribe(id => this.studentId = id);
  }
}
