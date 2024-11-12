import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoteService } from 'src/app/services/lote.service';
import { PagoService } from 'src/app/services/pago.service'
import { ComunService } from 'src/app/services/comun.service'

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
    forma_pago: []
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
  formas: any = []



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
    console.log(pago)
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
            }
            detalleValor.detalle = jsonTemp[i].forma_pago
            detalleValor.valor = jsonTemp[i].valor
            this.formas.push(detalleValor)
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
    }
    let total = 0
    if (this.forma_pago && this.valorDetalle > 0) {
      detalleValor.detalle = this.forma_pago
      detalleValor.valor = this.valorDetalle
      this.formas.push(detalleValor)
      for (let i = 0; i < this.formas.length; i++) {
        total += this.formas[i].valor
      }
      this.pago.pago = total
      this.valorDetalle = 0
      this.forma_pago = ''
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

}
