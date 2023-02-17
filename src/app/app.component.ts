import { Component } from '@angular/core';
import { Page } from './enums/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentPage = Page.MAIN_PAGE;
  page = Page;
  studentId = "";

  showDetails(studentId: string): void {
    this.studentId = studentId;
    this.currentPage = Page.USER_PAGE;
  }

  showMainPage(): void {
    this.currentPage = Page.MAIN_PAGE;
  }
}
