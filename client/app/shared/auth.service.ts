import { Injectable } 						from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';

@Injectable()
export class AuthService {	
	constructor(private http: Http) {}

	// @todo : create wrapper service that automatizes this concatenation
	private authUrl = API_HOST + ':' + API_PORT + '/authenticate'; 

	login(username: string, password: string, customer_number: string = '') {		

		let body = JSON.stringify({
			customer_number: customer_number,
			username: username,
			password: password
		});

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.authUrl, body, options)
				   		.map( (res) => { 
                               let body = res.json();
                               return body || {}
                               } 
                            );
                        //.catch() @todo : implement error handling
	}
}