import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      institutionalEmail: [''], 
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registro exitoso', formData);

      localStorage.setItem('registeredUser', JSON.stringify({
        username: formData.username,
        password: formData.password,
      }));

      if (this.selectedFile) {
        console.log('Archivo de credencial:', this.selectedFile);
      }

      this.router.navigate(['/login']); 
    } else {
      console.log('Formulario inválido');
    }
  }
}

