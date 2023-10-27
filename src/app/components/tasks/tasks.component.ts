import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from 'src/app/service/task.service';

import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  taskId: number = 0;
  fetchedTask: Task | undefined;



  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    );
  }

  // Organiza as tarefas em colunas com base no status
  getTasksByStatus(status: string): any[] {
    return this.tasks.filter(task => task.completedStatus === status);
  }

 // Método para deletar uma tarefa
  deleteTask(taskId: number): void {
    const authToken = this.authService.getToken();

    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      this.taskService.deletarTarefa(taskId, headers).subscribe(
        () => {
          // Após a exclusão bem-sucedida, recarregue as tarefas para atualizar a lista
          this.loadTasks();
        },
        (error) => {
          console.error('Erro ao deletar a tarefa:', error);
        }
      );
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  openAddTaskModal() {
    this.router.navigate(['/addTask']);
  }

  updateTask(taskId: number): void {
    this.router.navigate(['/updateTask', taskId]);
  }
}
