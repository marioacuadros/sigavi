import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service'

import { TrasladoService } from 'src/app/services/traslado.service'

@Component({
  selector: 'app-traslado',
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.css']
})
export class TrasladoComponent {
  filterForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private trasladoService: TrasladoService,
    private menuService: MenuService
  )  
  {
    this.filterForm = this.frmBuilder.group({
      proyecto: [],
    });
  }

  proyectos:any = null
  lotes:any = null
  id_proyecto: number= 0
  respuesta:any = null
  rol:string = ''
  solo_lectura : number = 0  


  ngOnInit(): void {
    this.listProyecto()
  }

  getKeyUser(){
    let rol = localStorage.getItem('rol');
    if (rol!=null){
      this.rol = rol
    }
  }

  getLectura(){
    this.menuService.getLectura(12, this.rol).subscribe(
      result => {
          this.respuesta = result;
          this.solo_lectura = this.respuesta.lectura
      }
    );
  }


  listProyecto(){
    this.trasladoService.listProyecto().subscribe(
      result => {
          this.proyectos = result;
      }
    );
  }

  list(id:number){
    this.trasladoService.list(id).subscribe(
      result => {
          this.lotes = result;
      }
    );
  }

  prnTraslado(lote:any){
    this.trasladoService.printTraslado(lote).subscribe(
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
