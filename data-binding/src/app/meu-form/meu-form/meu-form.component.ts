import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent {

  nome: string= 'marco';
  pessoa: any = {
    nome: 'marco',
    idade: 22


  }

}

