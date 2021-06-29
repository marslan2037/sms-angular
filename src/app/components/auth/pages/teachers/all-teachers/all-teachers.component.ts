import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-all-teachers',
    templateUrl: './all-teachers.component.html',
    styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent {

    constructor() { }
  
    columnDefs = [
        {field: 'make', sortable: true, filter: true, checkboxSelection: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true}
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
