import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '',
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): any;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit
    }
    else {
      console.log('formulario invalido')
      this.verificaValidacoesForm(this.formulario)
    }
  }
  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      if (controle) {
        controle.markAsDirty();
        controle.markAsTouched();
        if (controle instanceof FormGroup || controle instanceof FormArray) {
          this.verificaValidacoesForm(controle);
        }
      }
    });
  }
  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): boolean {
    const campoForm = this.formulario.get(campo);
    return campoForm ? !campoForm.value && campoForm.touched : false;
  }

  verificaRequired(campo: string) {
    const campoReq = this.formulario.get(campo);
    return campoReq ? !campoReq.value && campoReq.touched : false;
    
  }

  verificaEmailInvalido() {
    const emailControl = this.formulario.get('email')
    if (emailControl && emailControl.errors){
      return emailControl.errors['email'] && emailControl.touched
    }
  }

  aplicaCssErro(campo: any){
    return{
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

}
