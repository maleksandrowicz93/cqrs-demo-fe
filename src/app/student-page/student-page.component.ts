import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

  @Input()
  studentId = "";

  @Output()
  pageClosed = new EventEmitter<void>();

  close(): void {
    this.pageClosed.emit();
  }
}
