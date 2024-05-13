import { CanDeactivate } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { FormCanDeactivadeGuard } from 'src/app/guards/form-candeactivade.guard';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  aluno: any;
  inscricao: Subscription = new Subscription();
  private formMudou: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService,

  ){}

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput(){

    this.formMudou = true
    console.log(this.formMudou)


  }

  podeMudarRota(){

    if(this.formMudou){
      confirm('tem certeza que deseja sair dessa página');

    }
    return true;
  }


}
