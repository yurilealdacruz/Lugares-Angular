import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private http: HttpClient) { }

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>('http://localhost:3000/Lugares', lugar)
  }

  obterTodos() : Observable<Lugar[]> {
    return this.http.get<Lugar[]>('http://localhost:3000/Lugares')
  }

  filtrar(nome: string, categoria: string ) : Observable<Lugar[]> {

    const parametros = new HttpParams();

    if(nome) {
      parametros.set('nome_lik', nome)
    }

    if(categoria) {
      parametros.set('categoria', categoria)
    }

    return this.http.get<Lugar[]>('http://localhost:3000/Lugares', {
      params : parametros
    })
  }
}
