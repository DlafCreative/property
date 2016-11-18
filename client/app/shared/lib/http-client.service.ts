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
                'Content-Type': 'application/vnd.api+json', 
                'Authorization': `Bearer ${localStorage.getItem('prop_access_token')}`
            }) 
        });
    }

    get(path: string) {
        let fullUrl = this._getUrl(path);
        return this.http.get(fullUrl, this.reqOptions)
                        .map(this._mapResponse);
    }

    post(path: string, payload: any, toJsonApi = false) {
        let fullUrl = this._getUrl(path);
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

    private _getUrl(path: string) {
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
}