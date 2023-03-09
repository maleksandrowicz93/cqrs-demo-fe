import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentFormComponent } from './containers/add-student-form/add-student-form.component';
import { EditStudentFormComponent } from './containers/edit-student-form/edit-student-form.component';
import { StudentsListComponent } from './containers/students-list/students-list.component';
import { StudentDetailsComponent } from './containers/student-details/student-details.component';
import { UpdatePasswordFormComponent } from './containers/update-password-form/update-password-form.component';

const routes: Routes = [
  { path: 'add-student', component: AddStudentFormComponent },
  {
    path: 'students', 
    component: StudentsListComponent,
    children: [{ 
      path: ':id', 
      component: StudentDetailsComponent, 
      children: [
        { path: 'edit-data', component: EditStudentFormComponent }, 
        { path: 'update-password', component: UpdatePasswordFormComponent }
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
