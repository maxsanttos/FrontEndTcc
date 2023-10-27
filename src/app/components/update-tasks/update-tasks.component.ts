import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from 'src/app/service/task.service';

import { Task } from '../tasks/task.model';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.css']
})
export class UpdateTasksComponent {

  task: Task | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    // Obtenha o ID da tarefa da rota e carregue os detalhes da tarefa
    this.route.params.subscribe(params => {
      const taskId = +params['id']; // Obtenha o ID da rota

      // Carregue os detalhes da tarefa com base no ID
      this.loadTask(taskId);
    });
  }
  loadTask(taskId: number): void {
    // Obtenha o token de autenticação do authService
    const authToken = this.authService.getToken();

    if (authToken) {
      // Crie os cabeçalhos com o token de autenticação
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

      // Use o serviço TaskService para buscar os detalhes da tarefa com base no ID e os cabeçalhos com o token
      this.taskService.getTaskById2(taskId, headers).subscribe(
        (task: Task) => {
          this.task = task;
        },
        (error) => {
          console.error('Erro ao carregar a tarefa:', error);
        }
      );
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }
  updateTask(): void {
    if (this.task) {
      // Construa os detalhes da atualização da tarefa
      const taskUpdateData = {
        id: this.task.id, // ID da tarefa
        // Outros campos que você deseja atualizar
        title: this.task.title,
        description: this.task.description,
        dueDate:this.task.dueDate,
        completedStatus: this.task.completedStatus
      };
      const authToken = this.authService.getToken();

      if (authToken) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

        // Chame o serviço para atualizar a tarefa
        this.taskService.updateTask(this.task.id, taskUpdateData, headers).subscribe(
          () => {
            // Após a atualização bem-sucedida, navegue de volta para a lista de tarefas
            this.router.navigate(['/tasks']);
          },
          (error) => {
            console.error('Erro ao atualizar a tarefa:', error);
          }
        );
      } else {
        console.error('Token de autenticação não encontrado.');
      }
    }
  }
  gotBack():void{
    this.router.navigate(['/tasks']);
  }

}
