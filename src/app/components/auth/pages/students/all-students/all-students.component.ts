import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent {

    defaultColDef:any;
    headerHeight:any;
    gridFrameworkComponents:any;
    gridOptions:any;
    rowData:any = [];
    columnDefs = [
        { 
            field: '', 
            headerName: '', 
            filter: false, 
            suppressMovable: true, 
            width: 50, 
            suppressSizeToFit: true,
            headerCheckboxSelection: true, 
            checkboxSelection: true 
        },
        {
            field: 'roll_number', 
            headerName: 'Roll No',  
        },
        {
            field: 'first_name', 
            headerName: 'First Name', 
        },
        {
            field: 'last_name', 
            headerName: 'Last Name', 
        },
        {
            field: 'phone_number', 
            headerName: 'Phone Number', 
        },
        {
            field: 'date', 
            headerName: 'Date', 
            valueGetter: (data:any) => {
                console.log(data.data.date)
                if(data.data.date) {
                    return moment(data.data.date).tz('UTC').format('M/D/YYYY (ddd)');
                }
            },
        },
        {
            field: 'action', 
            headerName: 'Action',
            width: 80,
            suppressMovable: true,
            suppressSizeToFit: true,
            filter: false,
            floatingFilter: false,
            cellRenderer: 'filterIconRenderer'
        }
    ];

    constructor(private api_service: ApiService) {
        this.gridOptions = <GridOptions> { context: { grid: this } };
    }

    ngOnInit() {
        this.setDefaultPropertiesForGrid();
        this.getAllStudents();
    }

    setDefaultPropertiesForGrid() {
        this.defaultColDef = {
            filter: "agTextColumnFilter",
            sortable: true,
            resizable: true,
            sortingOrder: ["asc", "desc"],
            filterParams: { 
                defaultOption: "startsWith", 
                newRowsAction: "keep" 
            },
            suppressMenu: true,
            floatingFilter: true,
            headerCheckboxSelectionFilteredOnly: true
        }
        this.headerHeight = 32;

        this.gridFrameworkComponents = {
            filterIconRenderer: FilterIconRenderer,
        };
    }

    getAllStudents() {
        this.api_service.getAllStudent().subscribe((response:any) => {
            this.rowData = response;            
        }, error => {
          console.log(error)
        })
    }

    deleteSingleRecord(id:any) {
        this.api_service.deleteStudent(id).subscribe((response:any) => {
            console.log(response);
            this.getAllStudents();
        }, error => {
            console.log(error);
            this.getAllStudents();
        })
    }

}
