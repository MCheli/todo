import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }

  // Get individual task
  getTask(id): Observable<any> {
    return this.http.get('api/task/' + id);
  }

  // Create new task
  createTask(text): Observable<any> {
    const body = {'text': text};
    return this.http.post('/api/task', body);
  }

  // Update individual task
  updateTask(task): Observable<any> {
    return this.http.put('/api/task/' + task.id, task);
  }

  // Update multiple tasks
  updateTasks(tasks): Observable<any> {
    const body = {'tasks': tasks};
    return this.http.put('/api/tasks', body);
  }

  // Delete individual task
  deleteTask(task): Observable<any> {
    return this.http.delete('/api/task/' + task.id);
  }

}
