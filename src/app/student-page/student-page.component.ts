import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditStudentMode } from '../enums/edit-student-mode';

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

  @Output()
  editFormCalled = new EventEmitter<EditStudentMode>();

  editStudentMode = EditStudentMode;

  close(): void {
    this.pageClosed.emit();
  }

  editStudent(editMode: EditStudentMode): void  {
    this.editFormCalled.emit(editMode);
  }
}
