import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentIdentifiaction } from '../../interfaces/StudentIdentifiaction';

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
  detailsWanted = new EventEmitter<string>();

  constructor() { }

  showDetails(): void {
    this.detailsWanted.emit(this.student.id);
  }
}
