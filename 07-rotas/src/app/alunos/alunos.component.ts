import { Component } from '@angular/core';

import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent {

  private alunos: any[] = [];

  constructor(private alunosService: AlunosService){}


  ngOnInit() {
    this.alunos = this.alunosService.getAlunos();

  }
  getAlunos(){
    return this.alunos;
  }



}
