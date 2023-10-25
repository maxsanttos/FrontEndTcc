import { Component } from '@angular/core';
import { Task } from '../tasks/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  taskId: number= 0;
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtenha o ID do parâmetro da URL
    this.route.queryParams.subscribe(params => {
      this.taskId = params['id'];
      this.fetchTaskDetails();
    });
  }

  fetchTaskDetails() {
    if (this.taskId) {
      // Busque os detalhes da tarefa pelo ID usando o AuthService com token
      this.authService.getTaskByIdWithToken(this.taskId).subscribe(
        (task: Task) => {
          this.task = task;
        },
        error => {
          console.error('Erro ao buscar detalhes da tarefa:', error);
        }
      );
    }
  }
  goBack() {
    this.router.navigate(['/tasks']); // Redireciona de volta para a página de tarefas
  }
}
