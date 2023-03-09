import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsListComponent } from './containers/students-list/students-list.component';
import { StudentEntryComponent } from './components/student-entry/student-entry.component';
import { StudentDetailsComponent } from './containers/student-details/student-details.component';
import { SaveStudentFormComponent } from './components/save-student-form/save-student-form.component';
import { AddStudentFormComponent } from './containers/add-student-form/add-student-form.component';
import { EditStudentFormComponent } from './containers/edit-student-form/edit-student-form.component';
import { UpdatePasswordFormComponent } from './containers/update-password-form/update-password-form.component';
import { CloseButtonComponent } from './components/close-button/close-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    StudentEntryComponent,
    StudentDetailsComponent,
    SaveStudentFormComponent,
    AddStudentFormComponent,
    EditStudentFormComponent,
    UpdatePasswordFormComponent,
    CloseButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
