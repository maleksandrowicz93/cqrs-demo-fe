import { Component, OnInit } from '@angular/core';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-edit-form-page',
  templateUrl: './edit-form-page.component.html',
  styleUrls: ['./edit-form-page.component.css']
})
export class EditFormPageComponent implements OnInit {

  studentId = "";

  constructor(private pageLoaderService: PageLoaderService) {}

  ngOnInit(): void {
    this.pageLoaderService.getCurrentStudentId().subscribe(id => this.studentId = id);
  }

  back(): void {
    this.pageLoaderService.setCurrentPage(Page.USER_PAGE);
  }
}
