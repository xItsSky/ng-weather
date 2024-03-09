import {HttpEvent} from '@angular/common/http';

export type SafeAny = any;

export interface HttpCachedResponse {
    expireAt: number,
    data: HttpEvent<SafeAny>
}
