import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivadeGuard } from '../guards/alunos-deactivade.guard';
import { Aluno } from './aluno';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';


const AlunosRoutes: Routes = [
    {path: '', component: AlunosComponent,
      canActivateChild: [AlunosGuard],
      children: [
        {path: 'novo', component: AlunoFormComponent},
        {path: ':id', component: AlunoDetalheComponent,
          resolve: { aluno: AlunoDetalheResolver}},
        {path: ':id/editar', component: AlunoFormComponent,
          canDeactivate: [AlunosDeactivadeGuard]},
    ]},


];
export const routing: ModuleWithProviders<RouterModule>= RouterModule.forChild(AlunosRoutes);

@NgModule({
  imports: [RouterModule.forChild(AlunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
