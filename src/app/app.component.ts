import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet
    ],
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {

    }
}
