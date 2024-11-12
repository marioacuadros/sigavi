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
  listPago(id:string){
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  createPago(pago: Venta) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(pago));
  }
  printPago(pago: Venta) {
    return this.http.post(`${this.URL}prn_pago.php`, JSON.stringify(pago), { responseType: 'blob' });
  }
  delPago(pago:any){
    return this.http.get(`${this.URL}del.php?id=${pago.id}&id_lote=${pago.id_lote}`);
  }
  cargarVenta(archivo:any) {
    return this.http.post(`${this.URL}load_file_venta.php`, JSON.stringify(archivo));
  }
  getPago(id:number){
    return this.http.get(`${this.URL}get_pago.php?id=${id}`);
  }
  updatePago(pago: any) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(pago));
  }
  printPazSalvo(pago: any) {
    return this.http.post(`${this.URL}prn_paz_salvo.php`, JSON.stringify(pago), { responseType: 'blob' });
  }

}
