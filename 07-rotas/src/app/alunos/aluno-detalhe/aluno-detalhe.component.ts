import { Aluno } from '../aluno';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent {

  aluno: any;
  inscricao: Subscription = new Subscription();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alunosService: AlunosService,

  ){}


editarContato(){

this.router.navigate(['/alunos',this.aluno.id, 'editar']);

}


  ngOnInit(){
   /* this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);
      }
    );*/

    console.log('ngOnInit: AlunoDetalheComponent')

      this.inscricao = this.route.data.subscribe(
        (info: any) => {
          console.log('recebendo o obj aluno do resolver')
          this.aluno = info.aluno;

        }
      )

  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }


}
