import {inject, Injectable, Signal} from '@angular/core';
import {ConditionsAndZip} from '../../../shared/model/conditions-and-zip.type';
import {LocationStore} from '../stores/location.store';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {WeatherDataService} from '../data-services/weather.data-service';
import {map, switchMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {Forecast} from '../../../shared/model/forecast.type';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    readonly #weatherDataService = inject(WeatherDataService);
    readonly #locationStore = inject(LocationStore);

    private readonly locations = this.#locationStore.locations;

    private readonly currentConditions = toSignal(
        toObservable(this.locations).pipe(
            switchMap(locations => forkJoin(locations
                .map(location => this.#weatherDataService.getCurrentConditions(location).pipe(
                    map(conditions => ({zip: location, data: conditions} as ConditionsAndZip))))))));

    /**
     * Get the forecast based on a zipcode
     * @param zipcode the zipcode to use
     */
    getForecast(zipcode: string): Observable<Forecast> {
        return this.#weatherDataService.getForecast(zipcode);
    }

    /**
     * Get the current conditions of all locations stored in the application state
     */
    getCurrentConditions(): Signal<ConditionsAndZip[]> {
        return this.currentConditions;
    }

    /**
     * Get the Weather icon
     * @param id the weather id
     */
    getWeatherIcon(id): string {
        const iconUrl = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
        if (id >= 200 && id <= 232) {
            return iconUrl + 'art_storm.png';
        } else if (id >= 501 && id <= 511) {
            return iconUrl + 'art_rain.png';
        } else if (id === 500 || (id >= 520 && id <= 531)) {
            return iconUrl + 'art_light_rain.png';
        } else if (id >= 600 && id <= 622) {
            return iconUrl + 'art_snow.png';
        } else if (id >= 801 && id <= 804) {
            return iconUrl + 'art_clouds.png';
        } else if (id === 741 || id === 761) {
            return iconUrl + 'art_fog.png';
        } else {
            return iconUrl + 'art_clear.png';
        }
    }

}
