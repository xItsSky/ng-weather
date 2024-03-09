import {NgModule} from '@angular/core';
import {TabsetComponent} from './tabset.component';
import {NgClass} from '@angular/common';

@NgModule({
    declarations: [TabsetComponent],
    imports: [NgClass],
    exports: [TabsetComponent],
})
export class TabsetModule {
}
