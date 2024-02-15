import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { PagoComision } from '../models/pago_comision';

@Injectable({
  providedIn: 'root'
})
export class PagoComisionService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "pago_comision/";
  listLote(id:number, id_asesor:string){
    return this.http.get(`${this.URL}list.php?id=${id}&id_asesor=${id_asesor}`);
  }
  createPago(pago: PagoComision) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(pago));
  }
  printPago(pago: any) {
    return this.http.post(`${this.URL}prn_pago.php`, JSON.stringify(pago), { responseType: 'blob' });
  }
  delPago(id:number){
    return this.http.get(`${this.URL}del.php?id=${id}`);
  }
  listPago(id:number){
    return this.http.get(`${this.URL}list_pago.php?id=${id}`);
  }
}
