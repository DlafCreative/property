import { Component }      from '@angular/core';

import { SessionActions } from '../../../actions';

@Component({
  selector: 'prop-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less']
})
export class HeaderComponent {
    constructor(private sessionActions: SessionActions) {}
}