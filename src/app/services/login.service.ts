import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "usuario/";

  getUsuario(email:string, pwd: string) {
    return this.http.get(`${this.URL}getusuario.php?email=${email}&pwd=${pwd}`);
  }
  getUsuarioLogueado(){
    let key = localStorage.getItem('token');
    let user = null
    if (key!= null)
      user = JSON.parse(key);
    return user;
  }
}
