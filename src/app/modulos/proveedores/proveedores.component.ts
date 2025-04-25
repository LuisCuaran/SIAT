import { Component, OnInit } from '@angular/core';
import { proveedoresService } from 'src/app/servicios/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  verf = false;
  proveedores: any;
  iduser: any;
  beditar: boolean = false; // Controla si estamos en modo edición

  // Objeto para almacenar los datos del proveedor
  user = {
    nombre: "",
    direccion: "",
    telefono: "",
    email: ""
  };

  // Variables de validación
  validnombre = true;
  validdireccion = true;
  validtelefono = true;
  validemail = true;

  constructor(private suser: proveedoresService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  // Método para mostrar/ocultar el formulario
  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.iduser = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  // Limpiar el formulario
  limpiar() {
    this.user = {
      nombre: "",
      direccion: "",
      telefono: "",
      email: ""
    };
  }

  // Validar los campos del formulario
  validar() {
    this.validnombre = this.user.nombre !== "";
    this.validdireccion = this.user.direccion !== "";
    this.validtelefono = this.user.telefono !== "";
    this.validemail = this.user.email !== "";
  }

  // Consultar proveedores
  consulta() {
    this.suser.consultar().subscribe((result: any) => {
      this.proveedores = result;
    });
  }

  // Insertar un nuevo proveedor
  ingresar() {
    this.validar();

    if (this.validnombre && this.validdireccion && this.validtelefono && this.validemail) {
      this.suser.insertar(this.user).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire("Éxito", "Proveedor agregado correctamente", "success");
          this.consulta(); // Recargar la lista
          this.mostrar(0); // Ocultar formulario
          this.limpiar(); // Limpiar campos
        } else {
          Swal.fire("Error", "No se pudo agregar el proveedor", "error");
        }
      });
    }
  }

  // Preguntar antes de eliminar un proveedor
  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: `¿Está seguro de eliminar el proveedor ${nombre}?`,
      text: "El proceso no podrá ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);
      }
    });
  }

  // Eliminar un proveedor
  eliminar(id: any) {
    this.suser.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire("Eliminado!", "El proveedor ha sido eliminado.", "success");
        this.consulta(); // Recargar la lista
      } else {
        Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
      }
    });
  }

  // Cargar datos del proveedor seleccionado en el formulario para editar
  cargardatos(datos: any, id: number) {
    this.user = { ...datos }; // Copiar los datos
    this.iduser = id;
    this.mostrar(1); // Mostrar formulario de edición
    this.beditar = true;
  }

  // Editar proveedor existente
  editar() {
    this.validar();

    if (this.validnombre && this.validdireccion && this.validtelefono && this.validemail) {
      this.suser.editar(this.user, this.iduser).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire("Éxito", "Proveedor actualizado correctamente", "success");
          this.consulta(); // Recargar la lista
          this.mostrar(0); // Ocultar formulario
        } else {
          Swal.fire("Error", "No se pudo actualizar el proveedor", "error");
        }
      });
    }
  }
}
