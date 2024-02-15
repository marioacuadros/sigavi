import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Usuario } from 'src/app/models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "usuario/";
  list() {
    return this.http.get(`${this.URL}list.php`);
  }
  delUsuario(usuario: Usuario) {
    return this.http.get(`${this.URL}del.php?id=${usuario.id}`);
  }
  addUsuario(usuario: Usuario) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(usuario));
  }

  updateUsuario(usuario: Usuario) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(usuario));
  }

  listRol() {
    return this.http.get(`${this.URL}list_rol.php`);
  }

  updatePwd(usuario: any) {
    return this.http.post(`${this.URL}update_pwd.php`, JSON.stringify(usuario));
  }

}
