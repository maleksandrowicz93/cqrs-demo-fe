import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})
export class StudentEntryComponent {

  @Input()
  index = 0;

  @Input()
  student = {} as StudentIdentifiaction;

  @Output()
  studentChosen = new EventEmitter<string>();

  showDetails(studentId: string): void {
    this.studentChosen.emit(studentId);
  }
}
