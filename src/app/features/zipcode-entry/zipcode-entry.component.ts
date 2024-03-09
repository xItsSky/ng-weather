import {Component} from '@angular/core';
import {LocationService} from '../../core/providers/services/location.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-zipcode-entry',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

    constructor(private service: LocationService) {
    }

    addLocation(zipcode: string) {
        this.service.addLocation(zipcode);
    }

}
