import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
    selector: 'app-fee-unpaid',
    templateUrl: './fee-unpaid.component.html',
    styleUrls: ['./fee-unpaid.component.scss']
})
export class FeeUnpaidComponent implements OnInit {

    spinner_name:any = 'sp1';

    gridApi:any;
    gridColumnApi:any;
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
            width: 50, 
            suppressMovable: true, 
            suppressSizeToFit: true,
            headerCheckboxSelection: true, 
            checkboxSelection: true 
        },
        {
            field: 'roll_number', 
            headerName: 'Roll No',
            headerTooltip: 'Roll No',
            width: 120, 
            suppressMovable: true, 
            suppressSizeToFit: true, 
        },
        {
            field: 'computer_number', 
            headerName: 'Computer Number',
            headerTooltip: 'Computer Number', 
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
            field: 'class', 
            headerName: 'Class', 
            width: 120,
            headerTooltip: 'Class',
        },
        {
            field: 'father_name', 
            headerName: 'Father Name',
            headerTooltip: 'Father Name', 
        },
        {
            field: 'phone_number', 
            headerName: 'Phone Number', 
            headerTooltip: 'EVENT NAME',
        },
        // {
        //     field: 'action', 
        //     headerName: 'Action',
        //     headerTooltip: 'Action',
        //     width: 80,
        //     suppressMovable: true,
        //     suppressSizeToFit: true,
        //     filter: false,
        //     floatingFilter: false,
        //     cellRenderer: 'filterIconRenderer'
        // }
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
        this.getAllUnPaidFee();
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

    getAllUnPaidFee() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllUnPaidFee().subscribe((response:any) => {
            this.spinner.hide(this.spinner_name);  
            this.rowData = response;  

            let message = (response.length <= 0) ? 'No record found' : 'All records are loaded';
            this.toastr.success(message);     
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error)
            this.toastr.error(error);
        })
    }
}
