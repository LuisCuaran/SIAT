import { Component, OnInit } from '@angular/core';
import { compraService } from 'src/app/servicios/compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  verf = false;
  compras: any[] = [];
  idcompra: number | null = null;

  // Objeto para insertar una nueva compra
  compra = {
    fecha: '',
    total: '',
    fo_proveedores: ''
  };

  // Variables de validación
  validFecha = true;
  validTotal = true;
  validProveedor = true;
  beditar = false;

  constructor(private scompra: compraService) {}

  ngOnInit(): void {
    this.consultar();
    this.limpiar();
  }

  // Mostrar formulario
  mostrar(dato: number) {
    if (dato === 0) {
      this.verf = false;
      this.beditar = false;
      this.idcompra = null;
      this.limpiar();
    } else {
      this.verf = true;
    }
  }

  limpiar() {
    this.compra = {
      fecha: '',
      total: '',
      fo_proveedores: ''
    };
  }

  // Validar campos
  validar(): boolean {
    this.validFecha = this.compra.fecha.trim() !== '';
    this.validTotal = String(this.compra.total).trim() !== ''; // Convertir a cadena antes de usar trim()
    this.validProveedor = String(this.compra.fo_proveedores).trim() !== ''; // Convertir a cadena antes de usar trim()
    return this.validFecha && this.validTotal && this.validProveedor;
  }

  // Consultar compras desde el backend
  consultar() {
    this.scompra.consultar().subscribe(
      (result: any) => {
        this.compras = result;
      },
      (error) => {
        console.error('Error consultando compras:', error);
      }
    );
  }

  // Insertar nueva compra
  ingresar() {
    if (!this.validar()) {
      Swal.fire('Error', 'Debe llenar todos los campos correctamente.', 'error');
      return;
    }
  
    this.scompra.insertar(this.compra).subscribe(
      (datos: any) => {
        console.log("Respuesta del servidor al insertar:", datos); // Depuración
        if (datos && datos.resultado === "OK") {
          this.consultar(); // Recargar lista de compras
          Swal.fire('Guardado!', 'La compra ha sido registrada.', 'success');
          this.mostrar(0);
          this.limpiar();
        } else {
          Swal.fire('Error', 'No se pudo registrar la compra.', 'error');
        }
      },
      (error) => {
        console.error('Error al insertar compra:', error);
        Swal.fire('Error', 'No se pudo registrar la compra.', 'error');
      }
    );
  }
  
  // Confirmación para eliminar una compra
  pregunta(id: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta compra?',
      text: 'Esta acción no podrá ser revertida.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarCompra(id);
      }
    });
  }

  // Eliminar compra
  borrarCompra(id: number) {
    this.scompra.eliminar(id).subscribe(
      (datos: any) => {
        if (datos.resultado === 'OK') {
          this.consultar();
          Swal.fire('Eliminado!', 'La compra ha sido eliminada.', 'success');
        }
      },
      (error) => {
        console.error('Error al eliminar compra:', error);
      }
    );
  }

  // Cargar datos en el formulario para editar
  cargardatos(datos: any, id: number) {
    this.compra = { ...datos };
    this.idcompra = id;
    this.mostrar(1);
    this.beditar = true;
  }

  // Editar compra
  editar() {
    if (this.validar() && this.idcompra !== null) {
      this.scompra.editar(this.compra, this.idcompra).subscribe(
        (datos: any) => {
          if (datos.resultado === 'OK') {
            this.consultar();
            this.mostrar(0);
          }
        },
        (error) => {
          console.error('Error al editar compra:', error);
        }
      );
    }
  }
}
