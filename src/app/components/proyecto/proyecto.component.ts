import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ProyectoService } from 'src/app/services/proyecto.service'
import { ComunService } from 'src/app/services/comun.service'
import { MenuService } from 'src/app/services/menu.service'
import { Proyecto } from 'src/app/models/proyecto'
import { Archivo } from 'src/app/models/archivo'

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {
  filterForm: FormGroup
  addForm: FormGroup
  fileForm: FormGroup
  constructor(private frmBuilder: FormBuilder,
              private proyectoService: ProyectoService,
              private comunService: ComunService,
              private menuService: MenuService
  ) 
  {
    this.filterForm = this.frmBuilder.group({
    palabraBuscar:[]
    })
    this.addForm = this.frmBuilder.group({
      proyecto: ['', Validators.required],
      numero:[],
      departamento:['', Validators.required],
      municipio:['', Validators.required],
      vereda:[],
      longitud:[],
      latitud:[],
      valor:[],
      cantidad:['', Validators.required],
      tipo:['', Validators.required],
    });
    this.fileForm = this.frmBuilder.group({
      descripcion:['', Validators.required],
      strFile:['', Validators.required],
      })
  }
  proyecto: Proyecto = {
    id:0,
    nombre: '',
    numero_aprobacion: '',
    id_municipio: 0,
    vereda: '',
    latitud: 0,
    longitud: 0,
    valor: 0,
    cantidad_lotes: 0,
    municipio:'',
    id_tipo:0,
    tipo: '',
  }

  archivo: Archivo = {
    id:0,
    id_parametro_detalle: 1,
    id_origen:0,
    descripcion:'',
    nombre:'',
    base64: '',
    id_secuencia:1,
  }

  key:string=''  
  proyectos: any = null
  proyectoEmpty = this.proyecto
  modoEdicion : boolean = false
  idDepartamento : number = 10
  departamentos: any = null
  municipios:any = null
  respuesta:any = null
  archivos:any = null
  tipos:any = null
  rol:string = ''
  solo_lectura : number = 0

  ngOnInit(): void {
    this.listProyecto()
    this.listDepartamento()
    this.listMunicipio()
    this.listTipo()
    this.getKeyUser()
    this.getLectura()
  }

  getKeyUser(){
    let rol = localStorage.getItem('rol');
    if (rol!=null){
      this.rol = rol
    }
  }

  getLectura(){
    this.menuService.getLectura(4, this.rol).subscribe(
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
  searchProyecto(){
    this.proyectoService.search(this.key).subscribe(
      result => {
          this.proyectos = result;
          this.key = '';
      }
    );
  }

  changeState(proyecto:Proyecto){
    this.proyectoService.changeState(proyecto).subscribe(
      data => {
        this.listProyecto();
      }
    );
  }
  
  delProyecto(proyecto:Proyecto){
    if(confirm('Realmente desea elimnar el registro?')){
      this.proyectoService.delProyecto(proyecto).subscribe(
        data => {
          this.listProyecto();
        }
      );
    }  
  }
  getProyecto(proyecto:Proyecto){
    this.modoEdicion = true;
    this.proyecto = proyecto;
    //console.log(this.proyecto)
    this.listProyecto()
  }
  addProyecto(){
    this.proyectoService.addProyecto(this.proyecto).subscribe(
      data => {
        this.resetProyecto();
        this.listProyecto();
        this.proyecto = this.proyectoEmpty
      }
    );
  }
  updateProyecto(){
    this.proyectoService.updateProyecto(this.proyecto).subscribe(
      data => {
        this.resetProyecto();
        this.listProyecto();
      }
    );
  }
  resetProyecto(){
    this.proyecto = this.proyectoEmpty
  }
  listDepartamento(){
    this.comunService.listDepartamento().subscribe(
      result => {
          this.departamentos = result;
      }
    );
  }
  listMunicipio(){
    this.comunService.listMunicipio(this.idDepartamento).subscribe(
      result => {
          this.municipios = result;
      }
    );
  }
 
  loadFile(e:any){
    let fileReader = new FileReader()
    let selectedFile = e.target.files[0]
    let fileType = ''
    this.archivo.id_origen = this.proyecto.id
    console.log(this.archivo)
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
              this.listArchivos(this.proyecto);
              //console.log(this.respuesta)
          }
        );
      }
    }
  }
  listArchivos(proyecto: Proyecto){
    this.getProyecto(proyecto);
    this.comunService.listArchivo(proyecto.id, 1).subscribe(
      result => {
          this.archivos = result;
      }
    );
  }
  delArchivo(id:number, proyecto:Proyecto){
    if(confirm('Realmente desea elimnar el registro?')){
      this.comunService.delArchivo(id).subscribe(
        data => {
          this.listArchivos(proyecto);
        }
      );
    }  
  }
  listTipo(){
    this.comunService.listDetalle(4).subscribe(
      result => {
        this.tipos = result
      }
    )
  }
}