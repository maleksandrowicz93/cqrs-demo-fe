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
import { MainPageComponent } from './pages/main-page/main-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { AddStudentPageComponent } from './pages/add-student-page/add-student-page.component';
import { EditStudentPageComponent } from './pages/edit-student-page/edit-student-page.component';
import { UpdatePasswordPageComponent } from './pages/update-password-page/update-password-page.component';

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
    CloseButtonComponent,
    MainPageComponent,
    StudentPageComponent,
    AddStudentPageComponent,
    EditStudentPageComponent,
    UpdatePasswordPageComponent
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
