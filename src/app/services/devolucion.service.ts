import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "devolucion/";

  addDevolucion(lote: any) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(lote));
  }
  listProyecto(){
    return this.http.get(`${this.URL}list_proyecto.php`);
  }
  list(id:number){
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  printDevolucion(lote: any) {
    return this.http.post(`${this.URL}prn_devolucion.php`, JSON.stringify(lote), { responseType: 'blob' });
  }
}
