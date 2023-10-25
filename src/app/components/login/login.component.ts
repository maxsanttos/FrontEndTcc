import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    login: '',
    password: ''
  };
  errorMessage: string = '';
  rememberMe = false; // Renomeado para "rememberMe"
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verifique se as credenciais estão salvas no localStorage e preencha os campos, se aplicável
    const savedCredentials = localStorage.getItem('savedCredentials');
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
      this.rememberMe = true;
    }
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          // Verifique se "Remember Me" está marcado antes de salvar as credenciais
          if (this.rememberMe) {
            localStorage.setItem('savedCredentials', JSON.stringify(this.credentials));
          } else {
            // Caso contrário, remova as credenciais salvas (se houver)
            localStorage.removeItem('savedCredentials');
          }

          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = 'Token não encontrado na resposta da API.';
        }
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Credenciais inválidas. Verifique seu nome de usuário e senha.';
        } else {
          this.errorMessage = 'Ocorreu um erro durante o login. Tente novamente mais tarde.';
        }
      }
    );
  }
}
