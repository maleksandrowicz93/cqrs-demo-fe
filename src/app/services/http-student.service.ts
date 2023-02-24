import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { StudentDto } from '../interfaces/StudentDto';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';

@Injectable({
  providedIn: 'root'
})
export class HttpStudentService {

  readonly url = "http://localhost:8000/cqrs-demo/student";

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Array<StudentIdentifiaction>> {
    return this.http.get<Array<StudentIdentifiaction>>(this.url);
  }

  getStudentById(id: string): Observable<StudentDto> {
    return this.http.get<StudentDto>(this.getUrl(id));
  }

  private getUrl(id: string) {
    return this.url + "/" + id;
  }

  addStudent(request: SaveStudentRequest): Observable<StudentDto> {
    return this.http.post<StudentDto>(this.url, request);
  }

  editStudent(id: string, request: SaveStudentRequest): Observable<StudentDto> {
    return this.http.put<StudentDto>(this.getUrl(id), request);
  }

  updatePassword(id: string, password: string): Observable<StudentIdentifiaction> {
    return this.http.put<StudentIdentifiaction>(this.getUrl(id) + "/password", password);
  }

  deleteStudent(id: string): Observable<string> {
    return this.http.delete<string>(this.getUrl(id));
  }
 }
