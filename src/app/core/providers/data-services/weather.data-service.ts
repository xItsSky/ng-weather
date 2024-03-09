import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Forecast} from '../../../shared/model/forecast.type';
import {CurrentConditions} from '../../../shared/model/current-conditions.type';

@Injectable({
    providedIn: 'root'
})
export class WeatherDataService {
    static URL = 'http://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';

    readonly #httpClient = inject(HttpClient);

    /**
     * HTTP call for get current conditions based on zipcode
     * @param zipcode the zipcode to use
     */
    getCurrentConditions(zipcode: string): Observable<CurrentConditions> {
        return this.#httpClient
            .get<CurrentConditions>(`${WeatherDataService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherDataService.APPID}`);
    }

    /**
     * HTTP call for get forecast based on zipcode
     * @param zipcode the zipcode to use
     */
    getForecast(zipcode: string): Observable<Forecast> {
        return this.#httpClient
            .get<Forecast>(`${WeatherDataService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherDataService.APPID}`);

    }
}
