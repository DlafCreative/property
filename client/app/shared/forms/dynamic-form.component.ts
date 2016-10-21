import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { ControlBase }              from './controls/control-base';
import { FormGeneratorService }    from './form-generator.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ FormGeneratorService ]
})
export class DynamicFormComponent implements OnInit {
  
  @Input() controls: ControlBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  
  constructor(private formGenService: FormGeneratorService) {  }
  
  ngOnInit() {
    this.form = this.formGenService.toFormGroup(this.controls);
  }
  
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}