import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service'
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {
  apiUrl: any;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }

  override loadByID(id: any) {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }
}