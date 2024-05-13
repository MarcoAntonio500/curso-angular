import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.models';
import { CepService } from '../shared/cep-service/cep.service';
import { Observable, empty, of } from 'rxjs';
import { __values } from 'tslib';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { CidadeBr } from '../shared/models/cidade-br.models';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent extends BaseFormComponent {
   
  //formulario: FormGroup = new FormGroup({});
  estados: EstadoBr[] = []
  cidades: CidadeBr[] = []
  //estado: Observable<EstadoBr[]> = new Observable
  cargos: Observable<any[]> = new Observable
  tecnologias: Observable<any[]> = new Observable
  newsLatter: Observable<any[]> = new Observable

  frameworks = ['Angular', 'React', 'Vue', 'Sencha']


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private CepService: CepService,
    private verificaEmailService: VerificaEmailService,
  ) {
    super()
   }

  override ngOnInit() {

    // this.verificaEmailService.verificarEmail('email@email.com').subscribe()
    // this.estado = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);
    this.cargos = of(this.dropdownService.getCargos())
    this.tecnologias = of(this.dropdownService.getTecnologias())
    this.newsLatter = of(this.dropdownService.getNewsLatter())

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estado = dados;
        console.log(this.estado);})*/

   /*this.formulario = new FormGroup({
      nome: new FormControl('null'),
      email: new FormControl('null'),
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newslatter: ['S'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.CepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados): {})

      this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : null), // Alterei para retornar null se não encontrar o estado
        switchMap((estadoId: number | null) => {
          if (estadoId !== null) {
            return this.dropdownService.getCidadesBr(estadoId);
          } else {
            return of([]); // Retorna um Observable vazio se estadoId for null
          }
        }),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades)
      
      //this.dropdownService.getCidadesBr(8).subscribe(console.log)

  }

  buildFrameworks(): FormArray {
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, [FormValidations.requiredMinCheckbox(1)])
    /*
    return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]*/
  }

  requiredMinCheckbox(min = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        const totalChecked = control.controls
          .map(control => control.value)
          .reduce((total, current) => current ? total + 1 : total, 0);
  
        return totalChecked >= min ? null : { required: true };
      }
  
      return null; 
    };
  }

  override submit() {
    console.log(this.formulario.value)
    if (this.formulario.valid){

      let valueSubmit = Object.assign({}, this.formulario.value)

      valueSubmit = Object.assign(valueSubmit, {
        frameworks: valueSubmit.frameworks
          .map((v: any, i: any) => v ? this.frameworks[i] : null)
          
      });
      console.log(valueSubmit)
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(
        map((res: any) => res)
      )
      .subscribe( dados =>{
        console.log(dados)

      },

      (error: any) => alert('erro'));
    }
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

  get emailControl() {    
   return this.formulario.get('confirmarEmail')?.hasError('equalsTo') ?? false
  }

  get emailPending() {
    return this.formulario.get('email')?.status === 'PENDING'
  }
  get emailValid() {
    return this.formulario.get('email')?.status === 'VALID'
  }
  get emailExiste() {    
    return this.formulario.get('email')?.hasError('emailInvalido') ?? false
  }

  get nomeControl() {
    return this.formulario.get('nome') as FormControl || new FormControl()
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value
  

    if (cep != null && cep !== '') {
      this.CepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  get cepControl() {
    return this.formulario.get('endereco.cep')?.hasError('cepInvalido');
  }

  populaDadosForm(dados: any) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'};
    this.formulario.get('cargo')?.setValue(cargo)
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javasscript', 'php'])
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel): obj1 === obj2

  }

  compararTecnologias(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel): obj1 === obj2

  }
  

}