import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { ItemComponent } from './components/item/item.component'
import { ProyectoComponent } from './components/proyecto/proyecto.component'
import { LoteComponent } from './components/lote/lote.component'
import { PersonaComponent } from './components/persona/persona.component'
import { VentaComponent } from './components/venta/venta.component'
import { PagoComponent } from './components/pago/pago.component'
import { DevolucionComponent } from './components/devolucion/devolucion.component'
import { TrasladoComponent } from './components/traslado/traslado.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { PagoComisionComponent } from './components/pago-comision/pago-comision.component'
import { SalidaCajaComponent } from './components/salida-caja/salida-caja.component'
import { CierreCajaComponent } from './components/cierre-caja/cierre-caja.component'
import { UsuarioComponent } from './components/usuario/usuario.component'
import { ReporteComponent } from './components/reporte/reporte.component'
import { CambiarPwdComponent } from './components/cambiar-pwd/cambiar-pwd.component'

const routes: Routes = [
  {path: '', component: NotFoundComponent},
  {path: 'home', component: HomeComponent},
  {path: 'item', component: ItemComponent},
  {path: 'proyecto', component: ProyectoComponent},
  {path: 'lote', component: LoteComponent},
  {path: 'persona/:id', component: PersonaComponent},
  {path: 'venta', component: VentaComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'devolucion', component: DevolucionComponent},
  {path: 'traslado', component: TrasladoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pagoComision', component: PagoComisionComponent},
  {path: 'salidaCaja', component: SalidaCajaComponent},
  {path: 'cierreDiario', component: CierreCajaComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'reporte/:id', component: ReporteComponent},
  {path: 'cambiarPw', component: CambiarPwdComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
