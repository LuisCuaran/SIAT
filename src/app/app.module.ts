import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './estructura/header/header.component';
import { NavComponent } from './estructura/nav/nav.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { OrdenesComponent } from './modulos/ordenes/ordenes.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { ProveedoresComponent } from './modulos/proveedores/proveedores.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { DetalleVentasComponent } from './modulos/detalleventas/detalle-ventas.component';
import { DetalleComprasComponent } from './modulos/detalle-compras/detalle-compras.component';
import { DetalleOrdenTrabajoComponent } from './modulos/detalle-orden-trabajo/detalle-orden-trabajo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    LoginComponent,
    AdministracionComponent,
    UsuariosComponent,
    ClientesComponent,
    OrdenesComponent,
    VentasComponent,
    ComprasComponent,
    ProveedoresComponent,
    ProductosComponent,
    DetalleVentasComponent,
    DetalleComprasComponent,
    DetalleOrdenTrabajoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
