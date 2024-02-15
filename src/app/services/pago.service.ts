import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Venta } from 'src/app/models/venta'

@Injectable({
  
  providedIn: 'root'
})
export class PagoService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "pago/";
  createVenta(venta: Venta) {
    return this.http.post(`${this.URL}add_venta.php`, JSON.stringify(venta));
  }
  listPago(id:number){
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  createPago(pago: Venta) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(pago));
  }
  printPago(pago: Venta) {
    return this.http.post(`${this.URL}prn_pago.php`, JSON.stringify(pago), { responseType: 'blob' });
  }
  delPago(id:number){
    return this.http.get(`${this.URL}del.php?id=${id}`);
  }
}
