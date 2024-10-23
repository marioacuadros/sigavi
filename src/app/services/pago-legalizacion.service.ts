import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class PagoLegalizacionService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "pago_legalizacion/";

  addPago(pago: any){
    return this.http.post(`${this.URL}add.php`, JSON.stringify(pago));

  }
  listPago(id:number){
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  printPago(pago: any) {
    return this.http.post(`${this.URL}prn_pago.php`, JSON.stringify(pago), { responseType: 'blob' });
  }

  delPago(pago: any){
    return this.http.get(`${this.URL}del.php?id=${pago.id}&id_lote=${pago.id_lote}`);
  }

}
