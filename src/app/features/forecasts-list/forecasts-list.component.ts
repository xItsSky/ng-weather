import {Component} from '@angular/core';
import {WeatherService} from '../../core/providers/services/weather.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Forecast} from '../../shared/model/forecast.type';
import {DatePipe, DecimalPipe, NgFor} from '@angular/common';

@Component({
    selector: 'app-forecasts-list',
    standalone: true,
    imports: [NgFor, DecimalPipe, DatePipe, RouterLink],
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

    zipcode: string;
    forecast: Forecast;

    constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            weatherService.getForecast(this.zipcode)
                .subscribe(data => this.forecast = data);
        });
    }
}
