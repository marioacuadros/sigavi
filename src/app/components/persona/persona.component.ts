import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PersonaService } from 'src/app/services/persona.service'
import { ComunService } from 'src/app/services/comun.service'
import { MenuService } from 'src/app/services/menu.service'
import { Persona } from 'src/app/models/persona'


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  idTipoPersona:number=1
  tipoPersona:string='Persona'
  pluralTipo:string='Personas'
  constructor(private frmBuilder: FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private personaService: PersonaService,
              private comunService: ComunService,
              private menuService: MenuService
              )
  {
    this.addForm = this.frmBuilder.group({
      idTipoDocumento: [0, Validators.required],
      numeroIdentificacion:['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [],
      primerApellido: ['', Validators.required],
      segundoApellido: [], 
      fechaNacimiento:[],          
      idDepartamentoNacimiento: [],
      idMunicipioNacimiento: [],
      idDepartamentoResidencia: [],
      idMunicipioResidencia: [],
      direccion:[],
      celular:[],
    });
    this.filterForm = this.frmBuilder.group({
      palabraBuscar:[],
      strFile:[]
    })
  }

  persona:Persona ={
    identificacion:'',
    idTipoDocumento:2,
    primerNombre:'',
    segundoNombre:'',
    primerApellido:'',
    segundoApellido:'',
    fechaNacimiento:'',
    idMunicipioNacimiento:0,
    direccion:'',
    celular:'',
    idDepartamentoNacimiento:0,
    idDepartamentoResidencia:0,
    idMunicipioResidencia:0,
    municipioNacimiento:'',
    municipioResidencia:'',
    abreviatura:'',
    idTipo:0,
  }

  archivo:any={
    base64:'',
    id_tipo: 0
  }

  personaEmpty = this.persona
  key:string=''  
  personas:any=null
  modoEdicion : boolean = false
  idDepartamentoNacimiento:number = 0
  idDepartamentoResidencia:number = 0
  municipiosNacimiento: any=null
  municipiosResidencia: any=null
  departamentos: any=null
  tiposDocumento: any=null
  respuesta:any = null
  rol:string = ''
  nrol:number=0
  solo_lectura : number = 0
  strFile:any=null
  

  ngOnInit(): void {
    //this.router.navigate(['/'])
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.idTipoPersona = this.route.snapshot.params['id']
    this.persona.idTipo = this.idTipoPersona
    if (this.idTipoPersona==1)
    {
      this.tipoPersona = "Asociado"
      this.pluralTipo = "Asociados"
    }else{
      if(this.idTipoPersona==2){
        this.tipoPersona = "Asesor"
        this.pluralTipo = "Asesores"
      }
    }
    this.listPersona()
    this.listTipoDocumento()
    this.listDepartamento()
    this.getKeyUser()
  }

  getKeyUser(){
    let rol = localStorage.getItem('rol');
    if (rol!=null){
      this.rol = rol
      this.nrol = parseInt(rol.replace(/\D/g, ""),10)|0
    }
  }

  getLectura(){
    if (this.idTipoPersona ==1){
      this.menuService.getLectura(7, this.rol).subscribe(
        result => {
            this.respuesta = result;
            this.solo_lectura = this.respuesta.lectura
        }
      );
    }
    if (this.idTipoPersona ==2){
      this.menuService.getLectura(8, this.rol).subscribe(
        result => {
            this.respuesta = result;
            this.solo_lectura = this.respuesta.lectura
        }
      );
    }
  }


  changeState(persona:Persona){
    this.personaService.changeState(persona).subscribe(
      data => {
        this.listPersona();
      }
    );
  }

  getPersona(persona:Persona)
  {
    this.modoEdicion = true;
    this.persona = persona;
    this.idDepartamentoNacimiento = persona.idDepartamentoNacimiento
    this.idDepartamentoResidencia = persona.idDepartamentoResidencia
    this.listMunicipioNacimiento()
    this.listMunicipioResidencia()
  }

  delPersona(persona:Persona){
    if(confirm('Realmente desea elimnar el registro?')){
      this.personaService.delPersona(persona).subscribe(
        data => {
          this.listPersona();
        }
      );
    }  
  }
  addPersona(){
    this.personaService.createPersona(this.persona).subscribe(
      data => {
        this.resetPersona();
        this.listPersona();
      }
    );
  }
  
  updatePersona()
  {
    this.personaService.updatePersona(this.persona).subscribe(
      data => {
        this.resetPersona();
        this.listPersona();
      }
    )
  }
  listMunicipioNacimiento(){
    this.comunService.listMunicipio(this.idDepartamentoNacimiento).subscribe(
      result => {
          this.municipiosNacimiento = result;
          
      }
    );
  }
  listMunicipioResidencia(){
    this.comunService.listMunicipio(this.idDepartamentoResidencia).subscribe(
      result => {
          this.municipiosResidencia = result;
          
      }
    );
  }    
  listDepartamento(){
    this.comunService.listDepartamento().subscribe(
      result => {
          this.departamentos = result;
      }
    );
  }
  listPersona(){
    this.personaService.listPersona(this.idTipoPersona).subscribe(
      result => {
          this.personas = result;
          //console.log(this.personas)
      }
    );
  }

  resetPersona(){
    this.persona = this.personaEmpty
  }
  
  searchPersona(){
    this.personas = null
    this.personaService.search(this.key, this.idTipoPersona).subscribe(
    (result:any) => {
      if(result != null)  
        this.personas = result;
        this.key = ''
    });
  }
  listTipoDocumento(){
    //id parámetro para los tipo de documento es 3
    this.comunService.listDetalle(3).subscribe(
      result => {
          this.tiposDocumento = result;
      }
    );
  }
  
  cargarPersona(e:any){
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
          this.archivo.id_tipo = this.idTipoPersona
          //console.log(this.strFile)
          this.personaService.cargarPersona(this.archivo).subscribe(
            result => {
                this.respuesta = result;
                console.log(this.respuesta)
                this.listPersona();
            }
          );
        }
      }
    }
}
