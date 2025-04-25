import { Component, OnInit } from '@angular/core';
import { ventasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  verf = false;
  ventas: any[] = []; // ✅ Cambiado a array vacío para evitar errores
  idVenta: number | null = null;
  beditar: boolean = false;

  venta = {
    fecha: "",
    total: "",
    fo_cliente: ""
  };

  constructor(private sVentas: ventasService) {}

  ngOnInit(): void {
    this.consulta();
  }

  // Consultar Ventas
  consulta() {
    this.sVentas.consultar().subscribe((result: any) => {
      this.ventas = Array.isArray(result) ? result : []; // ✅ Verifica que sea un array
    }, error => {
      console.error("Error al consultar ventas:", error);
    });
  }

  // Mostrar Formulario
  mostrar(dato: number) {
    if (dato === 0) {
      this.verf = false;
      this.beditar = false;
      this.idVenta = null;
      this.limpiar();
    } else {
      this.verf = true;
    }
  }

  // Limpiar Campos
  limpiar() {
    this.venta = {
      fecha: "",
      total: "",
      fo_cliente: ""
    };
  }

  // Validar Formulario
  validar(): boolean {
    return (
      this.venta.fecha.trim() !== "" &&
      this.venta.total.trim() !== "" &&
      this.venta.fo_cliente.trim() !== ""
    );
  }

  // Ingresar Venta
  ingresar() {
    if (this.validar()) {
      this.sVentas.insertar(this.venta).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
          Swal.fire("Éxito", "Venta agregada correctamente", "success");
        }
      });
      this.mostrar(0);
    } else {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }
  }

  // Cargar Datos para Editar
  cargarDatos(datos: any, id: number) {
    this.venta = { ...datos };
    this.idVenta = id;
    this.mostrar(1);
    this.beditar = true;
  }

  // Editar Venta
  editar() {
    if (this.validar() && this.idVenta !== null) {
      this.sVentas.editar(this.venta, this.idVenta).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
          Swal.fire("Éxito", "Venta editada correctamente", "success");
        }
      });
      this.mostrar(0);
    } else {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }
  }

  // Eliminar Venta con Confirmación
  pregunta(id: number) {
    Swal.fire({
      title: "¿Está seguro de eliminar esta venta?",
      text: "Este proceso no podrá ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);
      }
    });
  }

  // Eliminar Venta
  eliminar(id: number) {
    this.sVentas.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        this.consulta();
        Swal.fire("Eliminado", "La venta ha sido eliminada.", "success");
      }
    });
  }
}
