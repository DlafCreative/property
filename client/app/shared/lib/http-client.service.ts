import { Injectable }                       from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';

@Injectable()
export class HttpClient {

    private apiUrl = `${API_HOST}:${API_PORT}/`;
    private reqOptions: RequestOptions;

    constructor(private http: Http) {
		this.reqOptions = new RequestOptions({ 
            headers: new Headers({ 'Content-Type': 'application/vnd.api+json' }) 
        });
    }

    get(url: string) {}

    post(path: string, payload: any) {
        let fullUrl = this._getUrl(path);
        return this.http.post(fullUrl, payload, this.reqOptions)
                        .map(
                            (res) => {
                                return res.json() || {};
                            }
                        )
                        /* @Todo : handle error
                        .catch()*/
    }

    request() {}

    private _getUrl(path: string) {
        return `${this.apiUrl}${path}`;
    }
}