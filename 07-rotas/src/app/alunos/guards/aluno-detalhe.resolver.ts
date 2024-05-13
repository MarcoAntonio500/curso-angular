import { AlunosService } from './../alunos.service';
import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from '../aluno';

@Injectable({ providedIn: 'root' })
export class AlunoDetalheResolver implements Resolve<Aluno> {

  constructor(private AlunosService: AlunosService){}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

      console.log('AlunoDetalheResolver')

      let id = route.params['id'];

    return this.AlunosService.getAluno(id);
  }
}
