import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComunService } from 'src/app/services/comun.service';
import { LoteService } from 'src/app/services/lote.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PagoService } from 'src/app/services/pago.service'
import { MenuService } from 'src/app/services/menu.service'
import { Venta } from 'src/app/models/venta';
import { Lote } from 'src/app/models/lote';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  fileForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private loteService: LoteService,
    private comunService: ComunService,
    private proyectoService: ProyectoService,
    private personaService: PersonaService,
    private pagoService: PagoService,
    private menuService: MenuService
  ) {
    this.filterForm = this.frmBuilder.group({
      proyecto: [],
      lote: [],
      strFile: [],
    });
    this.addForm = this.frmBuilder.group({
      idAsociado: [0, Validators.required],
      idAsesor: [0, Validators.required],
      pago: [0, Validators.required],
      descuento:[],
      motivo:[],
    });
    this.fileForm = this.frmBuilder.group({
      descripcion: ['', Validators.required],
      strFile: ['', Validators.required],
    });
  }

  venta: Venta = {
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
    descuento:0,
    motivo:'',
    legalizacion:0,
    saldo_legalizacion:0,
    observacion:'',
    forma_pago:''
  }

  loteVenta:Lote = {
    id:0,
    numero: 0,
    tamano: 0,
    valor:0,
    id_estado:0,
    id_proyecto:0,
    estado:'',
    proyecto:'',
    id_tipo:0,
    tipo:'',
    comision:0,
    id_usuario:'',
    legalizacion:0
  }

  archivo:any={
    base64:'',
    id_tipo: 0
  }
  proyectos:any = null
  lotes:any = null
  idLote: number = 0
  resultado:any=null
  ventaEmpty:Venta=this.venta
  key:string=''
  respuesta:any = null
  rol:string = ''
  nrol:number = 0
  solo_lectura : number = 0
  strFile:any=null

  ngOnInit(): void {
    this.listProyecto()
    this.getKeyUser()
    this.getLectura()
    
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    let rol:string|null = localStorage.getItem('rol');
    if (key!==null)
      this.key = key
    if (rol!=null){
      this.rol = rol
      this.nrol = parseInt(rol.replace(/\D/g, ""),10)|0
    }
  }

  getLectura(){
    this.menuService.getLectura(9, this.rol).subscribe(
      result => {
          this.respuesta = result;
          this.solo_lectura = this.respuesta.lectura
      }
    );
  }

  listProyecto(){
    this.proyectoService.listProyecto().subscribe(
      result => {
          this.proyectos = result;
      }
    );
  }

  listLoteLibre(idProyecto: number, idLote:number){
    //4 es el estado libre
    this.loteService.listLoteEstado(idProyecto, idLote, 4).subscribe(
      result => {
          this.lotes = result;
      }
    );
  }

  getLote(lote:Lote){
    this.loteVenta = lote;
    console.log(this.loteVenta)
    this.venta.id_lote = this.loteVenta.id
    this.venta.id_proyecto = this.loteVenta.id_proyecto
    this.venta.valorLote = this.loteVenta.valor
  }

  addVenta(){
    this.venta.id_usuario = this.key
    this.pagoService.createVenta(this.venta).subscribe(
      data => {
        this.listLoteLibre(this.venta.id_proyecto,0);
        this.venta = this.ventaEmpty
      }
    );
  }
  getAsociado(id: string){
    this.personaService.getPersona(id, 1).subscribe(
      (result:any) => {
        if(result!=null)
        {
          this.venta.asociado = result[0].nombre;
        }
      }
    );
  }
  getAsesor(id: string){
    this.personaService.getPersona(id, 2).subscribe(
      (result:any) => {
        if(result!=null)
        {
          this.venta.asesor = result[0].nombre;
        }
      }
    );
  }
  cargarVenta(e:any){
    let fileReader = new FileReader()
    let selectedFile = e.target.files[0]
    let fileType = ''
    fileType = selectedFile.name.split('.')[1]
    if (fileType !== 'csv'){
      alert('Tipo de archivo inválido')
    }else{
      fileReader.readAsDataURL(selectedFile)
      fileReader.onload=()=>{
        let result = fileReader.result;
        this.strFile = result
        this.archivo.base64 = this.strFile
        //console.log(this.strFile)
        this.pagoService.cargarVenta(this.archivo).subscribe(
          result => {
              this.respuesta = result;
              console.log(this.respuesta)
              this.listLoteLibre(this.venta.id_proyecto,0);
          }
        );
      }
    }
  }
}
