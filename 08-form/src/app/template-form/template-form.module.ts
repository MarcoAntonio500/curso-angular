import { NgModule } from '@angular/core';
import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CepService } from '../shared/cep-service/cep.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TemplateFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],


  exports:[
    TemplateFormComponent,
  ],

  providers:[
    CepService,

  ]
})


export class TemplateFormModule { }
