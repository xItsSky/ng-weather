import {inject, Injectable} from '@angular/core';
import {LocationStore} from '../stores/location.store';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    readonly #locationStore = inject(LocationStore);

    /**
     * Add a location
     * @param zipcode the zipcode of the location to add
     */
    addLocation(zipcode: string) {
        this.#locationStore.addLocation(zipcode);
    }

    /**
     * Remove a location
     * @param zipcode the zipcode of the location to remove
     */
    removeLocation(zipcode: string) {
        this.#locationStore.removeLocation(zipcode);
    }
}
