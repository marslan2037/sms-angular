import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
    selector: 'app-all-classes',
    templateUrl: './all-classes.component.html',
    styleUrls: ['./all-classes.component.scss']
})
export class AllClassesComponent implements OnInit {

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
            field: 'name', 
            headerName: 'Name',
            headerTooltip: 'Name', 
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
        this.getAllClasses();
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

    getAllClasses() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllClasses().subscribe((response:any) => {
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

    deleteSingleRecord(id:any) {
        this.toastr.error("Please contact administrator for delete any class.")
        // this.spinner.show(this.spinner_name);
        // this.api_service.deleteClass(id).subscribe((response:any) => {
        //     console.log(response);
        //     this.toastr.success('Class record is deleted');
        //     this.getAllClasses();
        // }, error => {
        //     this.spinner.hide(this.spinner_name);
        //     console.log(error);
        //     this.toastr.error(error);
        // })
    }

    editSingleRecord(id:any) {
        this.router.navigate(['/home/class/'+id]);
    }

    printSingleRecord(id:any) {
        // this.router.navigate(['/home/students/'+id+'/print']);
    }
}
