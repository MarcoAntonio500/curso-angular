import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EstadoBr } from '../models/estado-br.models';
import { CidadeBr } from '../models/cidade-br.models';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  estadosUrl = 'assets/dados/estadosbr.json'
  cidadesUrl = 'assets/dados/cidades.json'

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>(this.estadosUrl);
  }

  getCidadesBr(idEstado: number) {
    return this.http.get<CidadeBr[]>(this.cidadesUrl)
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: CidadeBr[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ];
  }
 getTecnologias(){
  return [

    {nome: 'java', desc: 'Java'},
    {nome: 'javascript', desc: 'JavaScript'},
    {nome: 'php', desc: 'PHP'},
    {nome: 'ruby', desc: 'Ruby'}

  ];
 }
 getNewsLatter(){
  return [

    {valor: 'S', desc: 'Sim'},
    {valor: 'N', desc: 'Não'},
    

  ];
 }
}
