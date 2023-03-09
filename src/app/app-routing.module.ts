import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentPageComponent } from './add-student-page/add-student-page.component';
import { EditStudentPageComponent } from './edit-student-page/edit-student-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { UpdatePasswordPageComponent } from './update-password-page/update-password-page.component';

const routes: Routes = [
  { path: 'add-student', component: AddStudentPageComponent },
  {
    path: 'students', 
    component: MainPageComponent,
    children: [{ 
      path: ':id', 
      component: StudentPageComponent, 
      children: [
        { path: 'edit-data', component: EditStudentPageComponent }, 
        { path: 'update-password', component: UpdatePasswordPageComponent }
      ]
    }]
  },
  {
    path: '**', redirectTo: 'students'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
