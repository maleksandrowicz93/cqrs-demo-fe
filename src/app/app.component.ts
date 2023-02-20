import { Component } from '@angular/core';
import { Page } from './enums/page';
import { PageLoaderService } from './services/page-loader.service';
import { StudentDataService } from './services/student-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageLoaderService, StudentDataService]
})
export class AppComponent {

  page = Page;
  currentPage = this.pageLoaderService.getCurrentPage();

  constructor(private pageLoaderService: PageLoaderService) {}
}
