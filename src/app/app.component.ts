import { Component } from '@angular/core';
import { Page } from './enums/page';
import { HttpStudentService } from './services/http-student.service';
import { PageLoaderService } from './services/page-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageLoaderService, HttpStudentService]
})
export class AppComponent {

  title = "cqrs-demo-fe";
  page = Page;
  currentPage = this.pageLoaderService.getCurrentPage();

  constructor(private pageLoaderService: PageLoaderService) {}
}
