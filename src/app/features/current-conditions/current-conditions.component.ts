import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../../core/providers/services/weather.service';
import {LocationService} from '../../core/providers/services/location.service';
import {Router, RouterLink} from '@angular/router';
import {DecimalPipe, NgFor} from '@angular/common';
import {TabsModule} from '../../shared/components/tabs/tabs.module';
import {TabEvent} from '../../shared/model/tab.model';
import {ConditionsAndZip} from '../../shared/model/conditions-and-zip.type';

@Component({
    selector: 'app-current-conditions',
    standalone: true,
    imports: [NgFor, DecimalPipe, RouterLink, TabsModule],
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

    readonly weatherService = inject(WeatherService);
    private router = inject(Router);
    protected locationService = inject(LocationService);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    onClose({id}: TabEvent) {
        const currentConditionsByZip = this.currentConditionsByZip()
        this.locationService.removeLocation(currentConditionsByZip[id].zip);
    }
}
