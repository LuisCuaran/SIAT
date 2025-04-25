import { Component, OnInit } from '@angular/core';
import { detalleventaService } from 'src/app/servicios/detalleventa.service'; // Verifica el path correcto

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentaComponent implements OnInit {
  
  detalleVentas: any[] = [];
  detalleVenta = { cantidad: '', precioTotal: '', fo_ventas: '', fo_producto: '' };
  ventas: any[] = [];
  productos: any[] = [];
  verf = false;
  beditar = false;
  idDetalleVenta: number | null = null;

  constructor(private detalleVentaService: detalleventaService) {} // CORRIGE AQUÍ SI HAY UN ERROR EN EL NOMBRE

  ngOnInit(): void {
    this.consultar();
  }

  consultar() {
    this.detalleVentaService.consultar().subscribe((datos: any) => {
      this.detalleVentas = datos;
    });
  }

  insertar() {
    this.detalleVentaService.insertar(this.detalleVenta).subscribe((res: any) => {
      this.consultar();
      this.verf = false;
    });
  }

  editar() {
    if (this.idDetalleVenta !== null) {
      this.detalleVentaService.editar(this.detalleVenta, this.idDetalleVenta).subscribe(() => {
        this.consultar();
        this.verf = false;
        this.beditar = false;
      });
    }
  }

  cargarDatos(item: any) {
    this.detalleVenta = { ...item };
    this.idDetalleVenta = item.id_detalleventa;
    this.verf = true;
    this.beditar = true;
  }

  eliminar(id: number) {
    this.detalleVentaService.eliminar(id).subscribe(() => {
      this.consultar();
    });
  }
}
