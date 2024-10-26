import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
      
      if (username === registeredUser.username && password === registeredUser.password) {
        console.log('Login exitoso', this.loginForm.value);
        this.router.navigate(['/home']);
      } else {
        alert('Usuario o contraseña incorrectos, o no registrado.');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

