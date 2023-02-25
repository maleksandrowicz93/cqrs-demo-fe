import { Component, Input } from '@angular/core';
import { Page } from '../enums/page';
import { PageLoaderService } from '../services/page-loader.service';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css']
})
export class CloseButtonComponent {

  @Input()
  previousPage = Page.MAIN_PAGE;

  constructor(private pageLoaderService: PageLoaderService) {}

  close(): void {
    this.pageLoaderService.setCurrentPage(this.previousPage);
  }
}
