import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { SalidaCajaService } from 'src/app/services/salida-caja.service'
import { SalidaCaja } from 'src/app/models/salida_caja'

@Component({
  selector: 'app-salida-caja',
  templateUrl: './salida-caja.component.html',
  styleUrls: ['./salida-caja.component.css']
})
export class SalidaCajaComponent {
  addForm: FormGroup
  constructor(private frmBuilder: FormBuilder,
              private salidaCajaService:SalidaCajaService
  ){
    this.addForm = this.frmBuilder.group({
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  salida:SalidaCaja = {
    id:0,
    descripcion:'',
    valor:0,
    id_usuario:'',
  }

  salidaEmpty = this.salida
  salidas:any=null
  key:string=''
  fecha:string=''
  modoEdicion : boolean = false

  ngOnInit(): void {
    this.getKeyUser()
    this.getDate()
    this.list()
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }

  getDate(){
    let date: Date = new Date();
    this.fecha = date.toLocaleString('es-CO', { year: 'numeric', month: 'numeric', day: 'numeric'});
  }

  list(){
    this.salidaCajaService.list(this.fecha).subscribe(
      result => {
          this.salidas = result;
      }
    );
  }

  getSalida(salida:any){
    this.modoEdicion=true
    this.salida = salida
  }

  delSalida(salida:any){
    if(confirm('Realmente desea elimnar el registro?')){
      this.salidaCajaService.delSalida(salida).subscribe(
        data => {
          this.list();
        }
      );
    } 
  }

  addSalida(){
    this.salida.id_usuario = this.key
    this.salidaCajaService.addSalida(this.salida).subscribe(
      data => {
        this.list();
        this.salida = this.salidaEmpty
      }
    );
  }

  updateSalida(){
    this.salida.id_usuario = this.key
    this.salidaCajaService.updateSalida(this.salida).subscribe(
      data => {
        this.list();
        this.salida = this.salidaEmpty
      }
    );
  }

  printSalida(salida:any){
    this.salidaCajaService.printSalida(salida).subscribe(
      (result:any) => {
          const newBlob = new Blob([result], {type: 'application/pdf'});
          const downloadLink = document.createElement('a');
          downloadLink.target = '_self';
          const fileName = 'content.pdf';
          const data = window.URL.createObjectURL(newBlob);
          downloadLink.href = data;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    );
  }
}
