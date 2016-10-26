import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'prop-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.less']
})
export class EditorComponent {

    @HostBinding('class.prop-container') true;

}