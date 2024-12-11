import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoteService } from 'src/app/services/lote.service';
import { PagoService } from 'src/app/services/pago.service'
import { ComunService } from 'src/app/services/comun.service'

import { Archivo } from 'src/app/models/archivo'

@Component({
  selector: 'app-hacer-pago',
  templateUrl: './hacer-pago.component.html',
  styleUrls: ['./hacer-pago.component.css']
})

export class HacerPagoComponent implements OnInit {

  addForm: FormGroup;

  datosLote: any = {
    id_lote: 0,
    id_proyecto: 0,
    numero: 0,
    proyecto: '',
    valor_pagado: '',
    valorLote: '',
    saldo: 0,
    id_asociado: '',
    asociado: '',
    id_asesor: '',
    asesor: '',
    id_tipo: '',
    tipo: '',
    descuento: 0,
    legalizacion: 0,
    saldo_legalizacion: 0,
    usuario: '',
    forma_pago: [],
  }


  infoPermuta:any = {
    descripcion: '',
    valor:0,
    idDetallePago: 0
  }


  id: string | null = ''
  id_proyecto: number = 0
  pagos: any
  pagoEmpty: any = this.datosLote
  pago: any = this.pagoEmpty
  key: string = ''
  pagoActual: number = 0
  editarPago: boolean = false
  formasPago: any = null
  valorDetalle: number = 0
  forma_pago: string = ''
  descuentoDetalle:number=0
  formas: any = []
  descripcionPermuta:string=''
  respuesta:any=null
  archivos:any = null
  base64:string= ''



