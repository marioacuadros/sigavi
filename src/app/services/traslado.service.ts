import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "traslado/";
  addTraspaso(traspaso: any) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(traspaso));
  }

  listProyecto(){
    return this.http.get(`${this.URL}list_proyecto.php`);
  }
  list(id:number){
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  printTraslado(lote: any) {
    return this.http.post(`${this.URL}prn_traslado.php`, JSON.stringify(lote), { responseType: 'blob' });
  }


}
