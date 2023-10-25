import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  taskId: number = 0;

  constructor(private router:Router){}

  navigateToSearch() {
    // Redirecione para a página de busca de tarefa, passando o ID como parâmetro
    if (this.taskId) {
      this.router.navigate(['/search'], { queryParams: { id: this.taskId } });
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
