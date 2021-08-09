import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
    selector: 'app-fee-paid',
    templateUrl: './fee-paid.component.html',
    styleUrls: ['./fee-paid.component.scss']
})
export class FeePaidComponent implements OnInit {

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
            headerTooltip: 'Roll No' 
        },
        {
            field: 'computer_number', 
            headerName: 'Computer Number',
            headerTooltip: 'Computer Number' 
        },
        {
            field: 'name', 
            headerName: 'Name',
            headerTooltip: 'Name' 
        },
        {
            field: 'class', 
            headerName: 'Class',
            headerTooltip: 'Class',
        },
        {
            field: 'amount', 
            headerName: 'Amount',
            headerTooltip: 'Amount',
        },
        // {
        //     field: 'name', 
        //     headerName: 'Name', 
        //     headerTooltip: 'Name',
        // },
        // {
        //     field: 'father_name', 
        //     headerName: 'Father Name',
        //     headerTooltip: 'Father Name', 
        // },
        {
            field: 'month', 
            headerName: 'Fee Month', 
            headerTooltip: 'Fee Month',
            valueGetter: (data:any) => {
                console.log(data.data)
                if(data.data.month) {
                    return moment(data.data.month).format('M/YYYY');
                }
            },
        },
        {
            field: 'date', 
            headerName: 'Date', 
            headerTooltip: 'Date',
            valueGetter: (data:any) => {
                console.log(data.data.date)
                if(data.data.date) {
                    return moment(data.data.date).format('M/D/YYYY (ddd)');
                }
            },
        },
        {
            field: 'action', 
            headerName: 'Action',
            headerTooltip: 'Action',
            width: 120,
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
        this.getAllPaidFee();
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

    getAllPaidFee() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllPaidFee().subscribe((response:any) => {
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
        this.api_service.deleteFee(id).subscribe((response:any) => {
            console.log(response);
            this.toastr.success('Fee record is deleted');
            this.getAllPaidFee();
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error);
        })
    }

    editSingleRecord(id:any) {
        this.router.navigate(['/home/fee/'+id]);
    }

    printSingleRecord(id:any) {
        this.router.navigate(['/home/fee/'+id+'/print']);
    }
}
