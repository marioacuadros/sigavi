import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { PagoComisionService } from 'src/app/services/pago-comision.service'
import { LoginService } from 'src/app/services/login.service'
import { MenuService } from 'src/app/services/menu.service'
import { PagoComision } from 'src/app/models/pago_comision'

@Component({
  selector: 'app-pago-comision',
  templateUrl: './pago-comision.component.html',
  styleUrls: ['./pago-comision.component.css']
})
export class PagoComisionComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private pagoComisionService: PagoComisionService,
    private loginService: LoginService,
    private menuService: MenuService
  ){
    this.filterForm = this.frmBuilder.group({
      sl_proyecto: [],
      txt_idAsesor:[],
    });
    this.addForm = this.frmBuilder.group({
      pago: ['', Validators.required],
    });
  }

  pago:PagoComision = {
    id:0,
    id_lote:0,
    id_asesor:'',
    valor:0,
    id_usuario:'',
    proyecto:'',
    numero:'',
    valor_lote:0,
    saldo:0,
    comision:0,
    pago_comision:0,
    saldo_comision:0,
    tipo:'',
    id_proyecto:0
  }

  pagoEmpty:PagoComision=this.pago
  proyectos:any = null
  lotes:any = null
  key:string=''
  idProyecto:number=0
  idLote:number=0
  idAsesor:string=''
  pagos:any = null
  comisiones:any=null
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

  getLectura(){
    this.menuService.getLectura(14, this.rol).subscribe(
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


  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }
  
  listProyecto(){
    this.proyectoService.listProyecto().subscribe(
      result => {
          this.proyectos = result;
      }
    );
  }
  
  listLote(idProyecto:number, idAsesor:string){
    this.idAsesor = idAsesor
    if (this.rol == '5')
      this.idAsesor = this.idUsuario
    this.pagoComisionService.listLote(idProyecto, this.idAsesor).subscribe(
      result => {
          this.lotes = result;
      }
    );
  }
  
  listPago(lote:any){
    this.pago = lote
    this.pagoComisionService.listPago(this.pago.id_lote).subscribe(
      result => {
          this.comisiones = result;
      }
    );
  }

  printPago(pago:any){
    this.pagoComisionService.printPago(pago).subscribe(
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


  delPago(pago:any){
    pago.id_usuario = this.key
    if(confirm('Realmente desea elimnar el registro?')){
      this.pagoComisionService.delPago(pago.id).subscribe(
        data => {
          this.listLote(this.idProyecto,'')
          this.pago = this.pagoEmpty
        }
      );
    }   
  }

  addPago(){
    this.pago.id_usuario = this.key
    console.log(this.pago)
    if (this.pago.valor <= this.pago.saldo_comision || this.pago.saldo_comision==null){
      this.pagoComisionService.createPago(this.pago).subscribe(
        data => {
          this.listLote(this.idProyecto,'')
          this.pago = this.pagoEmpty
        }
      );
    }else{
      alert("El valor sobrepasa el saldo")
    }
  }

}
