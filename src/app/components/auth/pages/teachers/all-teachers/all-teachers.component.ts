import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
    selector: 'app-all-teachers',
    templateUrl: './all-teachers.component.html',
    styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent {

    spinner_name:any = 'sp1';

    gridApi:any;
    gridColumnApi:any;
    defaultColDef:any;
    headerHeight:any;
    gridFrameworkComponents:any;
    gridOptions:any;
    rowData = [];
    columnDefs = [
        { 
            field: '', 
            headerName: '', 
            filter: false, 
            width: 50, 
            suppressMovable: true, 
            suppressSizeToFit: true,
            headerCheckboxSelection: true, 
            checkboxSelection: true 
        },
        {
            field: 'teacher_id', 
            headerName: 'Teacher Id',
            headerTooltip: 'Teacher Id',
            width: 120, 
            suppressMovable: true, 
            suppressSizeToFit: true, 
        },
        {
            field: 'first_name', 
            headerName: 'First Name',
            headerTooltip: 'First Name', 
        },
        {
            field: 'last_name', 
            headerName: 'Last Name', 
            headerTooltip: 'Last Name',
        },
        {
            field: 'cnic', 
            headerName: 'CNIC', 
            headerTooltip: 'CNIC',
            hide: true
        },
        {
            field: 'phone_number', 
            headerName: 'Phone Number', 
            headerTooltip: 'EVENT NAME',
        },
        {
            field: 'qualification', 
            headerName: 'Qualification', 
            headerTooltip: 'Qualification',
        },
        {
            field: 'experience', 
            headerName: 'Experience', 
            headerTooltip: 'Experience',
        },
        {
            field: 'country', 
            headerName: 'Country', 
            headerTooltip: 'Country',
        },
        {
            field: 'city', 
            headerName: 'City', 
            headerTooltip: 'City',
        },
        {
            field: 'mohallah', 
            headerName: 'Mohallah',
            headerTooltip: 'Mohallah', 
        },
        {
            field: 'street', 
            headerName: 'Street', 
            headerTooltip: 'Street',
            width: 120,
        },
        {
            field: 'house_number', 
            headerName: 'House No',
            headerTooltip: 'House No', 
            width: 120,
        },
        {
            field: 'date', 
            headerName: 'Date', 
            headerTooltip: 'Date',
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
            headerTooltip: 'Action',
            width: 80,
            suppressMovable: true,
            suppressSizeToFit: true,
            filter: false,
            floatingFilter: false,
            cellRenderer: 'filterIconRenderer'
        }
    ];

    constructor(
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
        this.gridOptions = <GridOptions> { context: { grid: this } };
    }

    ngOnInit() {
        this.setDefaultPropertiesForGrid();
        this.getAllTeachers();
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

    onGridReady(params:any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    gridSizeChanged(params:any) {
        this.gridApi.sizeColumnsToFit();
    }

    getAllTeachers() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllTeachers().subscribe((response:any) => {
            this.spinner.hide(this.spinner_name);  
            if(response.length <= 0) return this.toastr.success('No record found');

            this.rowData = response;  
            this.toastr.success('All records are loaded');        
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
            this.toastr.error(error);
        })
    }

    deleteSingleRecord(id:any) {
        this.spinner.show(this.spinner_name);
        this.api_service.deleteTeacher(id).subscribe((response:any) => {
            console.log(response);
            this.toastr.success('Teacher record is deleted');
            this.getAllTeachers();
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error);
        })
    }

    editSingleRecord(id:any) {
        console.log(id)
        this.router.navigate(['/home/teachers/'+id]);
    }
}
