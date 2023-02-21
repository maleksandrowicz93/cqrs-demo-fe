import { Injectable } from '@angular/core';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { StudentDto } from '../interfaces/StudentDto';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  private students = new Array<Student>();

  constructor() {
    this.students.push(
      {
        id: "039fb5d7-75d2-48e4-8d44-34cb8690475b",
        email: "email-01@gmal.com",
        password: "password-01",
        firstName: "firstName-01",
        lastName: "lastName-01",
        birthDate: new Date()
      },
      {
        id: "697cdb58-a251-4f65-bf43-64a00d16f3e4",
        email: "email-02@gmal.com",
        password: "password-02",
        firstName: "firstName-02",
        lastName: "lastName-02",
        birthDate: new Date()
      }
    );
  }

  findAll(): Array<StudentIdentifiaction> {
    return this.students.map(student => ({
      id: student.id,
      email: student.email
    }));
  }

  findById(id: string): StudentDto {
    let student = this.students.find(student => student.id == id);
    if (student == undefined) {
      return {} as StudentDto;
    }
    return {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate
    };
  }

  addStudent(saveStudentRequest: SaveStudentRequest): void {
    this.students.push({
      id: uuid(),
      email: saveStudentRequest.email,
      password: saveStudentRequest.password,
      firstName: saveStudentRequest.firstName,
      lastName: saveStudentRequest.lastName,
      birthDate: saveStudentRequest.birthDate
    });
  }

  editStudent(id: string, saveStudentRequest: SaveStudentRequest): void {
    let student = this.students.find(student => student.id == id);
    if (student == undefined) {
      return;
    }
    student.email = saveStudentRequest.email;
    student.password = saveStudentRequest.password;
    student.firstName = saveStudentRequest.firstName;
    student.lastName = saveStudentRequest.lastName;
    student.birthDate = saveStudentRequest.birthDate;
  }
}

interface Student {
  id: string,
  email: string,
  password: string
  firstName: string,
  lastName: string,
  birthDate: Date
}
