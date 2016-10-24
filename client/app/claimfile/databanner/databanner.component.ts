import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-databanner',
    templateUrl: 'databanner.component.html',
    styleUrls: ['databanner.component.less']
})

export class DataBannerComponent {

    @Input()
    data: any;

}