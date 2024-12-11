import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "reporte/";

  venta(fechaInicio:string, fechaFin:string) {
      return this.http.get(`${this.URL}ventas.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }

  devolucion(fechaInicio:string, fechaFin:string) {
      return this.http.get(`${this.URL}devolucion.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }

  traslado(fechaInicio:string, fechaFin:string) {
    return this.http.get(`${this.URL}traslado.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }
  
  pago(fechaInicio:string, fechaFin:string) {
    return this.http.get(`${this.URL}pago.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }

  pagoComision(fechaInicio:string, fechaFin:string) {
    return this.http.get(`${this.URL}pago_comision.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }

  cierreDiario(fechaInicio:string, fechaFin:string) {
    return this.http.get(`${this.URL}cierre_diario.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }

  cuadreDiario(fechaInicio:string, fechaFin:string) {
    return this.http.get(`${this.URL}cuadre.php?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '.xlsx');
  }
  
  public exportAsExcelVariasHojas(json: any, excelFileName: string): void {
    const sheets: { [key: string]: XLSX.WorkSheet } = {};
    const sheetNames: string[] = [];

    // Itera sobre cada clave en el JSON
    for (const key of Object.keys(json)) {
        // Verifica si el valor es un arreglo
        if (Array.isArray(json[key])) {
            // Convierte el arreglo a una hoja de cálculo
            sheets[key] = XLSX.utils.json_to_sheet(json[key]);
            sheetNames.push(key); // Agrega el nombre de la hoja
        }
    }

    // Crea el libro de trabajo con todas las hojas generadas
    const workbook: XLSX.WorkBook = {
        Sheets: sheets,
        SheetNames: sheetNames
    };

    // Convierte el libro a un buffer de Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guarda el archivo de Excel
    this.saveAsExcelFile(excelBuffer, excelFileName);  }
  
}
