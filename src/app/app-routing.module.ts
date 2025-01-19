import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { ProveedoresComponent } from './modulos/proveedores/proveedores.component';
import { LoginComponent } from './modulos/login/login.component';
import { OrdenesComponent } from './modulos/ordenes/ordenes.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { DetalleComprasComponent } from './modulos/detalle-compras/detalle-compras.component';
import { DetalleVentasComponent } from './modulos/detalle-ventas/detalle-ventas.component';
import { DetalleOrdenTrabajoComponent } from './modulos/detalle-orden-trabajo/detalle-orden-trabajo.component';

const routes: Routes = [{

  path: "",component: PrincipalComponent,
  children: [
    {path: "dashboard", component: DashboardComponent },
    {path: "usuarios", component: UsuariosComponent },
    {path: "administracion", component: AdministracionComponent },
    {path: "clientes", component: ClientesComponent },
    {path: "ordenes", component: OrdenesComponent },
    {path: "proveedores", component: ProveedoresComponent },
    {path: "ventas", component: VentasComponent },
    {path: "compras", component: ComprasComponent },
    {path: "productos", component: ProductosComponent },
    {path: "detalle_compras",component: DetalleComprasComponent},
    {path: "detalle_ventas",component: DetalleVentasComponent},
    {path: "detalle_orden_trabajo",component: DetalleOrdenTrabajoComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"}
  ]
},
{ path: "Login", component: LoginComponent},

];

//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
