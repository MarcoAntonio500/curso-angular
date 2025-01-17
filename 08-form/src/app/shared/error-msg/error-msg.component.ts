import { Component, Input, OnInit, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() msgErro: string = '';
  //@Input() mostrarErro: boolean = false;

  @Input() control: FormControl = new FormControl;
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
    this.control.touched) {
      return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])

    }
    }
 
    return null;
  }


}
