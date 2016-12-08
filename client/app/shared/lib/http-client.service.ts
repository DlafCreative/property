import { Injectable }   from '@angular/core';
import { 
    Http, 
    Headers, 
    RequestOptions, 
    Response 
} 	from '@angular/http';

import { JsonApiError } from './jsonapi-error.model';

import * as Rx from 'rxjs';

@Injectable()
export class HttpClient {

    private apiUrl = `${API_HOST}:${API_PORT}/`;
    private reqOptions: RequestOptions;

    constructor(private http: Http) {
		this.reqOptions = new RequestOptions({ 
            headers: new Headers({ 
                'Content-Type': 'application/vnd.api+json'
            }) 
        });
        this.setAuthHeaders();
    }

    get(path: string) {
        let fullUrl = this._buildUrl(path);
        return this.http.get(fullUrl, this.reqOptions)
                        .map(this._mapResponse);
    }

    post(path: string, payload: any, toJsonApi = false) {
        let fullUrl = this._buildUrl(path);
        payload = toJsonApi ? this._toJsonApi(payload) : payload;
        return this.http.post(fullUrl, payload, this.reqOptions)
                            .map(
                                (res) => {
                                    return res.json() || {};
                                }
                            )
                            .catch(this._serverError);
    }

    request() {}

    /**
     * Set Authorization key for every request.
     * (note : unable to make it in the constructor as the service is instanciated before localStorage is set)
     */
    setAuthHeaders() {
        if (!this.reqOptions.headers.has('Authorization') && localStorage.getItem('prop_access_token')) {
            this.reqOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('prop_access_token')}`);
        }
    }

    flushAuthHeaders() {
        this.reqOptions.headers.delete('Authorization');
    }

    private _buildUrl(path: string) {
        return `${this.apiUrl}${path}`;
    }

    private _mapResponse(res) {
        return res.json() || {};
    }

    private _toJsonApi(payload) {
        var obj = { 
            data: {
                type: payload.resourceName,
                attributes: {}
            } 
        };
        for (let prop in payload){
            if (prop == 'resourceName')
                break;
            obj.data.attributes[prop] = payload[prop];
        }
        return obj;
    }

    /**
     * Handle http request errors.
     * Will throw an Observable of JsonApiError object if error comes straight from the backend
     */
    private _serverError(err: any) {
        if (err instanceof Response) {
            let apiErrors = err.json().errors ? new JsonApiError(err.json().errors) : null;
            return Rx.Observable.throw( apiErrors || "Oops, server error :( Check that server is running");
        }
        return Rx.Observable.throw(err || "Oops, server error :( Check that server is running");
    }
}