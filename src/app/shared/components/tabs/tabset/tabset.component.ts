import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {TabEvent} from '../../../model/tab.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tabset',
    templateUrl: './tabset.component.html',
    styleUrls: ['./tabset.component.css']
})
export class TabsetComponent implements AfterContentInit, OnDestroy {
    @Output('onClose') OnCloseEvent = new EventEmitter<TabEvent>();

    @ViewChild('tabBody', {read: ElementRef}) tabBodyRef: ElementRef<HTMLDivElement>;
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    private tabSubscription: Subscription;

    private tabsCount = 0;
    private selectedIndex: number | null = null;

    ngAfterContentInit() {
        if (this.selectedIndex === null && this.tabs.length > 0) {
            // Select the tab after change detection has run in order to avoid ExpressionChangedAfterItHasBeenCheckedError
            Promise.resolve().then(() => {
                this.selectTab(0);
            })
        }

        this.tabSubscription = this.tabs.changes.subscribe((changes: QueryList<TabComponent>) => {
            if (changes.length !== this.tabsCount) {
                // upd  te the selected tab index
                this.selectedIndex = this.calculIndex(this.selectedIndex);
                // update the tab count
                this.tabsCount = changes.length;
            }

            const currentActiveTabIndex = this.tabs.toArray().findIndex(tab => tab.active);

            if (this.selectedIndex !== null && this.selectedIndex !== currentActiveTabIndex) {
                // Update tab active status after change detection has run in order to avoid ExpressionChangedAfterItHasBeenCheckedError
                Promise.resolve().then(() => {
                    this.tabs.toArray().forEach((tab, index) => (tab.active = index === this.selectedIndex));
                })
            }
        });
    }

    /**
     * Calculate new index
     * @param index the old index
     */
    calculIndex(index: number | null) {
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }

    /**
     * Select a new Tab
     * @param index the index of the tab to select
     */
    selectTab(index: number) {
        this.selectedIndex = index;
        const newActiveTab = this.tabs.get(this.selectedIndex);
        this.tabs.forEach((tab) => {
            tab.active = tab === newActiveTab;
        });
    }

    /**
     * Close a tab
     * @param event the {@link MouseEvent}
     * @param index the index of the tab to delete
     */
    closeTab(event: MouseEvent, index: number) {
        event.preventDefault();
        event.stopPropagation();

        // Notify about the deletion
        this.OnCloseEvent.emit({id: index});
    }

    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
    }
}
