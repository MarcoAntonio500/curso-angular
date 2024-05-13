import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class CursosGuard {


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

      console.log('guarda de rota CanActivateChild')

      return true;
}

}
