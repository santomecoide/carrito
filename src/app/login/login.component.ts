import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean
  password_visible: boolean
  login_form: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private af_auth: AngularFireAuth,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loading = false
    this.password_visible = false
    localStorage.setItem('auth', 'off')

    this.login_form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  login() {
    this.loading = true
    this.login_form.disable()
    
    const form_data = this.login_form.value
    const _email = form_data['email']
    const _password = form_data['password']

    this.af_auth.signInWithEmailAndPassword(_email, _password).then(res => {
      this.loading = false
      localStorage.setItem('auth', 'on')
      this.message.create('success', 'Inicio de sesion correcto')
      this.router.navigate(['/board'])
    })
    .catch(error => {
      this.loading = false
      this.login_form.enable()
      this.message.create('error', 'Problemas con el inicio de sesion')
    })
  }

}
