import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpCachedResponse} from '../../shared/model/common.type';

export const CacheInterceptor: (x: number) => HttpInterceptorFn = (duration: number) => (req, next) => {
    // Only manage Get request. Other http request method are ignored
    if (req.method !== 'GET') {
        return next(req);
    }

    const cachedResponse: HttpCachedResponse = JSON.parse(sessionStorage.getItem(req.urlWithParams));
    if (cachedResponse && new Date().getTime() < cachedResponse.expireAt) {
        // If there is a cached response that is not expired, return the cache
        return of(new HttpResponse({
            status: 200,
            body: cachedResponse.data
        }));
    }

    // If there is no cached response for this request that is not expired, send the request and save the response in the cache
    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                sessionStorage.setItem(req.urlWithParams, JSON.stringify({
                    expireAt: new Date().getTime() + (duration * 60000),
                    data: event.body
                }));
            }
        })
    );
}
