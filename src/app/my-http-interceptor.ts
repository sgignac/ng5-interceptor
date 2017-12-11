import { HTTP_ERROR_CODES } from './my-http-interceptor';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor{

    constructor(private _router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //send the newly created request
        return next.handle(req.clone())
        .catch((error, caught) => {

            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', error.error.message);
            } else {
                // The backend returned an unsuccessful response code.
                this.performAction(this.getAction(error.status));
            }
            //return the error to the method that called it
            return Observable.throw(error);
        }) as any;
    }

    performAction(action:IErrorHandlingAction){
        //List all actions here
        switch(action.action){
            case 'redirect':
                this._router.navigateByUrl(action.url);
                break;
            case 'ignore':
                //do nothing
                break;
            default:
                //do nothing
        }
    }

    getAction(errorCode): IErrorHandlingAction{
        return HTTP_ERROR_CODES.find(c => c.code === errorCode);
    }
}

interface IErrorHandlingAction{
    code: number,
    action: string,
    url?: string,
    pattern?: string
}
const HTTP_ERROR_CODES:IErrorHandlingAction[] = [
    {code: 400, action: 'redirect', url: '/error'},
    {code: 401, action: 'redirect', url: '/error'},
    {code: 402, action: 'redirect', url: '/error'},
    {code: 403, action: 'redirect', url: '/error'},
    {code: 404, action: 'redirect', url: '/error'},
    {code: 405, action: 'redirect', url: '/error'},
    {code: 406, action: 'redirect', url: '/error'},
    {code: 407, action: 'redirect', url: '/error'},
    {code: 408, action: 'redirect', url: '/error'},
    {code: 409, action: 'redirect', url: '/error'},
    {code: 410, action: 'redirect', url: '/error'},
    {code: 411, action: 'redirect', url: '/error'},
    {code: 412, action: 'redirect', url: '/error'},
    {code: 413, action: 'redirect', url: '/error'},
    {code: 414, action: 'redirect', url: '/error'},
    {code: 415, action: 'redirect', url: '/error'},
    {code: 416, action: 'redirect', url: '/error'},
    {code: 417, action: 'redirect', url: '/error'},
    {code: 418, action: 'redirect', url: '/error'},
    {code: 421, action: 'redirect', url: '/error'},
    {code: 422, action: 'redirect', url: '/error'},
    {code: 423, action: 'redirect', url: '/error'},
    {code: 424, action: 'redirect', url: '/error'},
    {code: 426, action: 'redirect', url: '/error'},
    {code: 428, action: 'redirect', url: '/error'},
    {code: 429, action: 'redirect', url: '/error'},
    {code: 431, action: 'redirect', url: '/error'},
    {code: 451, action: 'redirect', url: '/error'},
    {code: 500, action: 'redirect', url: '/error'},
    {code: 501, action: 'redirect', url: '/error'},
    {code: 502, action: 'redirect', url: '/error'},
    {code: 503, action: 'redirect', url: '/maintenance'},
    {code: 504, action: 'ignore', url: ''},
    {code: 505, action: 'redirect', url: '/error'},
    {code: 506, action: 'redirect', url: '/error'},
    {code: 507, action: 'redirect', url: '/error'},
    {code: 508, action: 'redirect', url: '/error'},
    {code: 510, action: 'redirect', url: '/error'},
    {code: 511, action: 'redirect', url: '/error'}
]

