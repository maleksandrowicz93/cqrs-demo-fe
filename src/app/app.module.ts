import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StudentEntryComponent } from './student-entry/student-entry.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { FormsModule } from '@angular/forms';
import { SaveFormPageComponent } from './save-form-page/save-form-page.component';
import { AddStudentPageComponent } from './add-student-page/add-student-page.component';
import { EditStudentPageComponent } from './edit-student-page/edit-student-page.component';
import { UpdatePasswordPageComponent } from './update-password-page/update-password-page.component';
import { CloseButtonComponent } from './close-button/close-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StudentEntryComponent,
    StudentPageComponent,
    SaveFormPageComponent,
    AddStudentPageComponent,
    EditStudentPageComponent,
    UpdatePasswordPageComponent,
    CloseButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
