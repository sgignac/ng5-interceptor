import { IErrorHandlingAction } from './my-http-interceptor';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor{

    constructor(private _router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //send the newly created request
        return next.handle(req.clone())
        .catch((error, caught) => {

            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                
            } else {
                // The backend returned an unsuccessful response code.
                this.performAction(this.getAction(error));
            }
            //return the error to the method that called it
            return Observable.throw(error);
        }) as any;
    }

    performAction(action:IErrorHandlingAction){
        if(action){
            //List all actions here
            switch(action.action){
                case 'redirect':
                    this._router.navigateByUrl(action.url);
                    break;
                case 'ignore':
                    //do nothing for the moment
                    break;
                default:
                    //do nothing
            }
        }
    }

    getAction(error): IErrorHandlingAction{
        let errs: IErrorHandlingAction[] = [];
        
        // First check for erros with pattern
        errs = HTTP_ERROR_CODES.filter(c => (c.code === error.status) && ((c.pattern) && (c.pattern !== "")));
        if(errs.length > 0){
            for(let err of errs){
                let urlPattern = new RegExp(err.pattern);
                if(urlPattern.test(error.url)){
                    return err
                }
            }            
        }

        // If no pattern has been found or matched; continue with standard
        errs = HTTP_ERROR_CODES.filter(c => (c.code === error.status));
        if(errs.length > 0){
            return errs[0]
        }

        return null
    }
}


export interface IErrorHandlingAction{
    code: number,
    action: string,
    url?: string,
    pattern?: string
}
/**
 * LIST OF ALL SUPPORTED ERROR CODES
 * 
 *  code: number;   the error code that will be returned by the service
 *  action: string ['redirect' | 'ignore']; the action to perform.
 *  url: string; the url used for redirection; leave empty or remove for ignore action
 *  pattern: string; A RegEx pattern to test agains the error url. Used to different actions for different service
 */
export const HTTP_ERROR_CODES:IErrorHandlingAction[] = [
    { code: 400, action: 'redirect', url: '/error' },
    { code: 401, action: 'redirect', url: '/error' },
    { code: 402, action: 'redirect', url: '/error' },
    { code: 403, action: 'redirect', url: '/error' },
    { code: 404, action: 'redirect', url: '/error' },
    { code: 405, action: 'redirect', url: '/error' },
    { code: 406, action: 'redirect', url: '/error' },
    { code: 407, action: 'redirect', url: '/error' },
    { code: 408, action: 'redirect', url: '/error' },
    { code: 409, action: 'redirect', url: '/error' },
    { code: 410, action: 'redirect', url: '/error' },
    { code: 411, action: 'redirect', url: '/error' },
    { code: 412, action: 'redirect', url: '/error' },
    { code: 413, action: 'redirect', url: '/error' },
    { code: 414, action: 'redirect', url: '/error' },
    { code: 415, action: 'redirect', url: '/error' },
    { code: 416, action: 'redirect', url: '/error' },
    { code: 417, action: 'redirect', url: '/error' },
    { code: 418, action: 'redirect', url: '/error' },
    { code: 421, action: 'redirect', url: '/error' },
    { code: 422, action: 'redirect', url: '/error' },
    { code: 423, action: 'redirect', url: '/error' },
    { code: 424, action: 'redirect', url: '/error' },
    { code: 426, action: 'redirect', url: '/error' },
    { code: 428, action: 'redirect', url: '/error' },
    { code: 429, action: 'redirect', url: '/error' },
    { code: 431, action: 'redirect', url: '/error' },
    { code: 451, action: 'redirect', url: '/error' },
    { code: 500, action: 'redirect', url: '/error' },
    { code: 501, action: 'redirect', url: '/error' },
    { code: 502, action: 'redirect', url: '/error' },
    { code: 503, action: 'redirect', url: '/maintenance' },
    { code: 503, action: 'redirect', url: '/error', pattern: '^(?=.*sebdevlab.com).*$'},
    { code: 503, action: 'redirect', url: '/nohit', pattern: '^(?=.*belair.com).*$' },
    { code: 504, action: 'ignore', url: '' },
    { code: 505, action: 'redirect', url: '/error' },
    { code: 506, action: 'redirect', url: '/error' },
    { code: 507, action: 'redirect', url: '/error' },
    { code: 508, action: 'redirect', url: '/error' },
    { code: 510, action: 'redirect', url: '/error' },
    { code: 511, action: 'redirect', url: '/error' }
]