import {NgModule} from '@angular/core';
import {TabsetComponent} from './tabset/tabset.component';
import {TabComponent} from './tab/tab.component';
import {TabsetModule} from './tabset/tabset.module';
import {TabModule} from './tab/tab.module';

@NgModule({
    imports: [TabsetModule, TabModule],
    exports: [TabsetComponent, TabComponent],
})
export class TabsModule {
}
