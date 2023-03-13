import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ErrorMessage } from '../enums/error-message';
import { SaveStudentRequest } from '../interfaces/SaveStudentRequest';
import { StudentDto } from '../interfaces/StudentDto';
import { StudentIdentifiaction } from '../interfaces/StudentIdentifiaction';
import { StudentsPage } from '../interfaces/StudentsPage';

@Injectable({
  providedIn: 'root'
})
export class HttpStudentService {

  readonly url = "http://localhost:8000/cqrs-demo/student";

  constructor(private http: HttpClient) { }

  getStudentsPage(page: number, size: number): Observable<StudentsPage> {
    let params = new HttpParams({fromObject: {
      page: page,
      size: size
    }});
    return this.http.get<StudentsPage>(this.url, { params: params }).pipe(
      tap(next => console.log("Students page loaded: ", next)), 
      catchError(err => {
        console.log(err);
        return of({
          totalPages: 0,
          students: []
        } as StudentsPage)
      })
    );
  }

  getStudentById(id: string): Observable<StudentDto> {
    console.log("triggered");
    return this.http.get<StudentDto>(this.getUrl(id)).pipe(
      tap(next => console.log("Student fetched: ", next)),
      catchError(err => this.handleError(err))
    );
  }

  private getUrl(id: string) {
    return this.url + "/" + id;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.log(err);
    let errorMessage = this.toErrorMessage(err);
    return throwError(() => errorMessage);
  }

  private toErrorMessage(err: HttpErrorResponse): ErrorMessage {
    switch(err.status) {
      case HttpStatusCode.BadRequest:
      case HttpStatusCode.NotFound:
        return ErrorMessage.STUDENT_NOT_FOUND;
      case HttpStatusCode.Conflict:
        return ErrorMessage.STUDENT_ALREADY_EXISTS;
      case HttpStatusCode.UnprocessableEntity:
        return ErrorMessage.INVALID_CREDENTIALS;
      default:
        return ErrorMessage.UNKNOWN_ERROR;
    }
  }

  addStudent(request: SaveStudentRequest): Observable<void> {
    return this.http.post<StudentDto>(this.url, request).pipe(
      tap(next => console.log("New student added: ", next)), 
      map(() => undefined), 
      catchError(err => this.handleError(err))
    );
  }

  editStudent(id: string, request: SaveStudentRequest): Observable<void> {
    return this.http.put<StudentDto>(this.getUrl(id), request).pipe(
      tap(next => console.log("Student updated with new data: ", next)), 
      map(() => undefined), 
      catchError(err => this.handleError(err))
    );
  }

  updatePassword(id: string, password: string): Observable<void> {
    return this.http.put<StudentIdentifiaction>(this.getUrl(id) + "/password", password).pipe(
      tap(next => console.log("Password updated for: ", next)), 
      map(() => undefined), 
      catchError(err => this.handleError(err))
    );
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<string>(this.getUrl(id)).pipe(
      tap(() => console.log("Deleted student with id", id)), 
      map(() => undefined), 
      catchError(err => this.handleError(err))
    );
  }
 }
