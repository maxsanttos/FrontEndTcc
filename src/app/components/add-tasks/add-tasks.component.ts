import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from 'src/app/service/task.service';

import { Task } from '../tasks/task.model';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'],
})
export class AddTasksComponent{
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    completedStatus: 'pending'
  };
  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe){
  }
  addTask() {
    const authToken = this.authService.getToken();
    console.log('Token de Autenticação:', authToken);

    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

      // Verifique se dueDate não é nulo antes de formatá-lo
      if (this.task.dueDate) {
        // Separe o dia, mês e ano
        const [day, month, year] = this.task.dueDate.split('-');

        // Formate a data como "yyyy-MM-dd" (ano-mês-dia)
        this.task.dueDate = `${year}-${month}-${day}`;
      }

      this.taskService.createTask(this.task, headers).subscribe(
        (response) => {
          // Lógica para tratar a resposta após criar a tarefa, redirecionar, etc.
          console.log('Tarefa criada com sucesso:', response);
          // Redirecionar ou executar outras ações após criar a tarefa.
        },
        (error) => {
          // Trate erros, se necessário.
          console.error('Erro ao criar tarefa:', error);

          if (error.status === 403) {
            // Tratar erro de autorização (por exemplo, redirecionar para página de login).
            console.log('Erro de autorização. Redirecionando para a página de login.');
            this.router.navigate(['/login']);
            // Código para redirecionar para a página de login.
          } else if (error.status === 400) {
            // Tratar outros erros, como erros de validação.
            console.log('Erro de validação. Verifique os dados da tarefa.');
            // Outras ações para lidar com erros de validação.
          } else {
            // Lidar com outros erros não especificados.
            console.log('Erro desconhecido. Entre em contato com o suporte técnico.');
            // Outras ações para lidar com erros não especificados.
          }
        }
      );
    }
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
}


