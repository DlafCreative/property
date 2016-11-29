import { Component }  from '@angular/core';

import { Router, ActivatedRoute }     from '@angular/router';

@Component({
  selector: 'prop-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    isOnLoginPage: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.router.events.subscribe((currentRoute) => {
            this.isOnLoginPage = !(currentRoute.url !== '/');
        });
    }
}