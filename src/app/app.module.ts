import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EditFormPageComponent } from './edit-form-page/edit-form-page.component';
import { StudentEntryComponent } from './student-entry/student-entry.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { AddFormPageComponent } from './add-form-page/add-form-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditFormPageComponent,
    StudentEntryComponent,
    StudentPageComponent,
    AddFormPageComponent
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
