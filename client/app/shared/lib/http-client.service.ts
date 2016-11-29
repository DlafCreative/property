import { Injectable }   from '@angular/core';
import { 
    Http, 
    Headers, 
    RequestOptions, 
    Response 
} 	from '@angular/http';

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
                            /* @Todo : handle error
                            .catch()*/
    }

    request() {}

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
}