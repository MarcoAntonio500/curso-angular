import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const CursosRoutes: Routes = [
  {path:'',component: CursosComponent},
  {path:'naoencontrado', component: CursoNaoEncontradoComponent},
  {path:':id',component: CursoDetalheComponent},
];
export const routing: ModuleWithProviders<RouterModule>= RouterModule.forChild(CursosRoutes);

@NgModule({
  imports: [RouterModule.forChild(CursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
