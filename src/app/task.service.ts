import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { Task } from './task';
import { catchError, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  protected basePath = 'https://nova-list.azurewebsites.net/task';
  taskNumber: string = '0';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  selectedTask: any = undefined;

  constructor(private http: HttpClient) {

  }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.basePath)
      .pipe(catchError(this.handleError<Task[]>('getTask', [])));
  }

  /** POST: add a new task to the server */
  addTask(task: Task) {
    console.log(task);
    return this.http.post(this.basePath, task);
  }

  /** PUT: update the task on the server */
  updateTask(task: Task){
    const url = `${this.basePath}/${task.id}`;
    return this.http.put(url, task)
  }

  /** DELETE: delete the Task from the server */
  deleteTask(id: number) {
    console.log('soy el service: '+ id)
    const url = `${this.basePath}/${id}`;
    console.log(url);
    return this.http.delete(url,{responseType: 'text'});
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}
