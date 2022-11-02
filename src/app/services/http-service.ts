import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TodoEntity } from '../structures/todo-entity';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }) };
  beUrl = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient) {
  }

  todoList(): Observable<TodoEntity[]> {
    return this.httpClient.get<TodoEntity[]>(this.beUrl + '/todo/all', this.httpOptions)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(
          res => {
            console.log(res)
           }));
  }

  todoSave(todoEntity: TodoEntity): Observable<TodoEntity> {
    return this.httpClient.post<TodoEntity>(this.beUrl + '/todo', todoEntity, this.httpOptions)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(
          res => {
            console.log(res)
           }));
  }

  private handleError(error: HttpErrorResponse) {
    let res = '';

    if (error.status === 0) {
      res = 'An error occurred:' + error.error;
    } else {
      res = `Message ${error.status}: ` + error.statusText;
    }

    return throwError(() => new Error(res));
  }
}
