import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProyectoService } from 'src/app/services/proyecto.service';
import { PagoService } from 'src/app/services/pago.service'
import { LoteService } from 'src/app/services/lote.service';
import { DevolucionService } from 'src/app/services/devolucion.service'
import { PersonaService } from 'src/app/services/persona.service'
import { TrasladoService  } from 'src/app/services/traslado.service'
import { MenuService } from 'src/app/services/menu.service'
import { LoginService } from 'src/app/services/login.service'
import { Venta } from 'src/app/models/venta';
import { Traspaso } from 'src/app/models/traspaso'

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  addTraspase: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private loteService: LoteService,
    private pagoService: PagoService,
    private devolucionService: DevolucionService,
    private personaService: PersonaService,
    private trasladoService: TrasladoService,
    private menuService: MenuService,
    private loginService: LoginService
  )
  {
    this.filterForm = this.frmBuilder.group({
      proyecto: [],
      lote: [],
    });
    this.addForm = this.frmBuilder.group({
      pago: ['', Validators.required],
    });
    this.addTraspase = this.frmBuilder.group({
      idNuevo: ['', Validators.required],
    });

  }
  pago: Venta = {
    id:0,
    id_lote: 0,
    numero: 0,
    id_proyecto: 0,
    proyecto: '',
    id_asociado : '',
    asociado: '',
    id_asesor: '',
    asesor: '',
    fecha: '',
    pago:0,
    valorLote:0,
    saldo:0,
    id_tipo:0,
    tipo:'',
    id_usuario:'',
  }

  traspaso:Traspaso = {
    id:0,
    id_lote: 0,
    numero: 0,
    id_proyecto: 0,
    proyecto: '',
    id_asociado : '',
    asociado: '',
    id_nuevo: '',
    nuevo:'',
    fecha: '',
    pago:0,
    valorLote:0,
    saldo:0,
    id_asesor:0,
    id_usuario:'',
  }

  proyectos:any = null
  lotes:any = null
  idLote: number = 0
  pagos:any = null
  lote:any = null
  pagoEmpty = this.pago
  idAsociado: string = ''
  asociado:string = ''
  key:string=''
  rol:string = ''
  solo_lectura : number = 0
  respuesta:any = null
  user:any = null
  idUsuario:string = ''

  ngOnInit(): void {
    this.listProyecto()
    this.getKeyUser()
    this.getLogueado()
    this.getLectura()

  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }

  getLectura(){
    this.menuService.getLectura(10, this.rol).subscribe(
      result => {
          this.respuesta = result;
          this.solo_lectura = this.respuesta.lectura
      }
    );
  }

  getLogueado(){
    let user = this.loginService.getUsuarioLogueado();
    if(user!=null)
    {
      this.user = user
      this.rol = user.id_rol
      this.idUsuario = user.identificacion
    }
  }

  listProyecto(){
    this.proyectoService.listProyecto().subscribe(
      result => {
          this.proyectos = result;
      }
    );
  }

  listLote(idProyecto: number, idLote:number){
    if(this.rol == '5'){
      this.loteService.listLotePago(idProyecto, idLote, this.idUsuario).subscribe(
        result => {
            this.lotes = result;
        }
      );
    }else{
      this.loteService.listLotePago(idProyecto, idLote, 'xxxxxx').subscribe(
        result => {
            this.lotes = result;
        }
      );
    }
  }

  listPago(lote:any){
    this.pago.proyecto = lote.proyecto
    this.pago.numero = lote.numero
    this.pago.valorLote = lote.valor_lote
    this.pago.saldo = lote.saldo
    this.pago.id_lote = lote.id_lote
    this.pago.id_asociado = lote.id_asociado
    this.pago.asociado = lote.asociado
    this.pago.id_tipo = lote.id_tipo
    this.pago.tipo = lote.tipo
    this.lote = lote
    this.pagoService.listPago(lote.id_lote).subscribe(
      result => {
          this.pagos = result;
      }
    );
  }

  addPago(){
    this.pago.id_usuario = this.key
    if (this.pago.pago <= this.pago.saldo){
      this.pagoService.createPago(this.pago).subscribe(
        data => {
          this.listLote(this.lote.id_proyecto,0)
          this.listPago(this.lote);
          this.pago = this.pagoEmpty
        }
      );
    }else{
      alert("El valor sobrepasa el saldo")
  }
}

  printPago(pago:Venta){
    this.pagoService.printPago(pago).subscribe(
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
  delPago(pago:Venta){
    pago.id_usuario = this.key
    if(confirm('Realmente desea elimnar el registro?')){
      this.pagoService.delPago(pago.id).subscribe(
        data => {
          this.listLote(this.lote.id_proyecto,0)
          this.listPago(this.lote);
          this.pago = this.pagoEmpty
        }
      );
    }   
  }
  returnLote(lote:any){
    lote.id_usuario = this.key
    alert("Usted está a punto de realizar la devolución del inmueble, está acción no se puede deshacer")
    if(confirm('Confirme si desea aplicar la devolución del inmueble')){
      this.devolucionService.addDevolucion(lote).subscribe(
        data => {
          this.listLote(lote.id_proyecto,0)
          this.pago = this.pagoEmpty
        }
      );
    }   
  }
  traspaseLote(lote:any){
    alert("Las acciones de traspaso no se puede deshacer")
    this.traspaso.id_proyecto = lote.id_proyecto
    this.traspaso.proyecto = lote.proyecto
    this.traspaso.numero = lote.numero
    this.traspaso.valorLote = lote.valor_lote
    this.traspaso.saldo = lote.saldo
    this.traspaso.id_lote = lote.id_lote
    this.traspaso.id_asociado = lote.id_asociado
    this.traspaso.asociado = lote.asociado
    this.traspaso.id_asesor = lote.id_asesor
    this.traspaso.id_usuario = this.key
    this.lote = lote
  }
  getAsociado(){
    this.personaService.getPersona(this.idAsociado, 1).subscribe(
      (result:any) => {
        if(result!=null)
        {
          this.asociado = result[0].nombre;
        }
      }
    );
  }
  addTraspaso(){
    this.traspaso.id_nuevo = this.idAsociado
    if(confirm('Confirme si desea aplicar el traslado del inmueble'))
    this.trasladoService.addTraspaso(this.traspaso).subscribe(
      data => {
        this.listLote(this.traspaso.id_proyecto,0)
      }
    );
  }
}
