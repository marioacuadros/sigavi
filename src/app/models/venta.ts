export interface Venta{
    id:number
    id_lote: number
    numero: number
    id_proyecto: number
    proyecto: string
    id_asociado : string
    asociado: string
    id_asesor: string
    asesor:string
    fecha: string
    pago:number
    valorLote:number
    saldo:number
    id_tipo: number
    tipo:string
    id_usuario:string
    descuento:number
    motivo:string
    legalizacion:number
    saldo_legalizacion:number
    observacion:string
}