import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentNavigatorService {

  private readonly ADD_STUDENT = "/add-student";
  private readonly STUDENTS = "/students";
  private readonly EDIT_DATA = "/edit-data";
  private readonly UPDATE_PASSWORD = "/update-password";

  constructor(private router: Router, private route: ActivatedRoute) { }

  getStudentIdFromPath(): string {
    let id = this.route.snapshot.paramMap.get("id");
    return id ? id : "";
  }

  toAddStudentPage(): Promise<boolean> {
    return this.router.navigate([this.ADD_STUDENT]);
  }

  toMainPage(): Promise<boolean> {
    return this.router.navigate([this.STUDENTS]);
  }

  toStudentPage(studentId: string): Promise<boolean> {
    return this.router.navigate([this.STUDENTS, { id: studentId}]);
  }

  toEditDataPage(studentId: string): Promise<boolean> {
    return this.router.navigate([this.STUDENTS, { id: studentId }, this.EDIT_DATA]);
  }

  toUpdatePasswordPage(studentId: string): Promise<boolean> {
    return this.router.navigate([this.STUDENTS, { id: studentId }, this.UPDATE_PASSWORD]);
  }
}
