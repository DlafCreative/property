import { 
    Component, 
    HostBinding, 
    ViewChild 
}   from '@angular/core';

import { ActivatedRoute }           from '@angular/router';

import { AppState }                 from '../../shared/appstate.service';
import { FormPartService }          from '../form/form-part.service';

import { DamageFormComponent }      from '../form/damage-form.component';
import { ClaimFileFormComponent }   from '../form/claimfile-form.component';
import { ContractFormComponent }    from '../form/contract-form.component';
import { CustomerFormComponent }    from '../form/customer-form.component';

import * as Rx                      from 'rxjs';

@Component({
    selector: 'prop-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.less']
})
export class EditorComponent {

    @HostBinding('class.prop-container') true;

    private form: string;

    private formPartParamSub$: any

    /**
     * Links to form components
     */
    @ViewChild(CustomerFormComponent)
    private customerForm: CustomerFormComponent;

    @ViewChild(ContractFormComponent)
    private contractForm: ContractFormComponent;

    @ViewChild(ClaimFileFormComponent)
    private claimFileForm: ClaimFileFormComponent;

    @ViewChild(DamageFormComponent)
    private damageForm: DamageFormComponent;


    constructor(private route: ActivatedRoute, private formPartService: FormPartService, private appState: AppState) {}

    ngOnInit() {
        this.formPartParamSub$ = this.route.params.subscribe((params) => {
            this.form = params['form'];
        });
    }

    ngOnDestroy() {
        /*if (!confirm('Modifications will be lost')) { //@todo : implement
            return false;
        }*/
        this.formPartParamSub$.unsubscribe();
    }

    submitAll() {
        
        let claimFileId = this.appState.get('claimFileId');

        let allForms = [this.customerForm, this.contractForm, this.claimFileForm, this.damageForm];
        let formToSubmit = [];
        let formInvalidFlag = false;

        for (let form of allForms) {
            // Check if form is valid
            if (!form.isValid()) {
                formInvalidFlag = true;
                break;
            }

            // If form is dirty, then put it in embargo
            if (form.isDirty()) {
                formToSubmit.push(form);
            }
        }

        if (formInvalidFlag) {
            alert('Un formulaire est incomplet ou invalide');
        }
        else {
            console.log("Form submission");
            var stream$;
            
            formToSubmit.forEach((form, index) => {
                if (index === 0) {
                    stream$ = this.formPartService.submitFormPart(claimFileId, form.getContext(), form.getValues())
                }
                else {
                    let obs$ = this.formPartService.submitFormPart(claimFileId, form.getContext(), form.getValues());
                    stream$ = stream$.concat( obs$ );
                }
            });

            stream$.subscribe((claimFile) => {
                console.log(claimFile);
            })

            /**
             * More elegant way to perform what is done above
             */
            /*Rx.Observable.from(formToSubmit)
              .concatMap(
                  (form) => {
                      return this.formPartService.submitFormPart(claimFileId, form.getContext(), form.getValues());
                  }
              )
              .combineAll()
              .subscribe( (val) => {
                  console.log(val);
              } );*/
        }

    }

}