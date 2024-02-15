import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service'
import { Usuario } from 'src/app/models/usuario'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private router:Router,
    private loginService: LoginService,
  ){
    this.loginForm = this.frmBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  usuario: Usuario = {
    id:0,
    usuario:'',
    debe_cambiar:0,
    usuario_key:'',
    id_rol:0,
    activo:0,
    id_usuario:'',
    password:'',
    identificacion:'',
  }
  usuarioEmpty = this.usuario
  email:string = ''
  password:string = ''
  logueado: boolean = false


  login(){
    this.loginService.getUsuario(this.email, this.password).subscribe(
      (result:any) =>{
        this.usuario = result[0]
        this.validar();
      } 
    );
  }
  validar(){
    if (this.usuario !== undefined){
      this.logueado = true
      localStorage.setItem('token', JSON.stringify(this.usuario))
      localStorage.setItem('key', JSON.stringify(this.usuario.usuario_key))
      localStorage.setItem('rol', JSON.stringify(this.usuario.id_rol))
      localStorage.setItem('id', JSON.stringify(this.usuario.identificacion))
      this.router.navigate(['home']);
      location.reload(); 
    }else{
      alert('Usuario o password incorrecto');
      this.usuario = this.usuarioEmpty
      this.email = ''
      this.password = ''
    }
  }
}
