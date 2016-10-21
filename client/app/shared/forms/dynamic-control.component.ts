import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { ControlBase }     from './controls/control-base';

@Component({
  selector: 'dynamic-control',
  templateUrl: 'dynamic-control.component.html'
})
export class DynamicFormControlComponent {

  @Input() 
  control: ControlBase<any>;
  
  @Input() 
  form: FormGroup;

  get isValid() { 
    return this.form.controls[this.control.key].valid; 
  }
}