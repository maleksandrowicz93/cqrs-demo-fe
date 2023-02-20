import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Page } from '../enums/page';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  private currentPage = new Subject<Page>();
  private currentStudentId = new ReplaySubject<string>;

  constructor() { }

  setCurrentPage(page: Page): void {
    this.currentPage.next(page);
  }

  getCurrentPage(): Observable<Page> {
    return this.currentPage.asObservable();
  }

  setCurrentStudentId(id: string): void {
    this.currentStudentId.next(id);
  }

  getCurrentStudentId(): Observable<string> {
    return this.currentStudentId.asObservable();
  }
}
