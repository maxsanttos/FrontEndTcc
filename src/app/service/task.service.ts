import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../components/tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  getTaskById2(id: number, headers: HttpHeaders): Observable<Task> {
    const options = { headers };
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`, options);
  }

  updateTask(id: number, tarefa: any, headers: HttpHeaders): Observable<any> {
    const options = { headers };
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, tarefa, options);
  }


  // task.service.ts
  deletarTarefa(id: number, headers: HttpHeaders): Observable<any> {
    const options = { headers };
    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`, options);
  }

  createTask(tarefa: any, headers: HttpHeaders): Observable<any> {
    const options = { headers };
    return this.http.post<any>(`${this.apiUrl}/tasks`, tarefa,options);
  }

   // Obtém o token de autenticação armazenado no localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}



