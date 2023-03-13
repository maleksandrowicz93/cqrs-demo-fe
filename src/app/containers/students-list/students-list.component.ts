import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { StudentIdentifiaction } from '../../interfaces/StudentIdentifiaction';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  readonly sizes = [5, 10, 20, 50];

  students = new Array<StudentIdentifiaction>();
  totalPages = 0;
  pageNumber = 0;
  pageSize = this.sizes[1];

  private studentPageSubscription$ = new Subscription();

  constructor(
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents(): void {
    this.studentPageSubscription$ = this.httpStudentService.getStudentsPage(this.pageNumber, this.pageSize)
      .pipe(first())
      .subscribe({
        next: page => {
          this.students = page.students;
          this.totalPages = page.totalPages;
        }
      });
  }

  addStudent(): void {
    this.studentNavigatorService.toAddStudentPage();
  }

  loadStudents(): void {
    this.pageNumber = 0;
    this.fetchStudents();
  }

  changeSize(selectedValue: Event): void {
    let selectedSize = (selectedValue.target as HTMLSelectElement).value;
    this.pageSize = Number.parseInt(selectedSize);
    this.pageNumber = 0;
    if (this.students.length > 0) {
      this.fetchStudents();
    }
  }

  showDetails(studentId: string): void {
    this.studentNavigatorService.toStudentPage(studentId);
  }

  clear(): void {
    this.students.length = 0;
  }

  isPreviousPageDisabled(): boolean {
    return this.pageNumber <= 0;
  }

  isNextPageDisabled(): boolean {
    return this.pageNumber >= this.totalPages - 1;
  }

  previousPage(): void {
    this.pageNumber--;
    this.fetchStudents();
  }

  nextPage(): void {
    this.pageNumber++;
    this.fetchStudents();
  }

  ngOnDestroy(): void {
    this.studentPageSubscription$.unsubscribe();
  }
}
