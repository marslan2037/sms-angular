import { Component, OnInit } from '@angular/core';

import { GenericFunctions } from 'src/app/generic-functions/generic-functions';

@Component({
    selector: 'app-all-teachers',
    templateUrl: './all-teachers.component.html',
    styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent {

    columnTypes:any;
    getRowHeight:any;
    headerHeight:any;
    colResizeDefault:any;
    columnDefs:any;
    defaultColDef:any;
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    constructor() { }

    ngOnInit() {
        this.setDefaultPropertiesForAgGrid();
        this.setColumnDef();
    }

    setDefaultPropertiesForAgGrid() {
        this.defaultColDef = GenericFunctions.setDefaultColumnDefination(true);
        this.columnTypes = GenericFunctions.setColumnTypes();
        this.getRowHeight = function(params) {
            return GenericFunctions.setRowHeight(params.node.rowPinned);
        }
        this.headerHeight = GenericFunctions.setHeaderHeight();
        this.colResizeDefault = GenericFunctions.colResizeDefault();
    }

    setColumnDef() {
        this.columnDefs = [
            {field: 'make', sortable: true, filter: true, checkboxSelection: true},
            {field: 'model', sortable: true, filter: true},
            {field: 'price', sortable: true, filter: true}
        ];
    }
}
