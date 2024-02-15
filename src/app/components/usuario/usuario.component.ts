import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  addForm: FormGroup
  constructor(private frmBuilder: FormBuilder,
              private usuarioService:UsuarioService
  ){
    this.addForm = this.frmBuilder.group({
      usuario: ['', Validators.required],
      rol: ['', Validators.required],
      pwd:['', Validators.pattern("^[a-zA-Z0-9]{8,15}$")],
      identificacion: ['', Validators.required],
    });
  }

  usuario:Usuario = {
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
  usuarios:any=null
  key:string=''
  roles:any=null
  modoEdicion : boolean = false

  ngOnInit(): void {
    this.getKeyUser()
    this.listRol()
    this.list()
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }

  list(){
    this.usuarioService.list().subscribe(
      result => {
          this.usuarios = result;
      }
    );
  }

  listRol(){
    this.usuarioService.listRol().subscribe(
      result => {
          this.roles = result;
      }
    );
  }

  getUsuario(usuario:any){
    this.modoEdicion=true
    this.usuario = usuario
  }

  delUsuario(usuario:any){
    if(confirm('Realmente desea elimnar el registro?')){
      this.usuarioService.delUsuario(usuario).subscribe(
        data => {
          this.list();
        }
      );
    } 
  }

  addUsuario(){
    this.usuario.id_usuario = this.key
    this.usuarioService.addUsuario(this.usuario).subscribe(
      data => {
        this.list();
        this.usuario = this.usuarioEmpty
      }
    );
  }

  updateUsuario(){
    this.usuario.id_usuario = this.key
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      data => {
        this.list();
        this.usuario = this.usuarioEmpty
        this.modoEdicion = false
      }
    );
  }
}