  constructor(private route: ActivatedRoute,
    private loteService: LoteService,
    private frmBuilder: FormBuilder,
    private pagoService: PagoService,
    private comunService: ComunService,
    private router: Router,
  ) {
    this.addForm = this.frmBuilder.group({
      pago: [],
      descuento: [],
      motivo: [],
      fecha: [],
      observacion: [],
      formaPago: [],
      valorDetalle: [],
      descuentoDetalle:[],
      descripcionPermuta:[],
      archivo:[]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id_lote');
    this.getLote()
    this.listFormaPago()
    this.listPagos()
  }

  getKeyUser() {
    let key = localStorage.getItem('key');
    if (key !== null)
      this.key = key
  }

  getLote() {
    if (this.id) {
      this.loteService.getLote(this.id).subscribe(
        (result: any) => {
          this.datosLote = result[0]
          this.id_proyecto = this.datosLote.id_proyecto
          this.pago = this.datosLote
          this.pago.descuento = 0
        }
      )
    }
  }
  listPagos() {
    if (this.id) {
      this.pagoService.listPago(this.id).subscribe(
        (result: any) => {
          this.pagos = result
        }
      )
    }
  }

  printPago(pago: any) {
    this.pagoService.printPago(pago).subscribe(
      (result: any) => {
        const newBlob = new Blob([result], { type: 'application/pdf' });
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
  delPago(pago: any) {
    pago.id_usuario = this.key
    if (confirm('Realmente desea elimnar el registro?')) {
      this.pagoService.delPago(pago).subscribe(
        data => {
          this.resetPago()
          this.getLote()
          this.listPagos()
        }
      );
    }
  }
  getPago(id: number) {
    this.formas = []
    this.pagoService.getPago(id).subscribe(
      (result: any) => {
        if (result != null) {
          this.pago = result[0];
          let jsonTemp = JSON.parse(result[0].forma_pago)
          for (let i = 0; i < jsonTemp.length; i++) {
            let detalleValor: any = {
              detalle: '',
              valor: 0,
              descuento:0,
              descripcionPermuta:'',
              archivo:'',
            }
            if(jsonTemp){
              detalleValor.detalle = jsonTemp[i].forma_pago
              detalleValor.valor = jsonTemp[i].valor
              detalleValor.descuento = jsonTemp[i].descuento
              detalleValor.descripcionPermuta = jsonTemp[i].permuta
              detalleValor.archivo = jsonTemp[i].archivo
              this.formas.push(detalleValor)
            }
          }
          this.editarPago = true
          this.pagoActual = this.pago.pago
        }
      }
    );
  }
  updatePago() {
    this.pago.id_usuario = this.key
    this.pago.forma_pago = this.formas
    if ((this.pago.pago * 1 - this.pagoActual * 1) <= this.pago.saldo * 1) {
      this.pagoService.updatePago(this.pago).subscribe(
        data => {
          this.getLote()
          this.listPagos()
          this.resetPago()
        }
      );
    } else {
      alert("El valor sobrepasa el saldo")
    }
  }
  listFormaPago() {
    this.comunService.listDetalle(5).subscribe(
      result => {
        this.formasPago = result
      }
    )
  }

  resetPago() {
    this.pago = this.pagoEmpty
    this.valorDetalle = 0
    this.forma_pago = ''
    this.formas = []
    this.editarPago = false
    this.descripcionPermuta = ''
  }

  addPago() {
    this.pago.id_usuario = this.key
    this.pago.forma_pago = this.formas
    if (this.pago.pago <= this.pago.saldo) {
      this.pagoService.createPago(this.pago).subscribe(
        data => {
          this.pago = this.pagoEmpty
          this.getLote()
          this.listPagos()
          this.resetPago()
        }
      );
    } else {
      alert("El valor sobrepasa el saldo")
    }
  }

  prnPazSalvo() {
    this.pagoService.printPazSalvo(this.pago).subscribe(
      (result: any) => {
        const newBlob = new Blob([result], { type: 'application/pdf' });
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
  volver() {
    this.resetPago()
    this.router.navigate(['/pago', this.id_proyecto]);
  }

  addValor() {
    let detalleValor: any = {
      detalle: '',
      valor: 0,
      descuento:0,
      descripcionPermuta:'',
      archivo:'',
    }
    let total = 0
    let totalDescuento = 0
    if (this.forma_pago && this.valorDetalle > 0) {
      detalleValor.detalle = this.forma_pago
      detalleValor.valor = this.valorDetalle
      detalleValor.descuento = this.descuentoDetalle
      detalleValor.descripcionPermuta = this.descripcionPermuta
      detalleValor.archivo = this.base64
      this.formas.push(detalleValor)
      for (let i = 0; i < this.formas.length; i++) {
        total += this.formas[i].valor
        totalDescuento += this.formas[i].descuento
      }
      this.pago.pago = total
      this.pago.descuento = totalDescuento
      this.valorDetalle = 0
      this.forma_pago = ''
      this.descuentoDetalle = 0
      this.descripcionPermuta = ''
      this.base64 = ''
    } else {
      alert("Por favor seleccione una forma de pago y/o digite un valor correcto ")
    }
  }

  delValor(i: number, event: Event): void {
    event.preventDefault(); // Evita que el enlace navegue
    let total: number = 0;
    this.formas.splice(i, 1);
    for (let item of this.formas) {
        total += item.valor;
    }
    this.pago.pago = total;
  }
  getPermuta(detalle_pago: any){
    console.log(detalle_pago)
    this.infoPermuta.descripcion = detalle_pago.descripcionPermuta
    this.infoPermuta.valor = detalle_pago.valor
    this.infoPermuta.idDetallePago = detalle_pago.id
    this.listArchivos(detalle_pago)
  }

  loadFile(e:any){
    let fileReader = new FileReader()
    let selectedFile = e.target.files[0]
    let fileType = ''
    //console.log(this.archivo)
    fileType = selectedFile.name.split('.')[1]
    if (fileType !== 'pdf'){
      alert('Tipo de archivo inválido')
    }else{
      fileReader.readAsDataURL(selectedFile)
      fileReader.onload=()=>{
        let result = fileReader.result;
        let strFile:any = result
        this.base64 = strFile
        //console.log(this.archivo)
      }
    }
  }
  delArchivo(id:number, lote:any){
    if(confirm('Realmente desea elimnar el registro?')){
      this.comunService.delArchivo(id).subscribe(
        data => {
          this.respuesta = data;
        }
      );
    }  
  }
  
  listArchivos(detalle: any){
    this.comunService.listArchivo(detalle.id_detalle_pago, 22).subscribe(//6 es id parametro detalle para doumento de lote
      result => {
          this.archivos = result;
      }
    );
  }
}
