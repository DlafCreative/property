import { Component, HostBinding }   from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

@Component({
    selector: 'prop-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.less']
})
export class EditorComponent {

    form: string;

    private sub$: any

    @HostBinding('class.prop-container') true;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub$ = this.route.params.subscribe((params) => {
            this.form = params['form'];
        });
    }

    ngOnDestroy() {
        /*if (!confirm('Modifications will be lost')) { //@todo : implement
            return false;
        }*/
        this.sub$.unsubscribe();
    }

}