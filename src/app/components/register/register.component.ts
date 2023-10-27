import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

import { RegistrationData } from './registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  registerForm: FormGroup;
  user: RegistrationData = {
    login: '',
    password: '',
    role: '',
  };

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }


  register() {
    this.authService.registerUser(this.user).subscribe(
      (response) => {
        // Sucesso no registro - você pode redirecionar o usuário para a página de login ou fazer qualquer ação necessária aqui.
        console.log('Registro bem-sucedido:', response);
      },
      (error) => {
        // Trate os erros aqui, por exemplo, exibindo uma mensagem de erro ao usuário.
        console.error('Erro durante o registro:', error);
      }
    );
    this.router.navigate(['/login']);
  }

  goToLogin() {
    // Navegue para a tela de login quando o botão "Back to Login" for clicado
    this.router.navigate(['/login']); // Substitua '/login' pela rota real da tela de login
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
