import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Page } from '../enums/page';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {

  private livePage = new Subject<Page>();
  private currentStudentId = new Subject<string>();

  constructor() { }

  setCurrentPage(page: Page): void {
    this.livePage.next(page);
  }

  getCurrentPage(): Observable<Page> {
    return this.livePage.asObservable();
  }

  setCurrentStudentId(id: string): void {
    this.currentStudentId.next(id);
  }

  getCurrentStudentId(): Observable<string> {
    return this.currentStudentId.asObservable();
  }
}
