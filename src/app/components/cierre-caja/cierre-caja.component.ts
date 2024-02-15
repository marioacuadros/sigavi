import { Component } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { CierreCajaService } from 'src/app/services/cierre-caja.service'
import { MenuService } from 'src/app/services/menu.service'

@Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.css']
})
export class CierreCajaComponent {
  constructor(private cierreCajaService: CierreCajaService,
              private menuService: MenuService
  ){
  }  
  fecha: string = ''
  pagos: any = null
  salidas: any = null
  cerrado:boolean = false
  key:string = ''
  cierreHoy: any = null

  resumen:any = {
    pago_lote:0,
    pago_comision:0,
    devolucion:0,
    salida:0,
    total:0,
  }

  cierre:any= {
    entrada:0,
    salida:0,
    excedente:0,
  }

  ngOnInit(): void {
    this.getFecha()
    this.getCierre()
    this.getResumen()
    this.listPagos()
    this.listSalida()
    this.getKeyUser()
  }
  getFecha(){
    const now = new Date();
    this.fecha = now.toISOString().substring(0,10)
    //console.log(this.fecha)
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }

  getResumen(){
    this.cierreCajaService.resumen(this.fecha).subscribe(
      result => {
          this.resumen = result;
      }
    );
  }

  listPagos(){
    this.cierreCajaService.listPago(this.fecha).subscribe(
      result => {
          this.pagos = result;
      }
    );
  }

  listSalida(){
    this.cierreCajaService.listSalida(this.fecha).subscribe(
      result => {
          this.salidas = result;
      }
    );
  }

  addCierre(){
    this.cierre.entrada = this.resumen.pago_lote + 0
    this.cierre.salida = this.resumen.pago_comision - this.resumen.devolucion - this.resumen.salida + 0
    this.cierre.excedente = this.resumen.total + 0
    this.cierre.id_usuario = this.key
    alert('Este proceso no puede deshacerse')
    if(confirm('Realmente desea realizar el cierre?')){
      this.cierreCajaService.addCierre(this.cierre).subscribe(
        data => {
          this.cerrado = true
          location.reload(); 
        }
      );
    }
  }
  getCierre(){
    this.cierreCajaService.getCierre(this.fecha).subscribe(
      (result:any) =>{
        this.cierreHoy = result[0]
      } 
    );
    if(this.cierreHoy !== undefined && this.cierreHoy !== null)
      this.cerrado = true
  }
}
