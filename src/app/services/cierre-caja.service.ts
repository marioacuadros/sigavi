import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CierreCajaService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "cierre_diario/";

  resumen(fecha:string) {
    return this.http.get(`${this.URL}resumen.php?fecha=${fecha}`);
  }
  listPago(fecha:string) {
    return this.http.get(`${this.URL}list_pago.php?fecha=${fecha}`);
  }
  listSalida(fecha:string) {
    return this.http.get(`${this.URL}list_salida.php?fecha=${fecha}`);
  }
  addCierre(cierre: any) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(cierre));
  }
  getCierre(fecha:string) {
    return this.http.get(`${this.URL}get_cierre.php?fecha=${fecha}`);
  }
}
