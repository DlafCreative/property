import { 
    Component, 
    HostBinding, 
    ViewChild 
}   from '@angular/core';

import { ActivatedRoute }           from '@angular/router';

import { ClaimFileActions }         from '../../../actions';
import { FormPartService }          from '../form/form-part.service';

import { DamageFormComponent }      from '../form/damage-form.component';
import { ClaimFileFormComponent }   from '../form/claimfile-form.component';
import { ContractFormComponent }    from '../form/contract-form.component';
import { CustomerFormComponent }    from '../form/customer-form.component';

import * as Rx                      from 'rxjs';
import { select }                   from 'ng2-redux';

@Component({
    selector: 'prop-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.less']
})
export class EditorComponent {

    @HostBinding('class.prop-container-wide')

    /** Observable of form part parameter in the url */
    private formPartParamSub$: any

    /** Form part to display */
    private form: string;

    private currentForm;

    /**
     * Links to form components
     */
    @ViewChild(CustomerFormComponent)
    private customerForm: CustomerFormComponent;

    @ViewChild(ContractFormComponent)
    private contractForm: ContractFormComponent;

    @ViewChild(ClaimFileFormComponent)
    private claimfileForm: ClaimFileFormComponent;

    @ViewChild(DamageFormComponent)
    private damageForm: DamageFormComponent;

    /** Listen to current claimfile ID */
    @select(['claimFile', 'currentClaimFile', 'wan']) claimFileId$: Rx.Observable<string>;

    constructor(
        private route: ActivatedRoute, 
        private claimFileActions: ClaimFileActions,
        private formPartService: FormPartService) {}

    ngOnInit() {
        this.formPartParamSub$ = this.route.params.subscribe((params) => {
            this.form = params['form'];
            this.currentForm = this[`${params['form']}Form`];
        });
    }

    submitAll() {
        let state = this.claimFileActions.getState();
        let claimFileId = state.claimFile.currentClaimFile.wan ? state.claimFile.currentClaimFile.wan : 
                            null;

        let allForms = [this.customerForm, this.contractForm, this.claimfileForm, this.damageForm];
        let formToSubmit = [];
        let formInvalidFlag = false;

        for (let form of allForms) {
            if (form.isDirty()) {
                // Check if form is valid
                if (!form.isValid()) {
                    formInvalidFlag = true;
                    break;
                }
                // If form is dirty, then put it in embargo
                formToSubmit.push(form);
            }
        }

        if (formInvalidFlag) { // @todo : use Notifier Service
            alert('Un formulaire est incomplet ou invalide');
        }
        else {
            this.claimFileActions.submitFormParts(claimFileId, formToSubmit);
        }

    }

    ngOnDestroy() {
        /*if (!confirm('Modifications will be lost')) { //@todo : implement, use Notifier Service
            return false;
        }*/
        this.formPartParamSub$.unsubscribe();
    }

}