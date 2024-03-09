import {getState, patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';

const storageKey = 'whether.locations';

interface LocationState {
    locations: string[];
}

const initialState: LocationState = {
    locations: [],
}

function getLocalStorage(storageKey: string) {
    return JSON.parse(localStorage.getItem(storageKey));
}

export const LocationStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withHooks({
        // Instanciate store with local storage if some data are found
        onInit(state) {
            const localData = getLocalStorage(storageKey);
            if (localData instanceof Array && localData.length > 0) {
                patchState(state, {locations: [...getState(state).locations, ...localData]});
            }
        }
    }),
    withMethods(state => {
        return {
            // Add a location to the store
            addLocation: (zipcode: string) => {
                let locations = getState(state).locations;
                if (!locations.includes(zipcode)) {
                    locations = [...locations, zipcode];
                    patchState(state, {locations});
                    localStorage.setItem(storageKey, JSON.stringify(locations));
                }
            },
            // Remove a location to the store
            removeLocation: (zipcode: string) => {
                const locations = getState(state).locations;
                if (locations.includes(zipcode)) {
                    locations.splice(locations.indexOf(zipcode), 1)
                    patchState(state, {locations: [...locations]});
                    localStorage.setItem(storageKey, JSON.stringify(locations));
                }
            }
        };
    })
)
