import { Component } from '@angular/core';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-edit-form-page',
  templateUrl: './edit-form-page.component.html',
  styleUrls: ['./edit-form-page.component.css']
})
export class EditFormPageComponent {

  studentId = this.pageLoaderService.getCurrentStudentId();

  constructor(private pageLoaderService: PageLoaderService) {}

  back(): void {
    this.pageLoaderService.setCurrentPage(Page.USER_PAGE);
  }
}
