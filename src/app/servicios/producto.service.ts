import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class productoService {

  url = 'http://localhost/siat/src/app/php/producto/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consultar.php`);
  }
  
  insertar(articulo: any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(articulo));
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  editar(datos: any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));
  }
}
