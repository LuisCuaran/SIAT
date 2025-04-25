import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class detalleventaService {

  url = 'http://localhost/siat/src/app/php/detalleventa/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }
  
  insertar(detalleVenta: any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(detalleVenta));
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  editar(datos: any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));
  }
}
