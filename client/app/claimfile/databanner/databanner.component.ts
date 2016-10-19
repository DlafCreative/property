import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-databanner',
    templateUrl: 'databanner.component.html'
})

export class DataBannerComponent {

    @Input()
    data: any;

}