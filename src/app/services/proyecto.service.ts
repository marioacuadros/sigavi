import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Proyecto } from 'src/app/models/proyecto'

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "proyecto/";

  listProyecto() {
    return this.http.get(`${this.URL}list.php`);
  }

  changeState(proyecto: Proyecto) {
    return this.http.get(`${this.URL}change_state.php?id=${proyecto.id}`);
  }

  delProyecto(proyecto: Proyecto) {
    return this.http.get(`${this.URL}del.php?id=${proyecto.id}`);
  }
  addProyecto(proyecto: Proyecto) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(proyecto));
  }
  updateProyecto(proyecto: Proyecto) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(proyecto));
  }
  search(key:string){
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
}
