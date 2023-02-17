import { Component } from '@angular/core';
import { EditStudentMode } from './enums/edit-student-mode';
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
  editstudentMode = EditStudentMode.EDIT_DATA;

  showDetails(studentId: string): void {
    this.studentId = studentId;
    this.currentPage = Page.USER_PAGE;
  }

  showMainPage(): void {
    this.currentPage = Page.MAIN_PAGE;
  }

  showEditForm(editMode: EditStudentMode): void {
    this.editstudentMode = editMode;
    this.currentPage = Page.EDIT_FORM;
  }

  backToDetails(): void {
    this.currentPage = Page.USER_PAGE;
  }
}
