import { Component, OnInit } from '@angular/core';
import { productoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  
  verf = false;
  productos: any[] = []; // ✅ Ahora es un array de productos
  idProducto: any;
  beditar: boolean = false; 

  producto = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: ""
  };

  validNombre = true;
  validDescripcion = true;
  validPrecio = true;
  validStock = true;

  constructor(private sProducto: productoService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
    
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idProducto = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  limpiar() {
    this.producto.nombre = "";
    this.producto.descripcion = "";
    this.producto.precio = "";
    this.producto.stock = "";
  }

  validar() {
    this.validNombre = this.producto.nombre !== "";
    this.validDescripcion = this.producto.descripcion !== "";
    this.validPrecio = this.producto.precio !== "";
    this.validStock = this.producto.stock !== "";
  }

  consulta() {
    this.sProducto.consultar().subscribe((result: any) => {
      this.productos = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validNombre && this.validDescripcion && this.validPrecio && this.validStock) {
      this.sProducto.insertar(this.producto).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar el producto ' + nombre + '?',
      text: "El proceso no podrá ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProducto(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  eliminarProducto(id: any) {
    if (!id) {
      console.error("Error: ID no definido o inválido", id);
      return;
    }
    
    this.sProducto.eliminar(id).subscribe({
      next: (datos: any) => {
        if (datos.resultado === 'OK') {
          this.consulta();
        } else {
          console.error("Error al eliminar:", datos);
        }
      },
      error: (err) => {
        console.error("Error en la solicitud HTTP:", err);
      }
    });
  }
  
  

  cargarDatos(datos: any, id: number) {
    this.producto.nombre = datos.nombre;
    this.producto.descripcion = datos.descripcion;
    this.producto.precio = datos.precio;
    this.producto.stock = datos.stock;
    this.idProducto = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();
  
    if (this.validNombre && this.validDescripcion && this.validPrecio && this.validStock) {
      // Agregar el ID del producto al objeto antes de enviarlo
      const productoEditado = {
        ...this.producto,
        id_producto: this.idProducto  // ✅ Asegurar que el ID se envíe correctamente
      };
  
      console.log("📤 Enviando JSON a editar.php:", JSON.stringify(productoEditado));
  
      this.sProducto.editar(productoEditado, this.idProducto).subscribe({
        next: (datos: any) => {
          console.log("✅ Respuesta del servidor:", datos);
  
          if (datos.resultado === 'OK') {
            this.consulta(); // Actualizar la lista de productos
          } else {
            console.error("❌ Error en la edición:", datos);
          }
        },
        error: (err) => {
          console.error("❌ Error en la solicitud HTTP:", err);
        }
      });
  
      this.mostrar(0); // Ocultar formulario después de enviar
    }
  }
  

}
