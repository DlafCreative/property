import { 
    Component, 
    HostBinding, 
    ViewChild 
}   from '@angular/core';

import { ActivatedRoute }           from '@angular/router';

import { AppState }                 from '../../shared/appstate.service';
import { FormPartService }          from '../form/form-part.service';

import { DamageFormComponent }      from '../form/damage-form.component';

@Component({
    selector: 'prop-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.less']
})
export class EditorComponent {

    @HostBinding('class.prop-container') true;

    private form: string;

    private formPartSub$: any

    /**
     * Links to form components
     */
    @ViewChild(DamageFormComponent)
    private damageForm: DamageFormComponent;

    constructor(private route: ActivatedRoute, private formPartService: FormPartService, private appState: AppState) {}

    ngOnInit() {
        this.formPartSub$ = this.route.params.subscribe((params) => {
            this.form = params['form'];
        });
    }

    ngOnDestroy() {
        /*if (!confirm('Modifications will be lost')) { //@todo : implement
            return false;
        }*/
        this.formPartSub$.unsubscribe();
    }

    submitAll() {
        
        let claimFileId = this.appState.get('claimFileId');

        let allForms = [this.damageForm];
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
            throw new Error('Un formulaire est invalide');
        }
        else {
            console.log("Soumission des formulaires")
        }

        /*let isValidDamageForm = this.damageForm.isValid();

        if (isValidDamageForm) {
            this.formPartService.submitFormPart(
                claimFileId, this.damageForm.context, this.damageForm.getValues())
                                    .subscribe( (claimFile) => {
                                        this.appState.set('claimFile', claimFile);
                                    } );
        }*/

    }

}