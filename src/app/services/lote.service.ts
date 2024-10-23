import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Lote } from 'src/app/models/lote'
import { Archivo } from 'src/app/models/archivo'

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "lote/";

  listLote(id:number) {
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }

  changeState(lote: Lote) {
    return this.http.get(`${this.URL}change_state.php?id=${lote.id}`);
  }

  delLote(lote: Lote) {
    return this.http.get(`${this.URL}del.php?id=${lote.id}`);
  }
  addLote(lote: Lote) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(lote));
  }
  updateLote(lote: Lote) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(lote));
  }
  search(key:string, id:number){
    return this.http.get(`${this.URL}search.php?key=${key}&id=${id}`);
  }
  cargarLote(archivo:Archivo) {
    return this.http.post(`${this.URL}load_file.php`, JSON.stringify(archivo));
  }

  listLoteEstado(id:number, l:number, e:number) {
    return this.http.get(`${this.URL}list_estado.php?id=${id}&l=${l}&e=${e}`);
  }

  listLotePago(id:number, l:number, idUsuario:string){
    return this.http.get(`${this.URL}list_pago.php?id=${id}&l=${l}&u=${idUsuario}`);
  }

  getLote(id:number){
    return this.http.get(`${this.URL}get_lote.php?id=${id}`);
  }

}
