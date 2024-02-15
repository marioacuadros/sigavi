import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Archivo } from 'src/app/models/archivo'

@Injectable({
  providedIn: 'root'
})
export class ComunService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "comun/";
  listDepartamento() {
    return this.http.get(`${this.URL}list_departamento.php`);
  }
  listMunicipio(id: number) {
    return this.http.get(`${this.URL}list_municipio.php?id=${id}`);
  }
  cargarArchivo(archivo:Archivo) {
    return this.http.post(`${this.URL}load_document.php`, JSON.stringify(archivo));
  }
  listArchivo(idOrigen: number, idTipo: number) {
    return this.http.get(`${this.URL}list_archivos.php?id_origen=${idOrigen}&id_tipo=${idTipo}`);
  }
  delArchivo(id:number) {
    return this.http.get(`${this.URL}del_archivo.php?id=${id}`);
  }
  listDetalle(id:number) {
    return this.http.get(`${this.URL}list_detalle.php?id=${id}`);
  }
}
