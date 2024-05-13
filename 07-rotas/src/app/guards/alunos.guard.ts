import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class AlunosGuard {


  canActivateChild(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

      //console.log(route)
      //console.log(state)
      console.log('AlunosGuard: Guarda de rota canActivateChild')


     if(state.url.includes('editar')){
        //alert('Usuario não tem acesso')
        //return false;

      }

      return true;
    }
}



