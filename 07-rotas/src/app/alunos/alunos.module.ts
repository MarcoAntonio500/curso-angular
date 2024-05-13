import { AlunosGuard } from './../guards/alunos.guard';
import { NgModule } from "@angular/core";
import { AlunosComponent } from "./alunos.component";
import { CommonModule } from "@angular/common";

import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from "./alunos.routing.module";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunosService } from "./alunos.service";
import { FormsModule } from "@angular/forms";
import { AlunosDeactivadeGuard } from "../guards/alunos-deactivade.guard";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";


@NgModule({
    imports: [
        CommonModule,
        AlunosRoutingModule,
        FormsModule,
    ],
    exports: [],
    declarations: [
        AlunosComponent,
        AlunoFormComponent,
        AlunoDetalheComponent,
    ],
    providers: [
      AlunosService,
      AlunosDeactivadeGuard,
      AlunoDetalheResolver,
      AlunosGuard


    ],



})
export class AlunosModule{}
