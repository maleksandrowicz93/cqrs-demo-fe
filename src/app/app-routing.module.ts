import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { AddStudentPageComponent } from './pages/add-student-page/add-student-page.component';
import { EditStudentPageComponent } from './pages/edit-student-page/edit-student-page.component';
import { UpdatePasswordPageComponent } from './pages/update-password-page/update-password-page.component';

const routes: Routes = [
  {
    path: 'add-student',
    component: AddStudentPageComponent
  },
  {
    path: 'students',
    component: MainPageComponent,
  },
  {
    path: 'students/:id', 
    component: StudentPageComponent
  },
  {
    path: 'students/:id/edit-data', 
    component: EditStudentPageComponent
  },
  {
    path: 'students/:id/update-password', 
    component: UpdatePasswordPageComponent
  },
  {
    path: '**',
    redirectTo: 'students'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
