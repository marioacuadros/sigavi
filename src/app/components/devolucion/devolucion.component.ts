import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevolucionService } from 'src/app/services/devolucion.service'
import { MenuService } from 'src/app/services/menu.service'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})

export class DevolucionComponent {
  filterForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private devolucionService: DevolucionService,
    private menuService: MenuService,
    private loginService:LoginService
  )  
  {
    this.filterForm = this.frmBuilder.group({
      proyecto: [],
      lote: [],
    });
  }

  proyectos:any = null
  lotes:any = null
  id_proyecto: number= 0
  rol:string = ''
  solo_lectura : number = 0
  respuesta:any = null


  ngOnInit(): void {
    this.getLogueado()
    this.getLectura()
    this.listProyecto()
  }

  getLogueado(){
    let user = this.loginService.getUsuarioLogueado();
    if(user!=null)
    {
      this.rol = user.id_rol
    }
  }

  getLectura(){
    this.menuService.getLectura(11, this.rol).subscribe(
      result => {
          this.respuesta = result;
          this.solo_lectura = this.respuesta.lectura
      }
    );
  }

  listProyecto(){
    this.devolucionService.listProyecto().subscribe(
      result => {
          this.proyectos = result;
      }
    );
  }

  list(id:number){
    this.devolucionService.list(id).subscribe(
      result => {
          this.lotes = result;
      }
    );
  }

  prnDevolucion(lote:any){
    this.devolucionService.printDevolucion(lote).subscribe(
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
