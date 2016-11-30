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

    @HostBinding('class.prop-container') true;

    /** Observable of form part parameter in the url */
    private formPartParamSub$: any

    /** Form part to display */
    private form: string;

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

    /** Listen to current claimfile ID */
    @select(['claimFile', 'currentClaimFile', 'wan']) claimFileId$: Rx.Observable<string>;

    constructor(
        private route: ActivatedRoute, 
        private claimFileActions: ClaimFileActions,
        private formPartService: FormPartService) {}

    ngOnInit() {
        this.formPartParamSub$ = this.route.params.subscribe((params) => {
            this.form = params['form'];
        });
    }

    submitAll() {
        let claimFileId = this.claimFileActions.getState().claimFile.currentClaimFile.wan ?
                          this.claimFileActions.getState().claimFile.currentClaimFile.wan : 
                            null;

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
            this.claimFileActions.submitFormParts(claimFileId, formToSubmit);
        }

    }

    ngOnDestroy() {
        if (!confirm('Modifications will be lost')) { //@todo : implement
            return false;
        }
        this.formPartParamSub$.unsubscribe();
    }

}