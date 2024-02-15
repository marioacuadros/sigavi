import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { SalidaCaja } from 'src/app/models/salida_caja'

@Injectable({
  providedIn: 'root'
})
export class SalidaCajaService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "salida_caja/";
  list(fecha:string) {
    return this.http.get(`${this.URL}list.php?fecha=${fecha}`);
  }
  delSalida(salida: SalidaCaja) {
    return this.http.get(`${this.URL}del.php?id=${salida.id}`);
  }
  addSalida(salida: SalidaCaja) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(salida));
  }
  updateSalida(salida: SalidaCaja) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(salida));
  }
  printSalida(salida: any) {
    return this.http.post(`${this.URL}prn_salida.php`, JSON.stringify(salida), { responseType: 'blob' });
  }
}
