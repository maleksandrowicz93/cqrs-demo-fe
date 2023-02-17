import { Component, Input } from '@angular/core';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

  @Input()
  studentId = "";

  constructor(private pageLoaderService: PageLoaderService) {}

  close(): void {
    this.pageLoaderService.setCurrentPage(Page.MAIN_PAGE);
  }

  editStudent(): void  {
    this.pageLoaderService.setCurrentPage(Page.EDIT_FORM);
  }
}
