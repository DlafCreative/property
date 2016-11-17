import { Injectable } 						from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';

import { HttpClient }						from './lib/http-client.service';

@Injectable()
export class SessionService {	
	
	private authPath = 'authenticate'; 

	constructor(private httpClient: HttpClient, private http: Http) {}

	login(payload: {
		username: string,
		password: string,
		customer_number: string
	}) {
		return this.httpClient.post(this.authPath, payload);
	}
}