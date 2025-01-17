import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router:Router,
              ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      console.log('AuthGuard');

      return this.verificarAcesso();

  }

  private verificarAcesso(){
    if(this.authService.usuarioEstaAutenticado()){
      return true;

    }
    else{
      this.router.navigate(['/login'])
      return false
    }

  }


  canLoad(
    route: Route,
    ): Observable<boolean> | Promise<boolean> | boolean {
      console.log('canLoad: verficando se usuario pode carregar o codigo do modulo')

      return this.verificarAcesso();
  }

}
