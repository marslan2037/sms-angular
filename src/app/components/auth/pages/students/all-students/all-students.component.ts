import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { Router } from '@angular/router';

import { GridOptions } from "ag-grid-community";
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { FilterIconRenderer } from 'src/app/components/cell-rendering-components/filter-icon-rendering/filter-icon-rendering.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent {

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
        },
        {
            field: 'computer_number', 
            headerName: 'Computer No',
            headerTooltip: 'Computer No',
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
            field: 'date_of_birth', 
            headerName: 'Date of Birth', 
            headerTooltip: 'Date of Birth',
            valueGetter: (data:any) => {
                if(data.data.date_of_birth) {
                    return moment(data.data.date_of_birth).format('MM/DD/YYYY');
                }
            },
        },
        {
            field: 'nationality', 
            headerName: 'Nationality', 
            headerTooltip: 'Nationality',
            hide: true
        },
        {
            field: 'religion', 
            headerName: 'Religion', 
            headerTooltip: 'Religion',
            hide: true
        },
        {
            field: 'class', 
            headerName: 'Class', 
            width: 120,
            headerTooltip: 'Class',
        },
        {
            field: 'b_form', 
            headerName: 'B Form', 
            headerTooltip: 'B Form',
            hide: true
        },
        {
            field: 'previous_school', 
            headerName: 'Previous School',
            headerTooltip: 'Previous School', 
            hide: true
        },
        {
            field: 'country', 
            headerName: 'Country', 
            headerTooltip: 'Country',
            hide: true
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
        },
        {
            field: 'father_name', 
            headerName: 'Father Name',
            headerTooltip: 'Father Name', 
        },
        {
            field: 'father_cnic', 
            headerName: 'Father CNIC', 
            headerTooltip: 'Father CNIC',
            hide: true
        },
        {
            field: 'father_education', 
            headerName: 'Father Education', 
            headerTooltip: 'Father Education',
            hide: true
        },
        {
            field: 'father_occupation', 
            headerName: 'Father Occupation', 
            headerTooltip: 'Father Occupation',
            hide: true
        },
        {
            field: 'phone_number', 
            headerName: 'Phone Number', 
            headerTooltip: 'EVENT NAME',
        },
        {
            field: 'date', 
            headerName: 'Date', 
            headerTooltip: 'Date',
            valueGetter: (data:any) => {
                if(data.data.date) {
                    return moment(data.data.date).format('M/D/YYYY (ddd)');
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

    onGridReady(params:any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    gridSizeChanged(params:any) {
        this.gridApi.sizeColumnsToFit();
    }

    getAllStudents() {
        this.spinner.show(this.spinner_name);
        this.api_service.getAllStudents().subscribe((response:any) => {
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
        this.api_service.deleteStudent(id).subscribe((response:any) => {
            console.log(response);
            this.toastr.success('Student record is deleted');
            this.getAllStudents();
        }, error => {
            this.spinner.hide(this.spinner_name);
            console.log(error);
        })
    }

    editSingleRecord(id:any) {
        this.router.navigate(['/home/students/'+id]);
    }
}
