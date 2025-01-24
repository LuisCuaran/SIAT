import { Component, OnInit } from '@angular/core';
import { clienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{

  verf=false;
  cliente:any;
  iduser:any;
  //se crea una variable tipo objeto para desarrollar insertar con campos de cliente
  user={
    nombre:"",
    direccion:"",
    telefono:"",
    email:""
  }
   //para validar
   validnombre= true;
   validdireccion = true;
   validtelefono = true;
   validemail = true;
   beditar = false;
   

  constructor (private suser:clienteService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();//Funcion limpiar declarada
    
  }

  //mostrar formulario
  mostrar(dato:any){
    switch(dato){
      case 0:
        this.verf=false;
        break;
        case 1:
          this.verf=true;
          break;
    }
  }

  limpiar(){ //Limpia cada campo del formulario
    this.user.nombre = "";
    this.user.direccion = "";
    this.user.telefono = "";
    this.user.email = "";
  }

  //para validar
  validar(){
    if(this.user.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }
    if(this.user.direccion == ""){
      this.validdireccion = false;
    }else{
      this.validdireccion = true;
    }
    if(this.user.telefono == ""){
      this.validtelefono = false;
    }else{
      this.validtelefono = true;
    }
    if(this.user.email == ""){
      this.validemail = false;
    }else{
      this.validemail= true;
    }
    
  }

  consulta() {
    this.suser.consultar().subscribe((result:any)=>{//consultar deriva exactamente de la carpeta php
      this.cliente = result;
      //console.log(this.cliente);
    })
  
  }



  ingresar(){
    //console.log(this.cat);
      this.validar();

      if(this.validnombre==true && this.validdireccion==true && this.validtelefono==true && this.validemail==true ){
    this.suser.insertar(this.user).subscribe((datos:any)=>{//se llama al servicio insertary mando los servicios donde los guarda y manda un resultado ok
      if (datos['resultado']=='OK') {
        //alert(datos['mensaje']);
        this.consulta();//muestra la consulta
      }
    })
    this.mostrar(0);//mostrar, cero para que el formulario se muestre automaticamente
    this.limpiar();
  }
  
}

pregunta(id: any, nombre:any){ //funcion 
  console.log("entro con el id " + id);
  Swal.fire({
    title: 'Esta seguro de eliminar el usuario '+ nombre +'?',
    text: "El proceso no podra ser revertido!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.borrarusuario(id);
      Swal.fire({
        title: "Eliminado!",
        text: "El usuario ha sido eliminado.",
        icon: "success"
      });
    }
  });
}
  borrarusuario(id:any){
    console.log(id);
    this.suser.eliminar(id).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
      
    });
  }

  cargardatos(datos:any, id:number){
    // console.log(datos, id);
    this.user.nombre = datos.nombre;
    this.user.direccion = datos.direccion;
    this.user.telefono = datos.telefono;
    this.user.email = datos.email;
    this.iduser = id;
    this.mostrar(1);
    this.beditar=true;
   }

}