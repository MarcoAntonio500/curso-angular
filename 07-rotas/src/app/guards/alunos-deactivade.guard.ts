import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";

@Injectable()

export class AlunosDeactivadeGuard implements CanDeactivate<AlunoFormComponent> {


  canDeactivate(
    Component: AlunoFormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

      console.log('guarda de rota CanDeactivate')

      return Component.podeMudarRota();
}

}
