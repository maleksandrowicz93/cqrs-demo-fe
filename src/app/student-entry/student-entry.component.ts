import { Component, Input, OnInit } from '@angular/core';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { StudentNavigatorService } from '../services/student-navigator.service';

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})
export class StudentEntryComponent implements OnInit {

  @Input()
  index = 0;
  
  @Input()
  student = {} as StudentIdentifiaction;

  studentId = "";

  constructor(private studentNavigatorService: StudentNavigatorService) { }

  ngOnInit(): void {
    this.studentId = this.studentNavigatorService.getStudentIdFromPath();
  }

  showDetails(): void {
    this.studentNavigatorService.toStudentPage(this.studentId);
  }
}
