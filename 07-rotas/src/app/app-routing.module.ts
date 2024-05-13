import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(c => c.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard],
  },
  {path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(c => c.AlunosModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {path:'login',component: LoginComponent,

  },
  {path:'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: '**', component: PaginaNaoEncontradaComponent}

];
export const routing: ModuleWithProviders<RouterModule>= RouterModule.forRoot(routes,{useHash: true});

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
