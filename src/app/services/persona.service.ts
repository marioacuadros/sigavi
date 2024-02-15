import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Persona } from 'src/app/models/persona'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL =  GlobalConstants.apiURL + "persona/";
  constructor(private http:HttpClient) { }
  listPersona(idTipo:number) {
    return this.http.get(`${this.URL}list.php?id=${idTipo}`);
  }
  createPersona(persona: Persona) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(persona));
  }
  delPersona(persona: Persona) {
    return this.http.get(`${this.URL}del.php?id=${persona.identificacion}`);
  }
  updatePersona(persona: Persona) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(persona));
  }
  changeState(persona: Persona) {
    return this.http.get(`${this.URL}change_state.php?id=${persona.identificacion}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
  getPersona(id:string, id_tipo: number){
    return this.http.get(`${this.URL}get_by_id.php?id=${id}&id_tipo=${id_tipo}`);
  }
}
