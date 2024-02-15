import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ReporteService } from 'src/app/services/reporte.service'


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  filterForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private reporteService: ReporteService,
              )
  {
    this.filterForm = this.frmBuilder.group({
      fechaInicio:['', Validators.required],
      fechaFin:['', Validators.required],
    })
  }

  idTipoReporte:number=0
  tituloReporte:string=''
  fechaInicio:string=''
  fechaFin:string=''
  resultados:any=null

  ngOnInit(): void {
    this.getFecha()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.idTipoReporte = this.route.snapshot.params['id']
    if (this.idTipoReporte==1)
        this.tituloReporte = 'Reporte de Ventas'
    if (this.idTipoReporte==2)
      this.tituloReporte = 'Reporte Devoluciones'
    if (this.idTipoReporte==3)
      this.tituloReporte = 'Reporte Traslados'
    if (this.idTipoReporte==4)
      this.tituloReporte = 'Reporte de Pagos'
    if (this.idTipoReporte==5)
      this.tituloReporte = 'Reporte Pago de Comisiones'
    if (this.idTipoReporte==6)
      this.tituloReporte = 'Reporte Cierre Diario'

    this.list();
    }  
  
  getFecha(){
    const now = new Date();
    this.fechaInicio = now.toISOString().substring(0,10)
    this.fechaFin = this.fechaInicio
    //console.log(this.fecha)
  }
  list(){
    if (this.idTipoReporte==1){
      this.reporteService.venta(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }
    if (this.idTipoReporte==2){
      this.reporteService.devolucion(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }
    if (this.idTipoReporte==3){
      this.reporteService.traslado(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }
    if (this.idTipoReporte==4){
      this.reporteService.pago(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }
    if (this.idTipoReporte==5){
      this.reporteService.pagoComision(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }
    if (this.idTipoReporte==6){
      this.reporteService.cierreDiario(this.fechaInicio, this.fechaFin).subscribe(
        result => {
            this.resultados = result;
        }
      );
    }

  }
  
  exportAsXLSX():void {
    this.reporteService.exportAsExcelFile(this.resultados, 'content');
 }


}
