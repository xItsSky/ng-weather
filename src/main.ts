import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {APPLICATON_CONFIG} from './app/app.config';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, APPLICATON_CONFIG).catch(console.error);
