import { Component }  from '@angular/core';

import { Router, ActivatedRoute }     from '@angular/router';

@Component({
  selector: 'prop-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        let currentRoute$ = this.route;
    }
}