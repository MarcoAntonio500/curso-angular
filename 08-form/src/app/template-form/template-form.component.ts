import { CepService } from '../shared/cep-service/cep.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrl: './template-form.component.css',
})
export class TemplateFormComponent {

  formValue: NgForm | undefined

  usuario: any = {
    nome: null,
    email: null
  }
  form: NgForm | undefined;

  cep: string = '';
  endereco: any = {};

    constructor(
      private CepService: CepService,
      private http: HttpClient
      ){}

  onSubmit(form: NgForm): void{
    //this.form = form;
    //this.FormDebugService.printFormData(form)

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(
        map((res: any) => res)
      )
      .subscribe((dados: any) => {
        console.log(dados)
        form.form.reset()
      });
      
  }



  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any){
    return{
      'class.is-invalid': this.verificaValidTouched(campo),
      'class.valid-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any, form: NgForm) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.CepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
