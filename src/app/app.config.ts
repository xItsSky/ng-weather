import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, Routes} from '@angular/router';
import {MainPageComponent} from './features/main-page/main-page.component';
import {ForecastsListComponent} from './features/forecasts-list/forecasts-list.component';
import {provideServiceWorker} from '@angular/service-worker';
import {environment} from '../environments/environment';

const routes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    {
        path: 'forecast/:zipcode', component: ForecastsListComponent
    }
];

export const APPLICATON_CONFIG = {
    providers: [
        provideHttpClient(),
        provideAnimations(),
        provideRouter(routes),
        provideServiceWorker('/ngsw-worker.js', {enabled: environment.production}),
    ]
}