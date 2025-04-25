import { Component, OnInit } from '@angular/core';
import { orden_trabajoService } from 'src/app/servicios/orden-tarabajo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  verf = false;
  orden_trabajo: any[] = []; // Evita errores
  idOrden: any;
  beditar:boolean=false;

  // Objeto para manejar el formulario
  orden = {
    cliente: "",
    descripcion: "",
    fecha: "",
    estado: ""
  }

  // Variables para validación
  validCliente = true;
  validDescripcion = true;
  validFecha = true;
  validEstado = true;
  

  constructor(private ordenService: orden_trabajoService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  // Mostrar u ocultar formulario
  mostrar(dato: any) {
    switch(dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idOrden = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  limpiar() {
    this.orden.cliente = "";
    this.orden.descripcion = "";
    this.orden.fecha = "";
    this.orden.estado = "";
  }

  validar() {
    this.validCliente = this.orden.cliente !== "";
    this.validDescripcion = this.orden.descripcion !== "";
    this.validFecha = this.orden.fecha !== "";
    this.validEstado = this.orden.estado !== "";
  }

  consulta() {
    this.ordenService.consultar().subscribe((result: any) => {
      this.orden_trabajo = result;
    });
  }

  ingresar() {
    this.validar();
    
    if (this.validCliente && this.validDescripcion && this.validFecha && this.validEstado) {
      this.ordenService.insertar(this.orden).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, cliente: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar la orden de' + cliente + '?',
      text: "El proceso no podrá ser revertido.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarOrden(id);
        Swal.fire({
          title: "Eliminado",
          text: "La orden ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }

  eliminarOrden(id: any) {
    if (!id){
      console.error("ID no definido o invalido", id);
      return;
    }
    this.ordenService.eliminar(id).subscribe({
      next: (datos: any) => {
      if (datos.resultado ==='OK') {
        this.consulta();
      } else {
        console.error("Error al eliminar", datos);
      }
    
      },
      error:(err) => {
        console.error("Error en la solicitud HTTP:", err);
      }      
    });
  }

  cargardatos(datos: any, id: number) {
    //console.log("Cargando datos de la orden:", datos, "ID recibido:", id);
    this.orden.cliente = datos.cliente;
    this.orden.descripcion = datos.descripcion;
    this.orden.fecha = datos.fecha;
    this.orden.estado = datos.estado;
    this.idOrden = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();

    if (this.validCliente && this.validDescripcion && this.validFecha && this.validEstado) {
      //Agregar el ID de la orden al objeto antes de enviarlo
      const ordenEditada = {
        ...this.orden_trabajo,
        id_orden: this.idOrden //Asegurar que el ID se envie correctamente
      };
      console.log("Enviando JSON a editar.php:",
        JSON.stringify(ordenEditada));

        this.ordenService.editar(ordenEditada, this.idOrden). subscribe({
          next: (datos: any) => {
            console.log("Respuesta del servidor:", datos);

            if (datos.resultado === 'OK'){
              this.consulta(); //Actualizar la lista de ordenes
            } else {
              console.error("Error en la edicion:", datos);
            }
          },
          error: (err)=>{
            console.error("Error en la solicitud:", err);
          }
        });
        this.mostrar(0); //Ocultar formulario despues de enviar
    }
  }
}
