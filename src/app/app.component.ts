import { Component } from '@angular/core';
import { HttpStudentService } from './services/http-student.service';
import { StudentNavigatorService } from './services/student-navigator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentNavigatorService, HttpStudentService]
})
export class AppComponent {

  title = "cqrs-demo-fe";
}
