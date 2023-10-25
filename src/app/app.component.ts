import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verificar se o usuário está autenticado (por exemplo, se o token está presente no localStorage)
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      // Se o usuário estiver autenticado, redirecione para a tela de tarefas
      this.router.navigate(['/login']);
    } else {
      // Se o usuário não estiver autenticado, redirecione para a tela de login
      this.router.navigate(['/login']);
    }
  }

}
