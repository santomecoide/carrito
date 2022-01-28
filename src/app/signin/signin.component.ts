import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loading: boolean
  password_visible: boolean
  signin_form: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private af_auth: AngularFireAuth,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loading = false
    this.password_visible = false

    this.signin_form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_repeat: ['', [Validators.required]]
    });
  }

  signin() {
    this.loading = true
    this.signin_form.disable()

    const form_data = this.signin_form.value
    const _email = form_data['email']
    const _password = form_data['password']
   
    if(_password != form_data['password_repeat']) {
      this.message.create('error', 'Las contrasenas no son iguales')
      this.loading = false
      this.signin_form.enable()
      return
    }
    
    this.af_auth.createUserWithEmailAndPassword(_email, _password).then(res => {
      console.log('respuesta', res)
      this.loading = false
      this.message.create('success', 'registro correcto')
      this.router.navigate(['/login'])
    })
    .catch(error => {
      console.log('error', error)
      this.loading = false
      this.signin_form.enable()
      this.message.create('error', 'Problemas con el registro')
    })
  }

}
