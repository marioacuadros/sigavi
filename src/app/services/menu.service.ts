import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "menu/";
  listItem(id:number) {
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }
  listAllItem() {
    return this.http.get(`${this.URL}list_all.php`);
  }

  changeState(item: Item) {
    return this.http.get(`${this.URL}change_state.php?id=${item.id}`);
  }

  delItem(item: Item) {
    return this.http.get(`${this.URL}del.php?id=${item.id}`);
  }
  listPadres() {
    return this.http.get(`${this.URL}list_padres.php`);
  }
  addItem(item: Item) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(item));
  }
  updateItem(item: Item) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(item));
  }
  search(key:string){
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }

  getLectura(id_item:number, id_rol:string){
    return this.http.get(`${this.URL}get_lectura.php?id=${id_item}&r=${id_rol}`);
  }

  getUserByKey(key:string){
    return this.http.get(`${this.URL}getusuariobykey.php?key=${key}`);
  }

}
