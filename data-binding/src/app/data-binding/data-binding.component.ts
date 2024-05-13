import { Component, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})


export class DataBindingComponent {
  url: string = 'http://youtube.com/capjoga';
  cursoAngular: boolean = true;
  urlImagem = 'https://img.freepik.com/fotos-premium/paisagem-magica-majestosa-da-fantasia-com-ilustracao-3d-dos-raios-do-sol-da-cachoeira-do-rio-das-montanhas_598586-1969.jpg';
  
  valorAtual: string ='';
  valorSalvo: string ='';

  isMouseOver: boolean = false;
  
  nome: string= 'marco';
  pessoa: any = {
    nome: 'marco',
    idade: 22


  }

  nomeDoCurso: string ='Angular';
  novoValor: number = 0;
  valorIni: number = 10;
  onMudouValor(evento: any){
    console.log(evento.novoValor);
    

  }

  
  

  getValor(){
    return 1;

  }
  getCurtirCurso(){
    return true;
  }

  botaoClicado(){

    alert('Botão clicado')
  }
  

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;

  }
  salvarValor(valor: string) {
    this.valorSalvo = valor;
  }

  OnMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;

  }
}

