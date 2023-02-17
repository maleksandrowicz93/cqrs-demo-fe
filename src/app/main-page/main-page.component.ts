import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @Output()
  studentChosen = new EventEmitter<string>();

  students = new Array<StudentIdentifiaction>();

  ngOnInit(): void {
    this.fillStudents();
  }

  fillStudents(): void {
    this.students.push(
      {
        id: "039fb5d7-75d2-48e4-8d44-34cb8690475b",
        email: "email1@gmal.com"
      },
      {
        id: "697cdb58-a251-4f65-bf43-64a00d16f3e4",
        email: "email2@gmal.com"
      }
    );
  }

  clear(): void {
    this.students.length = 0;
  }

  adduser(): void {
    this.students.push({
      id: "40c788e6-b004-4272-a13d-f89a10729b34",
      email: "email3@gmal.com"
    });
  }

  nextUsers(): void { }
  previousUsers(): void { }

  showDetails(studentId: string): void {
    this.studentChosen.emit(studentId);
  }
}
