import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { LoteService } from 'src/app/services/lote.service'
import { ComunService } from 'src/app/services/comun.service'
import { ProyectoService } from 'src/app/services/proyecto.service'
import { MenuService } from 'src/app/services/menu.service'
import { Lote } from 'src/app/models/lote'
import { Archivo } from 'src/app/models/archivo'

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css']
})
export class LoteComponent {
  filterForm: FormGroup
  addForm: FormGroup
  fileForm: FormGroup
  constructor(private frmBuilder: FormBuilder,
              private loteService: LoteService,
              private comunService: ComunService,
              private proyectoService: ProyectoService,
              private menuService: MenuService
  ) 
  {
    this.filterForm = this.frmBuilder.group({
    palabraBuscar:[],
    proyecto: ['', Validators.required],
    strFile:[]
    })
    this.addForm = this.frmBuilder.group({
      numero: [0, Validators.required],
      tamano:[0, Validators.required],
      valor:[0, Validators.required],
      estado:['', Validators.required],
      comision:['', Validators.required],
    });
    this.fileForm = this.frmBuilder.group({
      descripcion:['', Validators.required],
      strFile:['', Validators.required],
      })
  }
  lote: Lote = {
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
  }

  archivo: Archivo = {
    id:0,
    id_parametro_detalle: 6,
    id_origen:0,
    descripcion:'',
    nombre:'',
    base64: '',
    id_secuencia:2, //secuencia para archivo de lotes
  }

  key:string=''  
  lotes: any = null
  loteEmpty = this.lote
  modoEdicion : boolean = false
  idDepartamento : number = 10
  departamentos: any = null
  municipios:any = null
  respuesta:any = null
  archivos:any = null
  estados:any = null
  proyectos:any=null
  strFile:any=null
  key_user:string=''
  rol:string = ''
  solo_lectura : number = 0

  ngOnInit(): void {
    this.listProyecto()
    this.listEstado()
    this.getKeyUser()
    this.getLectura()
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    let rol = localStorage.getItem('rol');
    if (key!==null)
      this.key_user = key
    if (rol!=null){
      this.rol = rol
    }
  }

  getLectura(){
    this.menuService.getLectura(5, this.rol).subscribe(
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

  listLote(idProyecto: number){
    this.lote.id_proyecto = idProyecto
    this.loteService.listLote(idProyecto).subscribe(
      result => {
          this.lotes = result;
      }
    );
  }
  searchLote(){
    this.loteService.search(this.key, this.lote.id_proyecto).subscribe(
      result => {
          this.lotes = result;
          this.key = '';
      }
    );
  }

  changeState(lote:Lote){
    this.loteService.changeState(lote).subscribe(
      data => {
        this.listLote(lote.id_proyecto);
      }
    );
  }
  
  delLote(lote:Lote){
    if(confirm('Realmente desea elimnar el registro?')){
      this.loteService.delLote(lote).subscribe(
        data => {
          this.listLote(lote.id_proyecto);
        }
      );
    }  
  }
  getLote(lote:Lote){
    this.modoEdicion = true;
    this.lote = lote;
    //console.log(this.lote)
    this.listLote(lote.id_proyecto)
  }
  addLote(){
    this.lote.id_usuario = this.key_user
    this.loteService.addLote(this.lote).subscribe(
      data => {
        this.resetLote();
        this.listLote(this.lote.id_proyecto);
        this.lote = this.loteEmpty
      }
    );
  }
  updateLote(){
    this.lote.id_usuario = this.key_user
    this.loteService.updateLote(this.lote).subscribe(
      data => {
        this.resetLote();
        this.listLote(this.lote.id_proyecto);
      }
    );
  }
  resetLote(){
    this.lote = this.loteEmpty
  }

  loadFile(e:any){
    let fileReader = new FileReader()
    let selectedFile = e.target.files[0]
    let fileType = ''
    this.archivo.id_origen = this.lote.id
    //console.log(this.archivo)
    fileType = selectedFile.name.split('.')[1]
    if (fileType !== 'pdf'){
      alert('Tipo de archivo inválido')
    }else{
      fileReader.readAsDataURL(selectedFile)
      fileReader.onload=()=>{
        let result = fileReader.result;
        let strFile:any = result
        this.archivo.base64 = strFile
        //console.log(this.archivo)
        this.comunService.cargarArchivo(this.archivo).subscribe(
          result => {
              this.respuesta = result;
              this.listArchivos(this.lote);
              //console.log(this.respuesta)
          }
        );
      }
    }
  }
  listArchivos(lote: Lote){
    this.getLote(lote);
    this.comunService.listArchivo(lote.id, 6).subscribe(//6 es id parametro detalle para doumento de lote
      result => {
          this.archivos = result;
      }
    );
  }
  delArchivo(id:number, lote:Lote){
    if(confirm('Realmente desea elimnar el registro?')){
      this.comunService.delArchivo(id).subscribe(
        data => {
          this.listArchivos(lote);
        }
      );
    }  
  }
  listEstado(){
    //id parámetro para los estados es 2
    this.comunService.listDetalle(2).subscribe(
      result => {
          this.estados = result;
      }
    );
  }
  cargarLote(e:any){
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
        this.archivo.id_origen = this.lote.id_proyecto
        this.archivo.base64 = this.strFile
        //console.log(this.strFile)
        this.loteService.cargarLote(this.archivo).subscribe(
          result => {
              this.respuesta = result;
              this.listLote(this.lote.id_proyecto)
          }
        );
      }
    }
  }
}
