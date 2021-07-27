import {Component, OnDestroy} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'filter-icon-rendering',
    templateUrl: './filter-icon-rendering.component.html'
})

export class FilterIconRenderer implements ICellRendererAngularComp, OnDestroy {

    params: any;

    agInit(params: any): void {
        this.params = params;
    }

    deleteRecord() {
        this.params.context.grid.deleteSingleRecord(this.params.data._id);
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}