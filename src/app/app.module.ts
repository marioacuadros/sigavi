import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemComponent } from './components/item/item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { LoteComponent } from './components/lote/lote.component';
import { PersonaComponent } from './components/persona/persona.component';
import { VentaComponent } from './components/venta/venta.component';
import { PagoComponent } from './components/pago/pago.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
import { TrasladoComponent } from './components/traslado/traslado.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PagoComisionComponent } from './components/pago-comision/pago-comision.component';
import { SalidaCajaComponent } from './components/salida-caja/salida-caja.component';
import { CierreCajaComponent } from './components/cierre-caja/cierre-caja.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { CambiarPwdComponent } from './components/cambiar-pwd/cambiar-pwd.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    NotFoundComponent,
    MenuComponent,
    ProyectoComponent,
    LoteComponent,
    PersonaComponent,
    VentaComponent,
    PagoComponent,
    DevolucionComponent,
    TrasladoComponent,
    LoginComponent,
    HomeComponent,
    PagoComisionComponent,
    SalidaCajaComponent,
    CierreCajaComponent,
    UsuarioComponent,
    ReporteComponent,
    CambiarPwdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
