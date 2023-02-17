import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditStudentMode } from '../enums/edit-student-mode';

@Component({
  selector: 'app-edit-form-page',
  templateUrl: './edit-form-page.component.html',
  styleUrls: ['./edit-form-page.component.css']
})
export class EditFormPageComponent {

  @Input()
  editstudentMode = EditStudentMode.EDIT_DATA;

  @Input()
  studentId = "";

  @Output()
  pageClosed = new EventEmitter<void>();

  back(): void {
    this.pageClosed.emit();
  }
}
